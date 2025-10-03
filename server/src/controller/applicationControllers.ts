import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";
const prisma = new PrismaClient();
// Get leases information
export const listApplication = async (req: Request, res: Response): Promise<void> => {
    try{
          const { userId, userType} = req.query;
          let whereClause = {};
          if (userId && userType){
            if(userType === "tenant"){
                whereClause = {tenantCognitoId: String(userId)}
            }else if (userType === "landlord"){
                whereClause = {
                    property: {
                        landlordCognitoId: String(userId)
                    }
                }
            }
          }

          const application = await prisma.application.findMany({
            where: whereClause,
            include: {
                property: {
                    include:{
                        location: true,
                        landlord: true
                    }
                },
                tenant: true,
                tour: true
            }
          });
          
          const calculateNextPaymentDate = (startDate: Date): Date => {
            const today = new Date()
            const nextPaymentDate =  new Date(startDate);
            while ( nextPaymentDate <= today){
                nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
            }
            return nextPaymentDate;
          };
          
          const formatedApplication = await Promise.all(
            application.map(async (app)=>{
                const lease = await prisma.lease.findFirst({
                    where:{
                        tenant:{
                            cognitoId: app.tenantCognitoId
                        },
                        propertyId: app.propertyId
                    },
                    orderBy: {startDate: "desc"}
                });
                return {
                    ...app,
                    property: {
                        ...app.property,
                        address: app.property.location.address,
                    },
                    landlord: app.property.landlord,
                    lease: lease ? {...lease, nextPaymentDate: calculateNextPaymentDate(lease.startDate)}: null
                }
            })
          )
          res.json(formatedApplication)
        
}catch (error: any) {
    console.error("Error fetching application :", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// create application 
export const createApplication = async (req: Request, res: Response): Promise<void> => {
    try{
          const {
            applicationDate,
            status,
            propertyId,
            tenantCognitoId,
            name,
            email,
            phoneNumber,
            message
          } = req.body;

          // First check if tenant has an active lease with this landlord
          const targetProperty = await prisma.property.findUnique({
            where: { id: Number(propertyId) },
            select: { 
              landlordCognitoId: true,
              pricePerMonth: true, 
              securityDeposit: true,
              name: true
            }
          });

          if (!targetProperty) {
            res.status(404).json({ message: "Property not found" });
            return;
          }

          // Check for active leases for THE SAME PROPERTY (not all properties of the landlord)
          const currentDate = new Date();
          const existingActiveLease = await prisma.lease.findFirst({
            where: {
              tenantCognitoId: tenantCognitoId,
              propertyId: Number(propertyId), // Only check for the same property
              startDate: { lte: currentDate },
              status: { in: ['ACTIVE', 'PENDING_START'] }, // Use status instead of endDate
            },
            include: {
              property: {
                select: {
                  name: true,
                  landlord: {
                    select: {
                      name: true
                    }
                  }
                }
              }
            }
          });

          if (existingActiveLease) {
            res.status(400).json({
              message: `You already have an active lease for "${existingActiveLease.property.name}". You cannot apply for the same property while your current lease is active.`,
              existingLease: {
                propertyName: existingActiveLease.property.name,
                landlordName: existingActiveLease.property.landlord.name,
                startDate: existingActiveLease.startDate,
                status: existingActiveLease.status,
                leaseType: "Ongoing (No Fixed End Date)"
              },
              restrictionType: "ACTIVE_LEASE_SAME_PROPERTY"
            });
            return;
          }

          // Check for existing applications for this property by this tenant
          const existingApplication = await prisma.application.findFirst({
            where: {
              propertyId: Number(propertyId),
              tenantCognitoId: tenantCognitoId,
            },
            include: {
              lease: true // Include lease data to check if it's still active
            },
            orderBy: {
              applicationDate: 'desc'
            }
          });

          // If there's an existing application, check its status and associated lease
          if (existingApplication) {
            if (existingApplication.status === 'Pending') {
              res.status(400).json({ 
                message: "You already have a pending application for this property. Please wait for the landlord's response.",
                existingStatus: "Pending",
                applicationId: existingApplication.id,
                restrictionType: "PENDING_APPLICATION"
              });
              return;
            }
            
            if (existingApplication.status === 'Approved' && existingApplication.lease) {
              // Check if the associated lease is still active using lease status
              const leaseStillActive = existingApplication.lease.status === 'ACTIVE' || 
                                     existingApplication.lease.status === 'PENDING_START';
              
              if (leaseStillActive) {
                res.status(400).json({ 
                  message: "You already have an active lease for this property.",
                  existingStatus: "Approved",
                  applicationId: existingApplication.id,
                  restrictionType: "ACTIVE_LEASE_EXISTS"
                });
                return;
              }
              
              // If lease has been terminated (deleted), allow reapplication
              console.log(`Previous lease for property ${propertyId} has ended. Allowing reapplication.`);
            }
            
            // If status is 'Denied' or lease has ended, allow reapplication (continue to create new application)
          }

          // Use the property data we already fetched
          const property = {
            pricePerMonth: targetProperty.pricePerMonth,
            securityDeposit: targetProperty.securityDeposit
          };
        // Extract lease start date from request body (landlord specifies when lease starts)
        const { leaseStartDate } = req.body;
        const startDate = leaseStartDate ? new Date(leaseStartDate) : new Date();
        
        const newApplication = await prisma.$transaction(async(prisma)=>{
            const lease = await prisma.lease.create({
                data: {
                    startDate: startDate,
                    // endDate is null - lease continues indefinitely until deleted
                    status: 'PENDING_START', // Initial status when application is approved
                    rent: property.pricePerMonth,
                    deposit: property.securityDeposit,
                    property: {
                        connect: { id: propertyId},
                    },
                    tenant: {
                        connect: {cognitoId: tenantCognitoId}
                    },
                },
            });
            const application = await prisma.application.create({
        data: {
          applicationDate: new Date(applicationDate),
          status,
          name,
          email,
          phoneNumber,
          message,
          property: {
            connect: { id: propertyId },
          },
          tenant: {
            connect: { cognitoId: tenantCognitoId },
          },
          lease: {
            connect: { id: lease.id },
          },
        },
        include: {
          property: true,
          tenant: true,
          lease: true,
        },
      });

      return application;
        })
  res.status(201).json(newApplication);
}catch (error: any) {
    console.error("Error creating application:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export const updateApplicationStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log("status:", status);

    const application = await prisma.application.findUnique({
      where: { id: Number(id) },
      include: {
        property: true,
        tenant: true,
        tour: true,
      },
    });

    if (!application) {
      res.status(404).json({ message: "Application not found." });
      return;
    }

    // Validate status transitions
    if (status === "Tour_Scheduled" && application.status !== "Pending") {
      res.status(400).json({ message: "Can only schedule tours for pending applications" });
      return;
    }

    if (status === "Approved") {
      // Check if tour is required and completed
      if (application.tour && application.tour.status !== "COMPLETED") {
        res.status(400).json({ message: "Tour must be completed before approval" });
        return;
      }

      // Create lease with landlord-defined start date (can be immediate or future)
      // No end date - lease continues until termination request is accepted
      const leaseStartDate = new Date();
      leaseStartDate.setDate(leaseStartDate.getDate() + 7); // Default 7 days for tenant to prepare
      
      const newLease = await prisma.lease.create({
        data: {
          startDate: leaseStartDate,
          // endDate is null - lease continues indefinitely until deleted
          rent: application.property.pricePerMonth,
          deposit: application.property.securityDeposit,
          propertyId: application.propertyId,
          tenantCognitoId: application.tenantCognitoId,
          status: 'PENDING_START', // Will change to ACTIVE when start date arrives
        },
      });

      // Update the application with the new lease ID
      await prisma.application.update({
        where: { id: Number(id) },
        data: { status, leaseId: newLease.id },
      });
    } else {
      // If denying application, cancel any existing tours
      if (status === "Denied" && application.tour && application.tour.status === "SCHEDULED") {
        await prisma.tour.update({
          where: { id: application.tour.id },
          data: {
            status: "CANCELLED",
            landlordNotes: "Tour cancelled due to application denial"
          }
        });
      }

      // Update the application status (for other statuses)
      await prisma.application.update({
        where: { id: Number(id) },
        data: { status },
      });
    }

    // Get the updated application
    const updatedApplication = await prisma.application.findUnique({
      where: { id: Number(id) },
      include: {
        property: true,
        tenant: true,
        lease: true,
        tour: true,
      },
    });

    // Emit real-time notification
    if (global.socketServer) {
      global.socketServer.emitApplicationStatusChanged(id, {
        applicationId: id,
        newStatus: status,
        propertyName: updatedApplication?.property.name,
        tenantName: updatedApplication?.tenant.name
      });
    }

    res.json(updatedApplication);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating application status: ${error.message}` });
  }
};

// Check existing application status for a property
export const checkExistingApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const { propertyId } = req.params;
    const { tenantCognitoId } = req.query;

    if (!tenantCognitoId) {
      res.status(400).json({ message: "Tenant ID is required" });
      return;
    }

    // Get property info to check landlord
    const property = await prisma.property.findUnique({
      where: { id: Number(propertyId) },
      select: {
        landlordCognitoId: true,
        name: true,
        landlord: {
          select: {
            name: true
          }
        }
      }
    });

    if (!property) {
      res.status(404).json({ message: "Property not found" });
      return;
    }

    // Check for active lease for THE SAME PROPERTY (not all properties of the landlord)
    const currentDate = new Date();
    const existingActiveLease = await prisma.lease.findFirst({
      where: {
        tenantCognitoId: String(tenantCognitoId),
        propertyId: Number(propertyId), // Only check for the same property
        startDate: { lte: currentDate },
        status: { in: ['ACTIVE', 'PENDING_START'] }, // Use status instead of endDate
      },
      include: {
        property: {
          select: {
            name: true
          }
        }
      }
    });

    if (existingActiveLease) {
      res.json({
        hasExisting: true,
        application: null,
        canApply: false,
        restrictionType: 'ACTIVE_LEASE_SAME_PROPERTY',
        existingLease: {
          propertyName: existingActiveLease.property.name,
          landlordName: property.landlord.name,
          startDate: existingActiveLease.startDate,
          status: existingActiveLease.status,
          leaseType: "Ongoing (No Fixed End Date)"
        },
        reason: `You already have an active lease for "${existingActiveLease.property.name}". You cannot apply for the same property while your current lease is active.`
      });
      return;
    }

    // Check for existing application for this specific property
    const existingApplication = await prisma.application.findFirst({
      where: {
        propertyId: Number(propertyId),
        tenantCognitoId: String(tenantCognitoId),
      },
      orderBy: {
        applicationDate: 'desc'
      },
      include: {
        property: {
          select: {
            name: true,
            id: true
          }
        },
        lease: true // Include lease data to check if it's still active
      }
    });

    let canApply = true;
    let restrictionType = null;
    let reason = 'No previous application found';

    if (existingApplication) {
      if (existingApplication.status === 'Pending') {
        canApply = false;
        restrictionType = 'PENDING_APPLICATION';
        reason = 'You have a pending application for this property';
      } else if (existingApplication.status === 'Approved' && existingApplication.lease) {
        // Check if the associated lease is still active using lease status
        const leaseStillActive = existingApplication.lease.status === 'ACTIVE' || 
                               existingApplication.lease.status === 'PENDING_START';
        
        if (leaseStillActive) {
          canApply = false;
          restrictionType = 'ACTIVE_LEASE_EXISTS';
          reason = 'You already have an active lease for this property';
        } else {
          // Lease has been deleted (terminated), allow reapplication
          canApply = true;
          restrictionType = null;
          reason = 'Previous lease has ended. You can apply again.';
        }
      } else if (existingApplication.status === 'Denied') {
        canApply = true;
        restrictionType = null;
        reason = 'You can reapply since your previous application was denied';
      }
    }

    res.json({
      hasExisting: !!existingApplication,
      application: existingApplication || null,
      canApply: canApply,
      restrictionType: restrictionType,
      reason: reason
    });

  } catch (error: any) {
    console.error("Error checking existing application:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
