import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// Get tenant information
export const getAdmin = async (req: Request, res: Response): Promise<void> => {
    try{

        const { cognitoId } = req.params;
        const admin =  await prisma.admin.findUnique({
            where: {cognitoId},
            
    });
       if(admin){
         res.json(admin)
       }else{
         res.status(404).json({message: "Admin not found"});
       }
}catch (error: any) {
    console.error("Error fetching admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


// Create a new admin

export const createAdmin = async (req: Request, res: Response): Promise<void> => {
    try{

        const { cognitoId, name, email, phoneNumber } = req.body;
        const admin =  await prisma.admin.create({
            data: { 
                    cognitoId,
                    name,
                    email,
                    phoneNumber
                }
    });
         res.status(201).json(admin);
}catch (error: any) {
    res.status(500).json({ message: "Error creating admin" });
  }
}

// Update admin information

// Update landlord information
export const updateAdmin = async (req: Request, res: Response): Promise<void> => {
    try{
         const { cognitoId } = req.params;
        const { name, email, phoneNumber } = req.body;
        const updateAdmin=  await prisma.admin.update({
            where: { cognitoId },
            data: { 
                    name,
                    email,
                    phoneNumber
                }
    });
         res.status(201).json(updateAdmin);
}catch (error: any) {
    res.status(500).json({ message: "Error updating admin" });
  }
}

// User Management Functions

// Get all users (tenants, landlords, admins)
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get all tenants
    const tenants = await prisma.tenant.findMany({
      include: {
        applications: { select: { id: true } }
      }
    });

    // Get all landlords
    const landlords = await prisma.landlord.findMany({
      include: {
        properties: { select: { id: true } }
      }
    });

    // Get all admins
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        cognitoId: true,
        name: true,
        email: true,
        phoneNumber: true,
      }
    });

    // Format the data
    const allUsers = [
      ...tenants.map(tenant => ({
        id: tenant.id,
        cognitoId: tenant.cognitoId,
        name: tenant.name,
        email: tenant.email,
        phoneNumber: tenant.phoneNumber,
        userType: 'tenant' as const,
        isActive: true,
        nidStatus: null,
        verifiedAt: null,
        rejectedAt: null,
        verificationStatus: null,
        propertyCount: 0,
        applicationCount: tenant.applications.length,
        createdAt: new Date().toISOString(),
        lastLogin: null
      })),
      ...landlords.map(landlord => ({
        id: landlord.id,
        cognitoId: landlord.cognitoId,
        name: landlord.name,
        email: landlord.email,
        phoneNumber: landlord.phoneNumber,
        userType: 'landlord' as const,
        isActive: true,
        nidStatus: landlord.nidStatus || 'PENDING',
        verifiedAt: landlord.verifiedAt?.toISOString() || null,
        rejectedAt: landlord.rejectedAt?.toISOString() || null,
        verificationStatus: landlord.verifiedAt ? 'verified' : 
                           landlord.nidStatus === 'REJECTED' ? 'rejected' : 
                           'pending',
        propertyCount: landlord.properties.length,
        applicationCount: 0,
        createdAt: new Date().toISOString(),
        lastLogin: null
      })),
      ...admins.map(admin => ({
        id: admin.id,
        cognitoId: admin.cognitoId,
        name: admin.name,
        email: admin.email,
        phoneNumber: admin.phoneNumber,
        userType: 'admin' as const,
        isActive: true,
        nidStatus: null,
        verifiedAt: null,
        rejectedAt: null,
        verificationStatus: null,
        propertyCount: 0,
        applicationCount: 0,
        createdAt: new Date().toISOString(),
        lastLogin: null
      }))
    ];

    res.json({
      success: true,
      data: allUsers
    });

  } catch (error: any) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
};

