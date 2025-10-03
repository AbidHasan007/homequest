import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";
const prisma = new PrismaClient();
// Get leases information
export const getLeases = async (req: Request, res: Response): Promise<void> => {
    try{
          const leases = await prisma.lease.findMany({
            include: {
                tenant: true,
                property: {
                  include: {
                    location: true,
                    landlord: true
                  }
                }
            }
          })

          res.json(leases)
        
}catch (error: any) {
    console.error("Error fetching leases:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get leases payment information
export const getLeasesPayment = async (req: Request, res: Response): Promise<void> => {
    try{
          const { id } =req.params;
          const payments = await prisma.payment.findMany({
             where:{leaseId: Number(id)}
          })

          res.json(payments)
        
}catch (error: any) {
    console.error("Error fetching lease payments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Create termination request
export const createTerminationRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { leaseId } = req.params;
    const { reason } = req.body;
    const userCognitoId = req.user?.id;

    // Verify the lease exists and belongs to the requesting tenant
    const lease = await prisma.lease.findFirst({
      where: {
        id: Number(leaseId),
        tenantCognitoId: userCognitoId
      },
      include: {
        property: {
          include: {
            landlord: true
          }
        },
        tenant: true
      }
    });

    if (!lease) {
      res.status(404).json({ message: "Lease not found or you don't have access to it" });
      return;
    }

    // Check if there's already a pending termination request
    const existingRequest = await prisma.terminationRequest.findFirst({
      where: {
        leaseId: Number(leaseId),
        status: "PENDING"
      }
    });

    if (existingRequest) {
      res.status(400).json({ message: "A termination request is already pending for this lease" });
      return;
    }

    // Create the termination request
    const terminationRequest = await prisma.terminationRequest.create({
      data: {
        leaseId: Number(leaseId),
        reason: reason || null
      },
      include: {
        lease: {
          include: {
            property: {
              include: {
                landlord: true
              }
            },
            tenant: true
          }
        }
      }
    });

    // Emit socket notification
    if (global.socketServer) {
      global.socketServer.emitTerminationRequested(leaseId, {
        terminationRequestId: terminationRequest.id,
        leaseId: Number(leaseId),
        reason: reason || null,
        requestedBy: userCognitoId,
        tenantName: terminationRequest.lease.tenant.name,
        propertyName: terminationRequest.lease.property.name,
        status: "PENDING"
      });
    }

    res.status(201).json({
      message: "Termination request submitted successfully",
      terminationRequest
    });

  } catch (error: any) {
    console.error("Error creating termination request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get termination requests for a tenant
export const getTenantTerminationRequests = async (req: Request, res: Response): Promise<void> => {
  try {
    const userCognitoId = req.user?.id;

    const terminationRequests = await prisma.terminationRequest.findMany({
      where: {
        lease: {
          tenantCognitoId: userCognitoId
        }
      },
      include: {
        lease: {
          include: {
            property: {
              include: {
                landlord: true,
                location: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(terminationRequests);

  } catch (error: any) {
    console.error("Error fetching tenant termination requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get termination requests for a landlord
export const getLandlordTerminationRequests = async (req: Request, res: Response): Promise<void> => {
  try {
    const userCognitoId = req.user?.id;

    const terminationRequests = await prisma.terminationRequest.findMany({
      where: {
        lease: {
          property: {
            landlordCognitoId: userCognitoId
          }
        }
      },
      include: {
        lease: {
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
        createdAt: 'desc'
      }
    });

    res.json(terminationRequests);

  } catch (error: any) {
    console.error("Error fetching landlord termination requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Update termination request status (landlord action)
export const updateTerminationRequestStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { requestId } = req.params;
    const { status, landlordNotes } = req.body;
    const userCognitoId = req.user?.id;

    // Verify the request exists and belongs to landlord's property
    const terminationRequest = await prisma.terminationRequest.findFirst({
      where: {
        id: Number(requestId),
        lease: {
          property: {
            landlordCognitoId: userCognitoId
          }
        }
      },
      include: {
        lease: {
          include: {
            property: {
              include: {
                landlord: true
              }
            },
            tenant: true
          }
        }
      }
    });

    if (!terminationRequest) {
      res.status(404).json({ message: "Termination request not found or you don't have access to it" });
      return;
    }

    if (terminationRequest.status !== "PENDING") {
      res.status(400).json({ message: "This termination request has already been processed" });
      return;
    }

    // Update the termination request and lease if approved
    let updatedRequest;
    
    if (status === "APPROVED") {
      // Use transaction to delete both termination request and lease
      updatedRequest = await prisma.$transaction(async (tx) => {
        // First update termination request to get the final data for response
        const terminationUpdate = await tx.terminationRequest.update({
          where: {
            id: Number(requestId)
          },
          data: {
            status: status,
            landlordNotes: landlordNotes || null,
            processedDate: new Date()
          },
          include: {
            lease: {
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

        // Delete the termination request (foreign key constraint handled)
        await tx.terminationRequest.delete({
          where: {
            id: Number(requestId)
          }
        });
        
        // Delete the lease completely - termination is final
        await tx.lease.delete({
          where: {
            id: terminationRequest.leaseId
          }
        });

        return terminationUpdate;
      });
    } else {
      // If denied, just update the termination request
      updatedRequest = await prisma.terminationRequest.update({
        where: {
          id: Number(requestId)
        },
        data: {
          status: status,
          landlordNotes: landlordNotes || null,
          processedDate: new Date()
        },
        include: {
          lease: {
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
    }

    // Emit socket notification
    if (global.socketServer) {
      global.socketServer.emitTerminationResponse(updatedRequest.leaseId.toString(), {
        terminationRequestId: updatedRequest.id,
        leaseId: updatedRequest.leaseId,
        status: status,
        landlordNotes: landlordNotes || null,
        respondedBy: userCognitoId,
        landlordName: updatedRequest.lease.property.landlord.name,
        propertyName: updatedRequest.lease.property.name
      });
    }

    res.json({
      message: `Termination request ${status.toLowerCase()} successfully`,
      terminationRequest: updatedRequest
    });

  } catch (error: any) {
    console.error("Error updating termination request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


