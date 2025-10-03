import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";
const prisma = new PrismaClient();
// Get tenant information
export const getTenant = async (req: Request, res: Response): Promise<void> => {
    try{

        const { cognitoId } = req.params;
        const tenant =  await prisma.tenant.findUnique({
            where: {cognitoId},
            include: {
                favorites: true
            }
    });
       if(tenant){
         res.json(tenant)
       }else{
         res.status(404).json({message: "Tenant not found"});
       }
}catch (error: any) {
    console.error("Error fetching tenant:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


// Create a new tenant

export const createTenant = async (req: Request, res: Response): Promise<void> => {
    try{

        const { cognitoId, name, email, phoneNumber } = req.body;
        const tenant =  await prisma.tenant.create({
            data: { 
                    cognitoId,
                    name,
                    email,
                    phoneNumber
                }
    });
         res.status(201).json(tenant);
}catch (error: any) {
    res.status(500).json({ message: "Error creating tenant" });
  }
}

// Update tenant information
export const updateTenant = async (req: Request, res: Response): Promise<void> => {
    try{
         const { cognitoId } = req.params;
        const { name, email, phoneNumber } = req.body;
        const updateTenant =  await prisma.tenant.update({
            where: { cognitoId },
            data: { 
                    name,
                    email,
                    phoneNumber
                }
    });
         res.status(201).json(updateTenant);
}catch (error: any) {
    res.status(500).json({ message: "Error updating tenant" });
  }
};

// Get current residences for a tenant

export const getCurrentResidence = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    console.log(`Fetching current residences for cognitoId: ${cognitoId}`);
    const currentDate = new Date();
    
    // First, activate any leases whose start date has arrived
    await prisma.lease.updateMany({
      where: {
        status: 'PENDING_START',
        startDate: {
          lte: currentDate
        }
      },
      data: {
        status: 'ACTIVE'
      }
    });
    
    // Get leases that are either:
    // 1. Currently active (started and not deleted)
    // 2. Future leases from approved applications (starting soon)
    const leases = await prisma.lease.findMany({
      where: {
        tenantCognitoId: cognitoId,
        status: {
          in: ['ACTIVE', 'PENDING_START'] // Only active or pending start leases
        }
      },
      include: { 
        property: { 
          include: { location: true } 
        },
        application: {
          select: {
            status: true
          }
        }
      },
    });
    
    console.log(`Found ${leases.length} leases (current and upcoming)`);
    
    // Additional filter: only include leases that are from approved applications
    // Also handle leases that might not have associated applications (legacy data)
    const activeLeases = leases.filter(lease => {
      // If there's no application associated, don't include it (this shouldn't happen in normal flow)
      if (!lease.application) {
        console.log(`Lease ${lease.id}: no associated application, excluding from residences`);
        return false;
      }
      
      const isApproved = lease.application.status === 'Approved';
      const isCurrentlyActive = lease.status === 'ACTIVE' && lease.startDate <= currentDate;
      const isUpcoming = lease.status === 'PENDING_START' && lease.startDate > currentDate;
      
      console.log(`Lease ${lease.id}: application status = ${lease.application.status}, approved = ${isApproved}, current = ${isCurrentlyActive}, upcoming = ${isUpcoming}`);
      return isApproved;
    });
    
    console.log(`Found ${activeLeases.length} current residences from approved applications`);
    
    const residences = activeLeases
      .map(lease => {
        const isCurrentlyActive = lease.status === 'ACTIVE' && lease.startDate <= currentDate;
        const isUpcoming = lease.status === 'PENDING_START';
        
        // Calculate days lived (for active leases) or days until start (for upcoming leases)
        const daysSinceStart = isCurrentlyActive 
          ? Math.floor((currentDate.getTime() - lease.startDate.getTime()) / (1000 * 60 * 60 * 24))
          : 0;
        const daysUntilStart = isUpcoming
          ? Math.ceil((lease.startDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))
          : 0;

        return {
          ...lease.property,
          lease: {
            id: lease.id,
            startDate: lease.startDate,
            // No endDate - ongoing lease
            rent: lease.rent,
            deposit: lease.deposit,
            status: isCurrentlyActive ? 'active' : isUpcoming ? 'upcoming' : 'pending',
            daysLived: daysSinceStart,
            daysUntilStart: daysUntilStart
          }
        };
      })
      .filter(property => property !== null && property !== undefined && property.id)
      .filter((property, index, self) => index === self.findIndex(p => p.id === property.id)); // Deduplicate by id
    
    res.json(residences);
  } catch (err: any) {
    console.error("Error fetching current residences:", err);
    res.status(500).json({ message: `Error fetching current residences: ${err.message}` });
  }
};

// property add to favorite

export const addFavoriteProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
       const {cognitoId, propertyId} = req.params;
       const tenant = await prisma.tenant.findUnique({
        where: {cognitoId},
        include: {favorites: true},
       }) ;
       const propertyIdNumber = Number(propertyId);
       const existingFavorites= tenant?.favorites || [];

       
       if(!existingFavorites.some((fav)=> fav.id === propertyIdNumber)){
        const updatedTenant = await prisma.tenant.update({
          where:{cognitoId},
          data: {
            favorites:{
              connect: {id: propertyIdNumber}
            }
          },
          include: { favorites: true}
        });

        res.json(updatedTenant)

       }else{
        res.status(409).json({message: "Property already added as favorite"});
       }


  }catch (err: any) {
    res
      .status(500)
      .json({ message: `Error adding favorite property : ${err.message}` });
  }
};



// property remove from favorite

export const removeFavoriteProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
       const {cognitoId, propertyId} = req.params;
       const propertyIdNumber = Number(propertyId);
       const updatedTenant = await prisma.tenant.update({
        where: {cognitoId},
        data:{
          favorites:{
            disconnect: {id: propertyIdNumber},
          },
        },
        include: {favorites: true}
       })
       
        res.json(updatedTenant)


  }catch (err: any) {
    res
      .status(500)
      .json({ message: `Error removing favorite property : ${err.message}` });
  }
};