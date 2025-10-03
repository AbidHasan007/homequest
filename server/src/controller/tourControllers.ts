import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Schedule a tour for an application
export const scheduleTour = async (req: Request, res: Response): Promise<void> => {
  try {
    const { applicationId } = req.params;
    const { scheduledDate, landlordNotes } = req.body;

    // Check if application exists and is in pending status
    const application = await prisma.application.findUnique({
      where: { id: Number(applicationId) },
      include: {
        property: {
          include: {
            landlord: true
          }
        },
        tenant: true,
        tour: true
      }
    });

    if (!application) {
      res.status(404).json({ message: "Application not found" });
      return;
    }

    if (application.status !== "Pending") {
      res.status(400).json({ message: "Can only schedule tours for pending applications" });
      return;
    }

    if (application.tour && application.tour.status !== "CANCELLED") {
      res.status(400).json({ message: "Tour already exists for this application" });
      return;
    }

    let tour;
    
    // If there's a cancelled tour, update it instead of creating new one
    if (application.tour && application.tour.status === "CANCELLED") {
      tour = await prisma.tour.update({
        where: { id: application.tour.id },
        data: {
          scheduledDate: new Date(scheduledDate),
          landlordNotes: landlordNotes || null,
          tenantNotes: null, // Reset tenant notes for new schedule
          feedbackRating: null, // Reset feedback
          status: "SCHEDULED"
        },
        include: {
          application: {
            include: {
              property: true,
              tenant: true
            }
          }
        }
      });
    } else {
      // Create new tour
      tour = await prisma.tour.create({
        data: {
          applicationId: Number(applicationId),
          scheduledDate: new Date(scheduledDate),
          landlordNotes: landlordNotes || null,
          status: "SCHEDULED"
        },
        include: {
          application: {
            include: {
              property: true,
              tenant: true
            }
          }
        }
      });
    }

    // Update application status
    await prisma.application.update({
      where: { id: Number(applicationId) },
      data: { status: "Tour_Scheduled" }
    });

    // Get sender information for notification
    const landlord = await prisma.landlord.findFirst({
      where: { cognitoId: req.user?.id }
    });
    const tenant = await prisma.tenant.findFirst({
      where: { cognitoId: req.user?.id }
    });

    const senderName = landlord?.name || tenant?.name || "Unknown";
    const senderRole = landlord ? "Landlord" : "Tenant";

    // Emit real-time notification
    if (global.socketServer) {
      global.socketServer.emitTourScheduled(applicationId, {
        tourId: tour.id,
        scheduledDate: tour.scheduledDate,
        landlordNotes: tour.landlordNotes,
        propertyName: tour.application.property.name,
        tenantName: tour.application.tenant.name,
        senderName,
        senderRole
      });
    }

    res.status(201).json({
      message: "Tour scheduled successfully",
      tour
    });

  } catch (error: any) {
    console.error("Error scheduling tour:", error);
    res.status(500).json({ message: `Error scheduling tour: ${error.message}` });
  }
};

// Get tour details by application ID
export const getTourByApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const { applicationId } = req.params;

    const tour = await prisma.tour.findUnique({
      where: { applicationId: Number(applicationId) },
      include: {
        application: {
          include: {
            property: {
              include: {
                landlord: true,
                location: true
              }
            },
            tenant: true
          }
        }
      }
    });

    if (!tour) {
      res.status(404).json({ message: "Tour not found for this application" });
      return;
    }

    res.json(tour);

  } catch (error: any) {
    console.error("Error fetching tour:", error);
    res.status(500).json({ message: `Error fetching tour: ${error.message}` });
  }
};

