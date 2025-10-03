import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Add this route to handle address-only updates
export const updateVerificationAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const { cognitoId } = req.params;
    const { address, latitude, longitude } = req.body;

    if (!address || !latitude || !longitude) {
      res.status(400).json({ 
        success: false, 
        message: 'Address, latitude, and longitude are required' 
      });
      return;
    }

    // Find the landlord
    const landlord = await prisma.landlord.findUnique({
      where: { cognitoId }
    });

    if (!landlord) {
      res.status(404).json({ 
        success: false, 
        message: 'Landlord not found' 
      });
      return;
    }

    // Update address and coordinates
    const updatedLandlord = await prisma.landlord.update({
      where: { cognitoId },
      data: {
        address,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      }
    });



    res.json({ 
      success: true, 
      message: 'Address updated successfully',
      data: {
        address: updatedLandlord.address,
        latitude: updatedLandlord.latitude,
        longitude: updatedLandlord.longitude
      }
    });

  } catch (error: any) {
    console.error('=== UPDATE ADDRESS ERROR ===');
    console.error('Error:', error);
    console.error('=============================');
    
    res.status(500).json({ 
      success: false, 
      message: `Failed to update address: ${error?.message || 'Unknown error'}` 
    });
  }
};