// Update user information
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const { name, email, phoneNumber, userType, isActive, nidStatus } = req.body;
    
    console.log('Update user request:', { cognitoId, name, email, phoneNumber, userType, isActive, nidStatus });

    let updatedUser;

    // Update based on user type
    switch (userType) {
      case 'tenant':
        updatedUser = await prisma.tenant.update({
          where: { cognitoId },
          data: { name, email, phoneNumber }
        });
        break;
      case 'landlord':
        const landlordUpdateData: any = { name, email, phoneNumber };
        
        // Handle nidStatus updates for landlords
        if (nidStatus !== undefined) {
          console.log('Updating nidStatus for landlord:', nidStatus);
          landlordUpdateData.nidStatus = nidStatus;
          
          // Update verification timestamps based on status
          if (nidStatus === 'VERIFIED') {
            landlordUpdateData.verifiedAt = new Date();
            landlordUpdateData.rejectedAt = null;
            console.log('Setting verifiedAt timestamp');
          } else if (nidStatus === 'REJECTED') {
            landlordUpdateData.rejectedAt = new Date();
            landlordUpdateData.verifiedAt = null;
            console.log('Setting rejectedAt timestamp');
          } else if (nidStatus === 'PENDING') {
            landlordUpdateData.verifiedAt = null;
            landlordUpdateData.rejectedAt = null;
            console.log('Clearing all verification timestamps');
          }
        } else {
          console.log('No nidStatus update (value:', nidStatus, ')');
        }
        
        console.log('Final landlord update data:', landlordUpdateData);
        
        updatedUser = await prisma.landlord.update({
          where: { cognitoId },
          data: landlordUpdateData
        });
        break;
      case 'admin':
        updatedUser = await prisma.admin.update({
          where: { cognitoId },
          data: { name, email, phoneNumber }
        });
        break;
      default:
        res.status(400).json({ 
          success: false,
          message: "Invalid user type" 
        });
        return;
    }

    res.json({
      success: true,
      data: updatedUser,
      message: "User updated successfully"
    });

  } catch (error: any) {
    console.error("Error updating user:", error);
    if (error.code === 'P2025') {
      res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    } else {
      res.status(500).json({ 
        success: false,
        message: "Internal server error" 
      });
    }
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;

    // Prevent deletion if this is the currently logged-in admin (if you have such logic)
    // You might want to add this check based on your authentication system
    
    // First, find which type of user this is
    const tenant = await prisma.tenant.findUnique({ where: { cognitoId } });
    const landlord = await prisma.landlord.findUnique({ where: { cognitoId } });
    const admin = await prisma.admin.findUnique({ where: { cognitoId } });

    if (!tenant && !landlord && !admin) {
      res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
      return;
    }

    // Delete based on user type with proper cleanup of related data
    if (tenant) {
      // Delete tenant's related data first
      await prisma.$transaction(async (tx) => {
        // Delete tenant's reviews
        await tx.review.deleteMany({ where: { tenantId: tenant.id } });
        
        // Delete tenant's applications
        await tx.application.deleteMany({ where: { tenantCognitoId: cognitoId } });
        
        // Delete tenant's leases
        await tx.lease.deleteMany({ where: { tenantCognitoId: cognitoId } });
        
        // Remove tenant from favorite properties
        const properties = await tx.property.findMany({
          where: { favoritedBy: { some: { cognitoId } } }
        });
        
        for (const property of properties) {
          await tx.property.update({
            where: { id: property.id },
            data: { favoritedBy: { disconnect: { cognitoId } } }
          });
        }
        
        // Finally delete the tenant
        await tx.tenant.delete({ where: { cognitoId } });
      });
    } else if (landlord) {
      // Delete landlord's related data first
      await prisma.$transaction(async (tx) => {
        // Get all landlord's properties
        const properties = await tx.property.findMany({
          where: { landlordCognitoId: cognitoId }
        });
        
        const propertyIds = properties.map(p => p.id);
        
        if (propertyIds.length > 0) {
          // Delete applications for landlord's properties
          await tx.application.deleteMany({
            where: { propertyId: { in: propertyIds } }
          });
          
          // Delete leases for landlord's properties
          await tx.lease.deleteMany({
            where: { propertyId: { in: propertyIds } }
          });
        }
        
        // Delete landlord's reviews
        await tx.review.deleteMany({ where: { landlordId: landlord.id } });
        
        // Delete landlord's properties
        await tx.property.deleteMany({ where: { landlordCognitoId: cognitoId } });
        
        // Finally delete the landlord
        await tx.landlord.delete({ where: { cognitoId } });
      });
    } else if (admin) {
      // Admins typically don't have related data, so direct delete should work
      await prisma.admin.delete({ where: { cognitoId } });
    }

    res.json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (error: any) {
    console.error("Error deleting user:", error);
    
    if (error.code === 'P2003') {
      res.status(400).json({ 
        success: false,
        message: "Cannot delete user due to related data. This should not happen with the new deletion logic. Please contact support." 
      });
    } else if (error.code === 'P2025') {
      res.status(404).json({ 
        success: false,
        message: "User not found or already deleted." 
      });
    } else {
      console.error("Unexpected error during user deletion:", {
        cognitoId: req.params.cognitoId,
        error: error.message,
        stack: error.stack
      });
      
      res.status(500).json({ 
        success: false,
        message: "Internal server error. Please try again or contact support." 
      });
    }
  }
};