import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { recalculateLocationSafety } from "./safetyControllers";

const prisma = new PrismaClient();



export const createReview = async (req: Request, res: Response) => {
  try {
    const { leaseId, rating, comment } = req.body as {
      leaseId: number;
      rating: number;
      comment?: string;
    };

    const userId = (req as any).user?.id as string;
    const role = ((req as any).user?.role as string)?.toLowerCase();
    if (!userId || !role) return res.status(401).json({ message: "Unauthorized" });

    // Find lease
    const lease = await prisma.lease.findUnique({
      where: { id: leaseId },
      include: { property: true, tenant: true },
    });
    if (!lease) return res.status(404).json({ message: "Lease not found" });

    const landlord = await prisma.landlord.findUnique({ where: { cognitoId: lease.property.landlordCognitoId } });
    const tenant = await prisma.tenant.findUnique({ where: { cognitoId: lease.tenantCognitoId } });
    if (!landlord || !tenant) return res.status(400).json({ message: "Participants not found" });

    let type: "TENANT_TO_LANDLORD" | "LANDLORD_TO_TENANT";
    if (role === "tenant" && tenant.cognitoId === userId) type = "TENANT_TO_LANDLORD";
    else if (role === "landlord" && landlord.cognitoId === userId) type = "LANDLORD_TO_TENANT";
    else return res.status(403).json({ message: "Not allowed to review this lease" });

    const existing = await prisma.review.findFirst({
      where: { leaseId, type },
    });
    if (existing) return res.status(409).json({ message: "Review already exists for this lease" });

    const newReview = await prisma.review.create({
      data: {
        leaseId,
        // propertyId: lease.propertyId,
        rating: Math.max(1, Math.min(5, Number(rating)) ),
        comment: comment || null,
        tenantId: tenant.id,
        landlordId: landlord.id,
        locationId: lease.property.locationId,
        type,
      },
    });

    // Optional: update averageRating on property
    const agg = await prisma.review.aggregate({
      _avg: { rating: true },
      _count: { rating: true },
      where: { leaseId: lease.id, 
        locationId: lease.property.locationId,
        type: "TENANT_TO_LANDLORD" },
    });
    await prisma.property.update({
      where: { id: lease.propertyId },
      data: { averageRating: agg._avg.rating ?? 0, numberOfReviews: agg._count.rating ?? 0 },
    });

    // Recalculate safety indicator for the location
    await recalculateLocationSafety(lease.property.locationId);

    return res.status(201).json(newReview);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message || "Internal server error" });
  }
};



export const getReviews = async (req: Request, res: Response) => {
  try {
    const { propertyId, type, userId } = req.query as { propertyId?: string; type?: string; userId?: string };

    if (!propertyId && !userId) return res.status(400).json({ message: "propertyId or userId required" });

    let whereClause: any = {};
    if (propertyId) {
      whereClause.lease = { propertyId: Number(propertyId) };
    }
    if (userId) {
      // Find landlord or tenant by cognitoId
      const landlord = await prisma.landlord.findUnique({ where: { cognitoId: userId } });
      const tenant = await prisma.tenant.findUnique({ where: { cognitoId: userId } });
      if (!landlord && !tenant) return res.status(404).json({ message: "User not found" });
      whereClause.OR = [
        landlord ? { landlordId: landlord.id } : undefined,
        tenant ? { tenantId: tenant.id } : undefined,
      ].filter(Boolean);
    }
    if (type) {
      whereClause.type = type === "tenant" ? "TENANT_TO_LANDLORD" : "LANDLORD_TO_TENANT";
    }

    const reviews = await prisma.review.findMany({
      where: whereClause,
      include: { tenant: true, landlord: true },
      orderBy: { createdAt: "desc" },
    });

    return res.json(reviews);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message || "Internal server error" });
  }
};