// Update tour (reschedule)
export const updateTour = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tourId } = req.params;
    const { scheduledDate, landlordNotes, tenantNotes, status } = req.body;

    const existingTour = await prisma.tour.findUnique({
      where: { id: Number(tourId) },
      include: {
        application: {
          include: {
            property: true,
            tenant: true
          }
        }
      }
    });

    if (!existingTour) {
      res.status(404).json({ message: "Tour not found" });
      return;
    }

    // Prepare update data
    const updateData: any = {};
    if (scheduledDate) updateData.scheduledDate = new Date(scheduledDate);
    if (landlordNotes !== undefined) updateData.landlordNotes = landlordNotes;
    if (tenantNotes !== undefined) updateData.tenantNotes = tenantNotes;
    if (status) updateData.status = status;

    const updatedTour = await prisma.tour.update({
      where: { id: Number(tourId) },
      data: updateData,
      include: {
        application: {
          include: {
            property: true,
            tenant: true
          }
        }
      }
    });

    // Get sender information for notification
    const landlord = await prisma.landlord.findFirst({
      where: { cognitoId: req.user?.id }
    });
    const tenantUser = await prisma.tenant.findFirst({
      where: { cognitoId: req.user?.id }
    });

    const senderName = landlord?.name || tenantUser?.name || "Unknown";
    const senderRole = landlord ? "Landlord" : "Tenant";

    // Emit real-time notification
    if (global.socketServer) {
      global.socketServer.emitTourUpdated(existingTour.applicationId.toString(), {
        tourId: updatedTour.id,
        scheduledDate: updatedTour.scheduledDate,
        status: updatedTour.status,
        landlordNotes: updatedTour.landlordNotes,
        tenantNotes: updatedTour.tenantNotes,
        senderName,
        senderRole,
        propertyName: updatedTour.application.property?.name
      });
    }

    res.json({
      message: "Tour updated successfully",
      tour: updatedTour
    });

  } catch (error: any) {
    console.error("Error updating tour:", error);
    res.status(500).json({ message: `Error updating tour: ${error.message}` });
  }
};

// Complete tour
export const completeTour = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tourId } = req.params;
    const { feedbackRating, landlordNotes, tenantNotes } = req.body;

    const tour = await prisma.tour.findUnique({
      where: { id: Number(tourId) },
      include: {
        application: true
      }
    });

    if (!tour) {
      res.status(404).json({ message: "Tour not found" });
      return;
    }

    if (tour.status === "COMPLETED") {
      res.status(400).json({ message: "Tour is already completed" });
      return;
    }

    // Update tour status to completed
    const updatedTour = await prisma.tour.update({
      where: { id: Number(tourId) },
      data: {
        status: "COMPLETED",
        feedbackRating: feedbackRating || null,
        landlordNotes: landlordNotes || tour.landlordNotes,
        tenantNotes: tenantNotes || tour.tenantNotes
      },
      include: {
        application: {
          include: {
            property: true,
            tenant: true
          }
        }
      }
    });

    // Update application status
    await prisma.application.update({
      where: { id: tour.applicationId },
      data: { status: "Tour_Completed" }
    });

    // Get sender information for notification
    const landlord = await prisma.landlord.findFirst({
      where: { cognitoId: req.user?.id }
    });
    const tenantUser = await prisma.tenant.findFirst({
      where: { cognitoId: req.user?.id }
    });

    const senderName = landlord?.name || tenantUser?.name || "Unknown";
    const senderRole = landlord ? "Landlord" : "Tenant";

    // Emit real-time notification
    if (global.socketServer) {
      global.socketServer.emitTourUpdated(tour.applicationId.toString(), {
        tourId: updatedTour.id,
        status: "COMPLETED",
        feedbackRating: updatedTour.feedbackRating,
        applicationStatus: "Tour_Completed",
        senderName,
        senderRole,
        propertyName: updatedTour.application.property?.name
      });
    }

    res.json({
      message: "Tour completed successfully",
      tour: updatedTour
    });

  } catch (error: any) {
    console.error("Error completing tour:", error);
    res.status(500).json({ message: `Error completing tour: ${error.message}` });
  }
};

