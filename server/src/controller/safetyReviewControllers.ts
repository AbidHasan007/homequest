import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { recalculateLocationSafety } from "./safetyControllers";

const prisma = new PrismaClient();

export const createSafetyReview = async (req: Request, res: Response) => {
  try {
    const { locationId, rating, comment } = req.body as {
      locationId: number;
      rating: number;
      comment?: string;
    };

    const userId = (req as any).user?.id as string;
    const role = ((req as any).user?.role as string)?.toLowerCase();

    if (!userId || role !== "tenant") {
      return res.status(401).json({ message: "Only authorized tenants can provide safety feedback" });
    }

    // Verify tenant exists
    const tenant = await prisma.tenant.findUnique({ 
      where: { cognitoId: userId } 
    });
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    // Verify location exists
    const location = await prisma.location.findUnique({
      where: { id: locationId }
    });
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    // Verify tenant has lived in this location (has an active or completed lease)
    const tenantLease = await prisma.lease.findFirst({
      where: {
        tenantCognitoId: userId,
        property: {
          locationId: locationId
        }
      },
      include: {
        property: true
      }
    });

    if (!tenantLease) {
      return res.status(403).json({ 
        message: "You can only provide safety feedback for areas where you have lived" 
      });
    }

    // Check if tenant already provided safety review for this location
    const existingSafetyReview = await prisma.review.findFirst({
      where: {
        tenantId: tenant.id,
        locationId: locationId,
        type: "TENANT_TO_LANDLORD",
        comment: {
          contains: "[SAFETY_REVIEW]" // Mark safety reviews with a special identifier
        }
      }
    });

    if (existingSafetyReview) {
      return res.status(409).json({ 
        message: "You have already provided safety feedback for this location" 
      });
    }

    // Find a landlord for this location (any property owner in this location)
    const landlord = await prisma.landlord.findFirst({
      where: {
        properties: {
          some: {
            locationId: locationId
          }
        }
      }
    });

    if (!landlord) {
      return res.status(404).json({ message: "No landlord found for this location" });
    }

    // Create safety review
    const safetyReview = await prisma.review.create({
      data: {
        rating: Math.max(1, Math.min(5, Number(rating))),
        comment: `[SAFETY_REVIEW] ${comment || 'Safety feedback'}`,
        tenantId: tenant.id,
        landlordId: landlord.id,
        locationId: locationId,
        leaseId: tenantLease.id,
        type: "TENANT_TO_LANDLORD"
      },
      include: {
        tenant: {
          select: { name: true, email: true }
        },
        location: {
          select: { address: true, city: true, state: true }
        }
      }
    });

    // Recalculate safety indicator for the location
    await recalculateLocationSafety(locationId);

    return res.status(201).json({
      message: "Safety feedback submitted successfully",
      review: safetyReview
    });

  } catch (err: any) {
    console.error("Error creating safety review:", err);
    return res.status(500).json({ 
      message: err.message || "Internal server error" 
    });
  }
};

export const getTenantSafetyReviews = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id as string;
    const role = ((req as any).user?.role as string)?.toLowerCase();

    if (!userId || role !== "tenant") {
      return res.status(401).json({ message: "Only tenants can view their safety reviews" });
    }

    const tenant = await prisma.tenant.findUnique({
      where: { cognitoId: userId }
    });

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    const safetyReviews = await prisma.review.findMany({
      where: {
        tenantId: tenant.id,
        type: "TENANT_TO_LANDLORD",
        comment: {
          contains: "[SAFETY_REVIEW]"
        }
      },
      include: {
        location: {
          select: { address: true, city: true, state: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return res.json(safetyReviews);

  } catch (err: any) {
    console.error("Error fetching safety reviews:", err);
    return res.status(500).json({ 
      message: err.message || "Internal server error" 
    });
  }
};

export const getLocationSafetyReviews = async (req: Request, res: Response) => {
  try {
    const { locationId } = req.params;

    const safetyReviews = await prisma.review.findMany({
      where: {
        locationId: Number(locationId),
        type: "TENANT_TO_LANDLORD",
        comment: {
          contains: "[SAFETY_REVIEW]"
        }
      },
      include: {
        tenant: {
          select: { name: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    // Calculate statistics
    const stats = {
      totalReviews: safetyReviews.length,
      averageRating: safetyReviews.length > 0 
        ? safetyReviews.reduce((sum, review) => sum + review.rating, 0) / safetyReviews.length 
        : 0,
      ratingDistribution: {
        1: safetyReviews.filter(r => r.rating === 1).length,
        2: safetyReviews.filter(r => r.rating === 2).length,
        3: safetyReviews.filter(r => r.rating === 3).length,
        4: safetyReviews.filter(r => r.rating === 4).length,
        5: safetyReviews.filter(r => r.rating === 5).length,
      }
    };

    return res.json({
      reviews: safetyReviews,
      statistics: stats
    });

  } catch (err: any) {
    console.error("Error fetching location safety reviews:", err);
    return res.status(500).json({ 
      message: err.message || "Internal server error" 
    });
  }
};