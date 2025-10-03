import { LucideIcon } from "lucide-react";
import { AuthUser } from "aws-amplify/auth";
import { Landlord, Tenant, Property, Application } from "./prismaTypes";
import { MotionProps as OriginalMotionProps } from "framer-motion";

declare module "framer-motion" {
  interface MotionProps extends OriginalMotionProps {
    className?: string;
  }
}

declare global {
  enum AmenityEnum {
    WasherDryer = "WasherDryer",
    AirConditioning = "AirConditioning",
    Dishwasher = "Dishwasher",
    HighSpeedInternet = "HighSpeedInternet",
    HardwoodFloors = "HardwoodFloors",
    WalkInClosets = "WalkInClosets",
    Microwave = "Microwave",
    Refrigerator = "Refrigerator",
    Pool = "Pool",
    Gym = "Gym",
    Parking = "Parking",
    PetsAllowed = "PetsAllowed",
    WiFi = "WiFi",
  }

  enum HighlightEnum {
    HighSpeedInternetAccess = "HighSpeedInternetAccess",
    WasherDryer = "WasherDryer",
    AirConditioning = "AirConditioning",
    Heating = "Heating",
    SmokeFree = "SmokeFree",
    CableReady = "CableReady",
    SatelliteTV = "SatelliteTV",
    DoubleVanities = "DoubleVanities",
    TubShower = "TubShower",
    Intercom = "Intercom",
    SprinklerSystem = "SprinklerSystem",
    RecentlyRenovated = "RecentlyRenovated",
    CloseToTransit = "CloseToTransit",
    GreatView = "GreatView",
    QuietNeighborhood = "QuietNeighborhood",
  }

  enum PropertyTypeEnum {
    Rooms = "Rooms",
    Apartment = "Apartment",
    Mess = "Mess",
    Sublet = "Sublet",
    
  }

  interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
  }

  interface PropertyOverviewProps {
    propertyId: number;
  }

  interface ApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    propertyId: number;
  }

  interface ContactWidgetProps {
    onOpenModal: () => void;
  }

  interface ImagePreviewsProps {
    images: string[];
  }

  interface PropertyDetailsProps {
    propertyId: number;
  }

  interface PropertyOverviewProps {
    propertyId: number;
  }

  interface PropertyLocationProps {
    propertyId: number;
  }

  // Type for current residences with embedded lease information
  interface CurrentResidence {
    // Property fields (from ...lease.property spread)
    id: number;
    name: string;
    title?: string;
    description: string;
    pricePerMonth: number;
    securityDeposit: number;
    photoUrls: string[];
    images?: string[];
    amenities: string[];
    highlights: string[];
    isPetsAllowed: boolean;
    isParkingIncluded: boolean;
    isBachelorFriendly: boolean;
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    location: {
      id: number;
      address: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
      latitude?: number;
      longitude?: number;
    };
    landlord: {
      cognitoId: string;
      name: string;
      email: string;
      phoneNumber: string;
    };
    // Embedded lease information
    lease: {
      id: string;
      rent: number;
      startDate: string;
      deposit: number;
      status: 'active' | 'upcoming' | 'pending';
      daysLived?: number;
      daysUntilStart?: number;
    } | null;
  }

  interface ApplicationCardProps {
    application: Application;
    userType: "landlord" | "renter";
    children: React.ReactNode;
    onScheduleTour?: () => void;
    onViewTour?: () => void;
    onDeny?: () => void;
  }

  interface CardProps {
    property: Property;
    isFavorite: boolean;
    onFavoriteToggle: () => void;
    showFavoriteButton?: boolean;
    propertyLink?: string;
  }

  interface CardCompactProps {
    property: Property;
    isFavorite: boolean;
    onFavoriteToggle: () => void;
    showFavoriteButton?: boolean;
    propertyLink?: string;
  }

  interface HeaderProps {
    title: string;
    subtitle: string;
  }

  interface NavbarProps {
    isDashboard: boolean;
  }

  interface AppSidebarProps {
    userType: "landlord" | "tenant" | "admin";
  }

  interface SettingsFormProps {
    initialData: SettingsFormData;
    onSubmit: (data: SettingsFormData) => Promise<void>;
    userType: "landlord" | "tenant" | "admin";
  }

  interface User {
    cognitoInfo: AuthUser;
    userInfo: Tenant | Landlord | Admin;
    userRole: string;
  }
}

export {};