// Cancel tour
export const cancelTour = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tourId } = req.params;
    const { reason } = req.body;

    const tour = await prisma.tour.findUnique({
      where: { id: Number(tourId) },
      include: { application: true }
    });

    if (!tour) {
      res.status(404).json({ message: "Tour not found" });
      return;
    }

    if (tour.status === "CANCELLED" || tour.status === "COMPLETED") {
      res.status(400).json({ message: `Cannot cancel tour with status: ${tour.status}` });
      return;
    }

    // Update tour status to cancelled
    const updatedTour = await prisma.tour.update({
      where: { id: Number(tourId) },
      data: {
        status: "CANCELLED",
        landlordNotes: reason || tour.landlordNotes
      },
      include: {
        application: {
          include: {
            property: true,
            tenant: true
          }
        }
      }
    });

    // Always reset application status to Pending when tour is cancelled
    // (unless it's already approved/denied)
    const currentApp = await prisma.application.findUnique({
      where: { id: tour.applicationId }
    });

    let updatedApplicationStatus = currentApp?.status;
    if (currentApp && !["Approved", "Denied"].includes(currentApp.status)) {
      const updatedApp = await prisma.application.update({
        where: { id: tour.applicationId },
        data: { status: "Pending" }
      });
      updatedApplicationStatus = updatedApp.status;
    }

    // Get sender information for notification
    const landlord = await prisma.landlord.findFirst({
      where: { cognitoId: req.user?.id }
    });
    const tenant = await prisma.tenant.findFirst({
      where: { cognitoId: req.user?.id }
    });

    const senderName = landlord?.name || tenant?.name || "Unknown";
    const senderRole = landlord ? "Landlord" : "Tenant";

    // Emit real-time notification with sender info
    if (global.socketServer) {
      global.socketServer.emitTourUpdated(tour.applicationId.toString(), {
        tourId: updatedTour.id,
        status: "CANCELLED",
        reason,
        applicationStatus: updatedApplicationStatus,
        senderName,
        senderRole,
        propertyName: updatedTour.application.property?.name
      });
    }

    res.json({
      message: "Tour cancelled successfully",
      tour: updatedTour
    });

  } catch (error: any) {
    console.error("Error cancelling tour:", error);
    res.status(500).json({ message: `Error cancelling tour: ${error.message}` });
  }
};

// Get all tours for a landlord
export const getLandlordTours = async (req: Request, res: Response): Promise<void> => {
  try {
    const { landlordCognitoId } = req.params;
    const { status } = req.query;

    const whereClause: any = {
      application: {
        property: {
          landlordCognitoId: landlordCognitoId
        }
      }
    };

    if (status) {
      whereClause.status = status;
    }

    const tours = await prisma.tour.findMany({
      where: whereClause,
      include: {
        application: {
          include: {
            property: {
              include: {
                location: true
              }
            },
            tenant: true
          }
        }
      },
      orderBy: {
        scheduledDate: 'asc'
      }
    });

    res.json(tours);

  } catch (error: any) {
    console.error("Error fetching landlord tours:", error);
    res.status(500).json({ message: `Error fetching tours: ${error.message}` });
  }
};

// Get all tours for a tenant
export const getTenantTours = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tenantCognitoId } = req.params;
    const { status } = req.query;

    const whereClause: any = {
      application: {
        tenantCognitoId: tenantCognitoId
      }
    };

    if (status) {
      whereClause.status = status;
    }

    const tours = await prisma.tour.findMany({
      where: whereClause,
      include: {
        application: {
          include: {
            property: {
              include: {
                location: true,
                landlord: true
              }
            }
          }
        }
      },
      orderBy: {
        scheduledDate: 'asc'
      }
    });

    res.json(tours);

  } catch (error: any) {
    console.error("Error fetching tenant tours:", error);
    res.status(500).json({ message: `Error fetching tours: ${error.message}` });
  }
};