import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Calculate and update safety indicators for all locations
export const calculateSafetyIndicators = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get all locations with their reviews
    const locations = await prisma.location.findMany({
      include: {
        reviews: true,
        safetyIndicators: true
      }
    });

    const updates = [];

    for (const location of locations) {
      // Filter to only include tenant-to-landlord reviews (safety feedback from tenants only)
      const tenantReviews = location.reviews.filter(review => review.type === 'TENANT_TO_LANDLORD');
      
      if (tenantReviews.length === 0) {
        // No tenant reviews, set to MEDIUM by default
        const upsertData = {
          level: 'MEDIUM' as const,
          reason: 'No tenant safety feedback available',
          locationId: location.id,
          updatedAt: new Date()
        };

        // Check if safety indicator exists
        const existingIndicator = await prisma.safetyIndicator.findFirst({
          where: { locationId: location.id }
        });

        if (existingIndicator) {
          updates.push(
            prisma.safetyIndicator.update({
              where: { id: existingIndicator.id },
              data: upsertData
            })
          );
        } else {
          updates.push(
            prisma.safetyIndicator.create({
              data: upsertData
            })
          );
        }
        continue;
      }

      // Calculate average rating from tenant reviews only
      const totalRating = tenantReviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / tenantReviews.length;

      // Determine safety level based on average rating from tenant reviews only
      let level: 'LOW' | 'MEDIUM' | 'HIGH' = 'MEDIUM';
      let reason = `Based on ${tenantReviews.length} tenant safety feedback (avg: ${averageRating.toFixed(1)})`;

      if (averageRating >= 4) {
        level = 'HIGH';
      } else if (averageRating <= 2) {
        level = 'LOW';
      }

      const upsertData = {
        level,
        reason,
        locationId: location.id,
        updatedAt: new Date()
      };

      // Check if safety indicator exists
      const existingIndicator2 = await prisma.safetyIndicator.findFirst({
        where: { locationId: location.id }
      });

      if (existingIndicator2) {
        updates.push(
          prisma.safetyIndicator.update({
            where: { id: existingIndicator2.id },
            data: upsertData
          })
        );
      } else {
        updates.push(
          prisma.safetyIndicator.create({
            data: upsertData
          })
        );
      }
    }

    // Execute all updates
    await Promise.all(updates);

    res.json({ 
      success: true, 
      message: `Updated safety indicators for ${locations.length} locations` 
    });
  } catch (error: any) {
    console.error("Error calculating safety indicators:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get safety indicator for a specific location
export const getSafetyIndicator = async (req: Request, res: Response): Promise<void> => {
  try {
    const { locationId } = req.params;

    const safetyIndicator = await prisma.safetyIndicator.findFirst({
      where: { locationId: Number(locationId) },
      include: {
        location: {
          select: {
            address: true,
            city: true,
            state: true
          }
        }
      }
    });

    if (!safetyIndicator) {
      res.status(404).json({ message: "Safety indicator not found" });
      return;
    }

    res.json(safetyIndicator);
  } catch (error: any) {
    console.error("Error fetching safety indicator:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all safety indicators (for admin dashboard)
export const getAllSafetyIndicators = async (req: Request, res: Response): Promise<void> => {
  try {
    const safetyIndicators = await prisma.safetyIndicator.findMany({
      include: {
        location: {
          select: {
            id: true,
            address: true,
            city: true,
            state: true,
            country: true,
            reviews: {
              select: {
                rating: true,
                createdAt: true
              }
            }
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    res.json(safetyIndicators);
  } catch (error: any) {
    console.error("Error fetching safety indicators:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Admin override safety level
export const updateSafetyIndicator = async (req: Request, res: Response): Promise<void> => {
  try {
    const { locationId } = req.params;
    const { level, reason } = req.body;

    // Validate level
    if (!['LOW', 'MEDIUM', 'HIGH'].includes(level)) {
      res.status(400).json({ message: "Invalid safety level" });
      return;
    }

    // Check if safety indicator exists
    const existingIndicator = await prisma.safetyIndicator.findFirst({
      where: { locationId: Number(locationId) }
    });

    let updatedIndicator;
    if (existingIndicator) {
      updatedIndicator = await prisma.safetyIndicator.update({
        where: { id: existingIndicator.id },
        data: {
          level,
          reason: reason || `Manually updated by admin`,
          updatedAt: new Date()
        },
        include: {
          location: {
            select: {
              address: true,
              city: true,
              state: true
            }
          }
        }
      });
    } else {
      updatedIndicator = await prisma.safetyIndicator.create({
        data: {
          locationId: Number(locationId),
          level,
          reason: reason || `Manually set by admin`,
          updatedAt: new Date()
        },
        include: {
          location: {
            select: {
              address: true,
              city: true,
              state: true
            }
          }
        }
      });
    }

    res.json(updatedIndicator);
  } catch (error: any) {
    console.error("Error updating safety indicator:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Recalculate safety for a specific location (called after new review)
export const recalculateLocationSafety = async (locationId: number): Promise<void> => {
  try {
    const location = await prisma.location.findUnique({
      where: { id: locationId },
      include: { reviews: true }
    });

    if (!location) return;

    // Filter to only include tenant-to-landlord reviews (safety feedback from tenants only)
    const tenantReviews = location.reviews.filter(review => review.type === 'TENANT_TO_LANDLORD');

    if (tenantReviews.length === 0) {
      const existing = await prisma.safetyIndicator.findFirst({
        where: { locationId }
      });

      if (existing) {
        await prisma.safetyIndicator.update({
          where: { id: existing.id },
          data: {
            level: 'MEDIUM',
            reason: 'No tenant safety feedback available',
            updatedAt: new Date()
          }
        });
      } else {
        await prisma.safetyIndicator.create({
          data: {
            locationId,
            level: 'MEDIUM',
            reason: 'No tenant safety feedback available',
            updatedAt: new Date()
          }
        });
      }
      return;
    }

    const totalRating = tenantReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / tenantReviews.length;

    let level: 'LOW' | 'MEDIUM' | 'HIGH' = 'MEDIUM';
    if (averageRating >= 4) {
      level = 'HIGH';
    } else if (averageRating <= 2) {
      level = 'LOW';
    }

    const existing2 = await prisma.safetyIndicator.findFirst({
      where: { locationId }
    });

    if (existing2) {
      await prisma.safetyIndicator.update({
        where: { id: existing2.id },
        data: {
          level,
          reason: `Based on ${tenantReviews.length} tenant safety feedback (avg: ${averageRating.toFixed(1)})`,
          updatedAt: new Date()
        }
      });
    } else {
      await prisma.safetyIndicator.create({
        data: {
          locationId,
          level,
          reason: `Based on ${tenantReviews.length} tenant safety feedback (avg: ${averageRating.toFixed(1)})`,
          updatedAt: new Date()
        }
      });
    }
  } catch (error) {
    console.error("Error recalculating location safety:", error);
  }
};