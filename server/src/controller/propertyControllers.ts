import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";
import axios from "axios";
import { S3Client } from "@aws-sdk/client-s3";
import { Location } from "@prisma/client";
import { Upload } from "@aws-sdk/lib-storage";
const prisma = new PrismaClient();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
});
// Get properties information
export const getProperties = async (req: Request, res: Response): Promise<void> => {
    try{

        const {
            favoriteIds,
            priceRange,
            priceMin,
            priceMax,
            beds,
            baths,
            propertyType,
            squareFeetMin,
            squareFeetMax,
            amenities,
            availableFrom,
            latitude,
            longitude,
            radius,
            boundsNorth,
            boundsSouth,
            boundsEast,
            boundsWest,

        } = req.query;

        console.log('Server received query parameters:', {
            favoriteIds,
            priceRange,
            priceMin,
            priceMax,
            beds,
            baths,
            propertyType,
            squareFeetMin,
            squareFeetMax,
            amenities,
            availableFrom,
            latitude,
            longitude,
            radius,
            boundsNorth,
            boundsSouth,
            boundsEast,
            boundsWest,
        });

        let whereConditions: Prisma.Sql[] = [];
        if (favoriteIds) {
            const favoriteIdsArray = (favoriteIds as string).split(",").map(Number);
            whereConditions.push(Prisma.sql`p.id IN (${Prisma.join(favoriteIdsArray)})`);
        }
        // Handle price filtering - support both old priceRange format and new separate priceMin/priceMax
        let priceMinValue = null;
        let priceMaxValue = null;
        
        if (priceRange && typeof priceRange === 'string') {
            // Old format: "1000,5000"
            const [min, max] = priceRange.split(',').map(p => p ? Number(p) : null);
            priceMinValue = min;
            priceMaxValue = max;
        } else {
            // New format: separate priceMin and priceMax parameters
            priceMinValue = priceMin ? Number(priceMin) : null;
            priceMaxValue = priceMax ? Number(priceMax) : null;
        }
        
        if (priceMinValue) {
            whereConditions.push(
                Prisma.sql`p."pricePerMonth" >= ${Number(priceMinValue)}`
            );
        }
        if (priceMaxValue) {
            whereConditions.push(
                Prisma.sql`p."pricePerMonth" <= ${Number(priceMaxValue)}`
            );
        }
        if (beds && beds !== "any"){
            whereConditions.push(
                Prisma.sql`p.beds = ${Number(beds)}`
            );
        }
        if (baths && baths !== "any"){
            whereConditions.push(
                Prisma.sql`p.baths = ${Number(baths)}`
            );
        }
        if(squareFeetMin){
            whereConditions.push(
                Prisma.sql`p."squareFeet" >= ${Number(squareFeetMin)}`
            );
        }
        if(squareFeetMax){
            whereConditions.push(
                Prisma.sql`p."squareFeet" <= ${Number(squareFeetMax)}`
            );
        }
        if(propertyType && propertyType !== "any"){
            whereConditions.push(
                Prisma.sql`p."propertyType" = ${propertyType}::"PropertyType"`
            );
        }
        if(amenities && amenities !== "any"){
            const amenitiesArray = (amenities as string).split(",");
                whereConditions.push(
                   Prisma.sql`p.amenities @> ${amenitiesArray}`
                );
            
        };

        if (availableFrom && availableFrom !== "any") {
      const availableFromDate =
        typeof availableFrom === "string" ? availableFrom : null;
      if (availableFromDate) {
        try {
          const date = new Date(availableFromDate);
          if (!isNaN(date.getTime()) && date > new Date('1900-01-01')) {
            console.log(`Applying availableFrom filter: ${availableFromDate} -> ${date.toISOString()}`);
            // Find properties that are available from the specified date
            // This means either:
            // 1. No lease exists for this property at all (completely available)
            // 2. Or existing leases end before the desired availability date
            // Note: Terminated leases are deleted from DB, so they won't appear in this query
            whereConditions.push(
              Prisma.sql`NOT EXISTS (
                SELECT 1 FROM "Lease" l 
                WHERE l."propertyId" = p.id 
                AND l."startDate" <= ${date.toISOString()}::timestamp
                AND (l."endDate" IS NULL OR l."endDate"::timestamp > ${date.toISOString()}::timestamp)
                AND l.status IN ('ACTIVE', 'PENDING_START')
              )`
            );
          } else {
            console.warn(`Invalid availableFrom date (${availableFromDate}): Date is NaN or before 1900`);
            // Don't throw error, just skip the filter
          }
        } catch (error) {
          console.error(`Error parsing availableFrom date: ${availableFromDate}`, error);
          // Don't throw error, just skip the filter to prevent API failure
        }
      }
    }; //end

    if (latitude && longitude && latitude !== "0" && longitude !== "0") {
      const lat = parseFloat(latitude as string);
      const lng = parseFloat(longitude as string);
      // Use provided radius or default to 5km, convert to meters
      const radiusInKm = radius ? parseFloat(radius as string) : 5;
      const radiusInMeters = radiusInKm * 1000;

      console.log(`Applying location filter: lat=${lat}, lng=${lng}, radius=${radiusInMeters}m (${radiusInKm}km)`);

      whereConditions.push(
        Prisma.sql`ST_DWithin(
          l.coordinates::geometry,
          ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326),
          ${radiusInMeters}
        )`
      );
    } else {
      console.log('No location filter applied - coordinates not provided or invalid');
    }; //end

    // Handle bounds filtering (Airbnb-style map bounds)
    if (boundsNorth && boundsSouth && boundsEast && boundsWest) {
      const north = parseFloat(boundsNorth as string);
      const south = parseFloat(boundsSouth as string);
      const east = parseFloat(boundsEast as string);
      const west = parseFloat(boundsWest as string);

      console.log(`Applying bounds filter: north=${north}, south=${south}, east=${east}, west=${west}`);

      whereConditions.push(
        Prisma.sql`ST_Within(
          l.coordinates::geometry,
          ST_MakeEnvelope(${west}, ${south}, ${east}, ${north}, 4326)
        )`
      );
    } else {
      console.log('No bounds filter applied - bounds not provided');
    }; //end

    // Handle text-based location search (address, city, area names)
    if (req.query.location && req.query.location !== "any") {
      const locationQuery = `%${req.query.location}%`;
      console.log(`Applying location text search: ${locationQuery}`);
      whereConditions.push(
        Prisma.sql`(
          l.address ILIKE ${locationQuery} OR 
          l.city ILIKE ${locationQuery} OR 
          l.state ILIKE ${locationQuery} OR
          l."postalCode" ILIKE ${locationQuery}
        )`
      );
    }

    const completeQuery = Prisma.sql`
      SELECT 
        p.*,
        json_build_object(
          'id', l.id,
          'address', l.address,
          'city', l.city,
          'state', l.state,
          'country', l.country,
          'postalCode', l."postalCode",
          'coordinates', json_build_object(
            'longitude', COALESCE(ST_X(l."coordinates"::geometry), 0),
            'latitude', COALESCE(ST_Y(l."coordinates"::geometry), 0)
          )
        ) as location
      FROM "Property" p
      JOIN "Location" l ON p."locationId" = l.id
      WHERE l."coordinates" IS NOT NULL
      ${
        whereConditions.length > 0
          ? Prisma.sql`AND ${Prisma.join(whereConditions, " AND ")}`
          : Prisma.empty
      }
      ORDER BY p.id DESC
    `;

    const properties = await prisma.$queryRaw(completeQuery);

    // Debug logging
    console.log(`Found ${Array.isArray(properties) ? properties.length : 0} properties`);
    if (Array.isArray(properties)) {
      if (properties.length > 0) {
        console.log('Sample property coordinates:', properties[0]?.location?.coordinates);
        // Log coordinate distribution for debugging
        const coordinateStats = properties.reduce((acc, prop) => {
          const coords = prop.location?.coordinates;
          if (coords?.latitude && coords?.longitude) {
            const lat = Number(coords.latitude);
            const lng = Number(coords.longitude);
            if (!isNaN(lat) && !isNaN(lng) && (lat !== 0 || lng !== 0)) {
              acc.valid++;
            } else {
              acc.invalid++;
            }
          } else {
            acc.missing++;
          }
          return acc;
        }, { valid: 0, invalid: 0, missing: 0 });
        
        console.log('Coordinate statistics:', coordinateStats);
      } else {
        console.log('No properties found matching the filters');
      }
    }

    res.json(properties);

        
}catch (error: any) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const property = await prisma.property.findUnique({
      where: { id: Number(id) },
      include: {
        location: true,
        landlord: true,
      },
    });

    if (property) {
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
      res.json(propertyWithCoordinates);
    }
  } catch (err: any) {
    res
      .status(500)
      .json({ message: `Error retrieving property: ${err.message}` });
  }
};


