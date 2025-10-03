import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const locations = [
  {
    id: 1,
    country: "Bangladesh",
    city: "Dhaka",
    state: "Dhaka",
    address: "House 10, Road 7",
    postalCode: "1207",
    coordinates: "POINT(90.4125 23.8103)", // lng lat
  },
  {
    id: 2,
    country: "Bangladesh",
    city: "Chattogram",
    state: "Chattogram",
    address: "Plot 5, Agrabad",
    postalCode: "4000",
    coordinates: "POINT(91.8319 22.3569)",
  }
];

async function insertLocationData(locations: any[]) {
  for (const location of locations) {
    const { id, country, city, state, address, postalCode, coordinates } = location;

    try {
      await prisma.$executeRawUnsafe(`
        INSERT INTO "Location" ("id", "country", "city", "state", "address", "postalCode", "coordinates") 
        VALUES (${id}, '${country}', '${city}', '${state}', '${address}', '${postalCode}', ST_GeogFromText('${coordinates}'));
      `);
      console.log(`✅ Inserted location: ${city}`);
    } catch (error) {
      console.error(`❌ Failed to insert location: ${city}`, error);
    }
  }
}

async function main() {
  // Admin
  await prisma.admin.create({
    data: {
      cognitoId: 'admin-001',
      name: 'System Admin',
      email: 'admin@example.com',
      phoneNumber: '01711111111',
    }
  })

  // Landlords
  const landlord1 = await prisma.landlord.create({
    data: {
      cognitoId: 'landlord-001',
      name: 'John Doe',
      email: 'john@example.com',
      phoneNumber: '01722222222',
    }
  })

  const landlord2 = await prisma.landlord.create({
    data: {
      cognitoId: 'landlord-002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phoneNumber: '01733333333',
    }
  })

  // Tenants
  const tenant1 = await prisma.tenant.create({
    data: {
      cognitoId: 'tenant-001',
      name: 'Alex Hossain',
      email: 'alex@example.com',
      phoneNumber: '01888888888',
    }
  })

  const tenant2 = await prisma.tenant.create({
    data: {
      cognitoId: 'tenant-002',
      name: 'Fatema Khan',
      email: 'fatema@example.com',
      phoneNumber: '01899999999',
    }
  })

  // Insert Locations (must be done before properties!)
  await insertLocationData(locations)

  // Properties
  const property1 = await prisma.property.create({
    data: {
      name: 'Cozy Apartment',
      description: 'Nice and clean place.',
      pricePerMonth: 15000,
      securityDeposit: 10000,
      photoUrls: ['url1.jpg', 'url2.jpg'],
      amenities: ['AirConditioning', 'WiFi'],
      highlights: ['CloseToTransit'],
      isPetsAllowed: true,
      isParkingIncluded: true,
      isBachelorFriendly: true,
      genderPreference: 'Mixed',
      beds: 2,
      baths: 1.5,
      squareFeet: 900,
      propertyType: 'Apartment',
      locationId: locations[0].id,
      landlordCognitoId: landlord1.cognitoId,
    }
  })

  const property2 = await prisma.property.create({
    data: {
      name: 'Studio Flat',
      description: 'Great for bachelors.',
      pricePerMonth: 10000,
      securityDeposit: 5000,
      photoUrls: ['flat1.jpg'],
      amenities: ['Refrigerator', 'WiFi'],
      highlights: ['QuietNeighborhood'],
      isPetsAllowed: false,
      isParkingIncluded: false,
      isBachelorFriendly: true,
      genderPreference: 'MaleOnly',
      beds: 1,
      baths: 1,
      squareFeet: 500,
      propertyType: 'Rooms',
      locationId: locations[1].id,
      landlordCognitoId: landlord2.cognitoId,
    }
  })

  // Application
  const application = await prisma.application.create({
    data: {
      applicationDate: new Date(),
      status: 'Pending',
      propertyId: property1.id,
      tenantCognitoId: tenant1.cognitoId,
      name: tenant1.name,
      email: tenant1.email,
      phoneNumber: tenant1.phoneNumber,
      message: 'Looking forward to rent this property.'
    }
  })

  // Lease
  const lease = await prisma.lease.create({
    data: {
      startDate: new Date('2025-09-01'),
      endDate: new Date('2026-09-01'),
      rent: 15000,
      deposit: 10000,
      propertyId: property1.id,
      tenantCognitoId: tenant1.cognitoId,
      application: {
        connect: { id: application.id }
      }
    }
  })

  // Payment
  await prisma.payment.create({
    data: {
      amountDue: 15000,
      amountPaid: 15000,
      dueDate: new Date('2025-09-01'),
      paymentDate: new Date('2025-09-01'),
      paymentStatus: 'Paid',
      leaseId: lease.id
    }
  })

  // Review
  await prisma.review.createMany({
    data: [
      {
        rating: 5,
        comment: 'Excellent experience!',
        tenantId: tenant1.id,
        landlordId: landlord1.id,
        locationId: locations[0].id,
      },
      {
        rating: 3,
        comment: 'Good but can improve.',
        tenantId: tenant2.id,
        landlordId: landlord2.id,
        locationId: locations[1].id,
      }
    ]
  })

  // Safety Indicators
  await prisma.safetyIndicator.createMany({
    data: [
      {
        level: 'HIGH',
        reason: 'CCTV and security present.',
        locationId: locations[0].id,
      },
      {
        level: 'LOW',
        reason: 'Reported thefts recently.',
        locationId: locations[1].id,
      }
    ]
  })
}

main()
  .then(() => console.log('🌱 Seed complete'))
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
