import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";
const prisma = new PrismaClient();
// Get tenant information
export const getLandlord = async (req: Request, res: Response): Promise<void> => {
    try{

        const { cognitoId } = req.params;
        const landlord =  await prisma.landlord.findUnique({
            where: {cognitoId},
            
    });
       if(landlord){
         res.json(landlord)
       }else{
         res.status(404).json({message: "Landlord not found"});
       }
}catch (error: any) {
    console.error("Error fetching landlord:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


// Create a new landlord

export const createLandlord = async (req: Request, res: Response): Promise<void> => {
    try{

        const { cognitoId, name, email, phoneNumber } = req.body;
        const landlord =  await prisma.landlord.create({
            data: { 
                    cognitoId,
                    name,
                    email,
                    phoneNumber
                }
    });
         res.status(201).json(landlord);
}catch (error: any) {
    res.status(500).json({ message: "Error creating landlord" });
  }
}

// Update landlord information
export const updateLandlord = async (req: Request, res: Response): Promise<void> => {
    try{
         const { cognitoId } = req.params;
        const { name, email, phoneNumber } = req.body;
        const updateLandlord =  await prisma.landlord.update({
            where: { cognitoId },
            data: { 
                    name,
                    email,
                    phoneNumber
                }
    });
         res.status(201).json(updateLandlord);
}catch (error: any) {
    res.status(500).json({ message: "Error updating landlord" });
  }
}


// get landlord property


export const getLandlordProperties = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const properties = await prisma.property.findMany({
      where: {landlordCognitoId: cognitoId},
      include: {
        location: true
      }
    });

    const propertiesWithFormattedLocation = await Promise.all(
      properties.map(
        async(property)=>{
              const coordinates: { coordinates: string }[] =
        await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates from "Location" where id = ${property.location.id}`;

      const geoJSON: any = wktToGeoJSON(coordinates[0]?.coordinates || "");
      const longitude = geoJSON.coordinates[0];
      const latitude = geoJSON.coordinates[1];

      const propertyWithCoordinates = {
        ...property,
        location: {
          ...property.location,
          coordinates: {
            longitude,
            latitude,
          },
        },
      };
      
      return propertyWithCoordinates;
        }
      )
    )

      
      res.json(propertiesWithFormattedLocation);
    
  } catch (err: any) {
    res
      .status(500)
      .json({ message: `Error retrieving landlord property: ${err.message}` });
  }
};

export const getLandlordProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Cognito ID
    console.log("Looking for landlord with cognitoId:", id);
    const landlord = await prisma.landlord.findUnique({
      where: { cognitoId: id },
      include: {
        properties: {
          include: {
            location: true,
          },
        },
        reviews: {
          include: {
            tenant: true,
            lease: {
              include: {
                property: {
                  include: {
                    location: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!landlord) {
      console.log("No landlord found for cognitoId:", id);
      return res.status(404).json({ message: "Landlord not found" });
    }

    console.log("Found landlord:", landlord.cognitoId);

    // Calculate statistics
    const propertyCount = landlord.properties.length;
    const reviewCount = landlord.reviews.length;
    const averageRating = reviewCount > 0
      ? landlord.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
      : 0;

    // Calculate current tenant count (active leases)
    const activeLeases = await prisma.lease.count({
      where: {
        property: {
          landlordCognitoId: landlord.cognitoId,
        },
        status: 'ACTIVE',
      },
    });

    const profile = {
      ...landlord,
      phone: landlord.phoneNumber, // Map phoneNumber to phone for frontend compatibility
      propertyCount,
      reviewCount,
      averageRating,
      tenantCount: activeLeases,
    };

    console.log("Returning profile for landlord:", profile.cognitoId);
    res.json(profile);
  } catch (err: any) {
    console.error("getLandlordProfile error:", err);
    res.status(500).json({ message: err?.message || "Internal server error" });
  }
};

// Test function to manually verify a landlord (for debugging)
export const testVerifyLandlord = async (req: Request, res: Response) => {
  try {
    const { cognitoId } = req.params;
    
    const updatedLandlord = await prisma.landlord.update({
      where: { cognitoId },
      data: {
        verifiedAt: new Date(),
        nidStatus: 'VERIFIED',
      },
    });
    
    res.json({ message: 'Landlord verified for testing', landlord: updatedLandlord });
  } catch (err: any) {
    console.error("testVerifyLandlord error:", err);
    res.status(500).json({ message: err?.message || "Internal server error" });
  }
};