//create new property

export const createProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];
    console.log("[createProperty] Incoming multipart:", {
      hasFiles: Array.isArray(files) ? files.length : 0,
    });
    const {
      address,
      city,
      state,
      country,
      postalCode,
      latitude: providedLatitude,
      longitude: providedLongitude,
      landlordCognitoId,
      ...propertyData
    } = req.body;

    // Check if landlord is verified
    const landlord = await prisma.landlord.findUnique({
      where: { cognitoId: landlordCognitoId },
      select: {
        verifiedAt: true,
        rejectedAt: true,
        nidDocumentUrl: true,
        addressProofUrl: true
      }
    });

    if (!landlord) {
      res.status(404).json({ 
        success: false, 
        message: "Landlord not found" 
      });
      return;
    }

    // Check verification status
    if (!landlord.verifiedAt) {
      if (landlord.rejectedAt) {
        res.status(403).json({
          success: false,
          message: "Your verification was rejected. Please resubmit your documents.",
          requiresVerification: true
        });
        return;
      } else if (landlord.nidDocumentUrl || landlord.addressProofUrl) {
        res.status(403).json({
          success: false,
          message: "Your verification is pending. Please wait for admin approval.",
          requiresVerification: true
        });
        return;
      } else {
        res.status(403).json({
          success: false,
          message: "You must complete identity verification before posting properties.",
          requiresVerification: true
        });
        return;
      }
    }

    const photoUrls = await Promise.all(
      files.map(async (file) => {
        const uploadParams = {
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: `properties/${Date.now()}-${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        const uploadResult = await new Upload({
          client: s3Client,
          params: uploadParams,
        }).done();

        return uploadResult.Location;
      })
    );

    const geocodingUrl = `https://nominatim.openstreetmap.org/search?${new URLSearchParams(
      {
        street: address,
        city,
        country,
        postalcode: postalCode,
        format: "json",
        limit: "1",
      }
    ).toString()}`;
    console.log("[createProperty] Body received:", {
      ...propertyData,
      address,
      city,
      state,
      country,
      postalCode,
      landlordCognitoId,
    });

    let longitude = 0;
    let latitude = 0;
    
    // Check if coordinates are provided from frontend (e.g., from verified landlord address)
    if (providedLatitude && providedLongitude) {
      const lat = parseFloat(providedLatitude);
      const lng = parseFloat(providedLongitude);
      
      if (!isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0) {
        latitude = lat;
        longitude = lng;
        console.log("[createProperty] Using provided coordinates:", { latitude, longitude });
      } else {
        console.warn("[createProperty] Invalid provided coordinates, falling back to geocoding");
      }
    }
    
    // If no valid coordinates provided, try geocoding
    if (latitude === 0 && longitude === 0) {
      try {
        const geocodingResponse = await axios.get(geocodingUrl, {
          headers: {
            "User-Agent": "RealEstateApp (contact: justsomedummyemail@gmail.com)",
          },
          timeout: 5000,
        });
        if (Array.isArray(geocodingResponse.data) && geocodingResponse.data.length > 0) {
          const first = geocodingResponse.data[0];
          if (first?.lon && first?.lat) {
            longitude = parseFloat(first.lon);
            latitude = parseFloat(first.lat);
            console.log("[createProperty] Using geocoded coordinates:", { latitude, longitude });
          }
        }
      } catch (geoErr: any) {
        console.warn("[createProperty] Geocoding failed, proceeding with [0,0] ::", geoErr?.message);
      }
    }

    // Note: If geocoding fails, we proceed with [0,0] so creation isn't blocked.
    // The frontend map ignores coordinates at [0,0]. Consider improving address validation client-side.

    // create location
    const [location] = await prisma.$queryRaw<Location[]>`
      INSERT INTO "Location" (address, city, state, country, "postalCode", coordinates)
      VALUES (${address}, ${city}, ${state}, ${country}, ${postalCode}, ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326))
      RETURNING id, address, city, state, country, "postalCode", ST_AsText(coordinates) as coordinates;
    `;

    // create property
    const validGenderPreferences = ["MaleOnly", "FemaleOnly", "Mixed"] as const;
    const normalizedGenderPreference = validGenderPreferences.includes(
      propertyData.genderPreference as any
    )
      ? (propertyData.genderPreference as any)
      : null;

    const newProperty = await prisma.property.create({
      data: {
        ...propertyData,
        photoUrls,
        locationId: location.id,
        landlordCognitoId,
        propertyType: propertyData.propertyType as any,
        amenities:
          typeof propertyData.amenities === "string"
            ? propertyData.amenities.split(",").filter((s: string) => s && s.trim().length > 0)
            : [],
        highlights:
          typeof propertyData.highlights === "string"
            ? propertyData.highlights.split(",").filter((s: string) => s && s.trim().length > 0)
            : [],
        isPetsAllowed: propertyData.isPetsAllowed === "true",
        isParkingIncluded: propertyData.isParkingIncluded === "true",
        isBachelorFriendly: propertyData.isBachelorFriendly === "true",
        genderPreference: normalizedGenderPreference,
        pricePerMonth: parseFloat(propertyData.pricePerMonth),
        securityDeposit: parseFloat(propertyData.securityDeposit),
        beds: parseInt(propertyData.beds),
        baths: parseFloat(propertyData.baths),
        squareFeet: parseInt(propertyData.squareFeet),
      },
      include: {
        location: true,
        landlord: true,
      },
    });

    res.status(201).json(newProperty);
  } catch (err: any) {
    console.error("[createProperty] Error:", err?.message, err?.stack);
    try {
      console.error("[createProperty] Request body snapshot:", req.body);
    } catch {}
    res.status(500).json({ message: `Error creating property: ${err?.message || "Unknown error"}` });
  }
};

// Delete property
export const deleteProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const propertyId = parseInt(id);

    if (!propertyId) {
      res.status(400).json({ message: "Property ID is required" });
      return;
    }

    // Check if property exists
    const existingProperty = await prisma.property.findUnique({
      where: { id: propertyId },
      include: {
        leases: true,
        applications: true
      }
    });

    if (!existingProperty) {
      res.status(404).json({ message: "Property not found" });
      return;
    }

    
    await prisma.$transaction(async (prisma) => {
      // Delete all payments related to leases for this property
      const leaseIds = existingProperty.leases.map((lease: any) => lease.id);
      if (leaseIds.length > 0) {
        await prisma.payment.deleteMany({
          where: { leaseId: { in: leaseIds } }
        });
      }

      // Delete all reviews related to leases for this property
      if (leaseIds.length > 0) {
        await prisma.review.deleteMany({
          where: { leaseId: { in: leaseIds } }
        });
      }

      // Delete all leases
      await prisma.lease.deleteMany({
        where: { propertyId }
      });

      // Delete all applications
      await prisma.application.deleteMany({
        where: { propertyId }
      });

      // Clear favorites (disconnect the many-to-many relationship)
      await prisma.property.update({
        where: { id: propertyId },
        data: {
          favoritedBy: {
            set: [] // Clear all favorite relationships
          }
        }
      });

      // Finally delete the property
      await prisma.property.delete({
        where: { id: propertyId }
      });
    });

    console.log(`Property ${propertyId} and all related data deleted successfully`);
    res.json({ 
      message: "Property deleted successfully",
      success: true 
    });

  } catch (error: any) {
    console.error("Error deleting property:", error);
    res.status(500).json({ 
      message: "Failed to delete property. Please try again.",
      success: false 
    });
  }
};
