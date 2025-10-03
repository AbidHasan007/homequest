import { Mail, MapPin, PhoneCall, Calendar, Clock, Eye, X, User, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React, { useState } from "react";

const ApplicationCard = ({
  application,
  userType,
  children,
  onScheduleTour,
  onViewTour,
  onDeny,
}: ApplicationCardProps) => {
  const [imgSrc, setImgSrc] = useState(
    application.property.photoUrls?.[0] || "/placeholder.jpg"
  );

  const statusColor =
    application.status === "Approved"
      ? "bg-green-500"
      : application.status === "Denied"
      ? "bg-red-500"
      : "bg-yellow-500";

  const contactPerson =
    userType === "landlord" ? application.tenant : application.landlord;

  return (
    <div className="overflow-hidden">
      <div className="flex flex-col xl:flex-row items-start justify-between p-6 gap-6">
        {/* Property Info Section */}
        <div className="flex flex-col lg:flex-row gap-6 flex-1">
          <div className="relative group">
            <Image
              src={imgSrc}
              alt={application.property.name}
              width={240}
              height={180}
              className="rounded-lg object-cover w-full lg:w-[240px] h-[180px] shadow-sm transition-transform group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 240px"
              onError={() => setImgSrc("/placeholder.jpg")}
            />
            <div className="absolute top-3 left-3">
              <Badge className="bg-white/90 text-gray-700 hover:bg-white/95">
                <Building2 className="w-3 h-3 mr-1" />
                Property
              </Badge>
            </div>
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {application.property.name}
              </h2>
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm">
                  {`${application.property.location.city}, ${application.property.location.country}`}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  ৳{application.property.pricePerMonth?.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 font-medium">/ month</span>
              </div>
            </div>

            {/* Property Features */}
            <div className="flex flex-wrap gap-2">
              {application.property.bedrooms && (
                <Badge variant="secondary" className="text-xs">
                  {application.property.bedrooms} Beds
                </Badge>
              )}
              {application.property.bathrooms && (
                <Badge variant="secondary" className="text-xs">
                  {application.property.bathrooms} Baths
                </Badge>
              )}
              {application.property.propertyType && (
                <Badge variant="secondary" className="text-xs">
                  {application.property.propertyType}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Status & Tour Information Section */}
        <div className="bg-gray-50 rounded-lg p-4 min-w-[280px]">
          <div className="space-y-4">
            {/* Status */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Application Status
              </h3>
              <Badge 
                className={`${statusColor} text-white border-0 font-medium`}
              >
                {application.status.replace("_", " ")}
              </Badge>
            </div>

            {/* Tour Information */}
            {application.tour && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Tour Details
                </h3>
                <div className="space-y-2">
                  <Badge 
                    className={`text-xs border-0 ${
                      application.tour.status === 'SCHEDULED' ? 'bg-blue-100 text-blue-800' :
                      application.tour.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                      application.tour.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {application.tour.status}
                  </Badge>
                  {application.tour.scheduledDate && (
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-2" />
                        {new Date(application.tour.scheduledDate).toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-2" />
                        {new Date(application.tour.scheduledDate).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Lease Information */}
            {application.lease && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Lease Details
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>Start: {new Date(application.lease.startDate).toLocaleDateString()}</div>
                  {application.lease.endDate && (
                    <div>End: {new Date(application.lease.endDate).toLocaleDateString()}</div>
                  )}
                  {application.lease.nextPaymentDate && (
                    <div>Next Payment: {new Date(application.lease.nextPaymentDate).toLocaleDateString()}</div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="space-y-2">
              {application.tour && (
                <Button
                  onClick={onViewTour}
                  size="sm"
                  variant="outline"
                  className="w-full text-xs"
                >
                  <Eye className="w-3 h-3 mr-2" />
                  View Tour Details
                </Button>
              )}
              
              {(application.status === "Pending" && userType === "landlord" && (!application.tour || application.tour?.status === "CANCELLED")) && (
                <Button
                  onClick={onScheduleTour}
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-xs"
                >
                  <Calendar className="w-3 h-3 mr-2" />
                  {application.tour?.status === "CANCELLED" ? "Reschedule Tour" : "Schedule Tour"}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Contact Person Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 min-w-[280px]">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center">
              <User className="w-4 h-4 mr-2" />
              {userType === "landlord" ? "Tenant Information" : "Landlord Information"}
            </h3>
            
            <div className="flex items-start gap-3">
              <Image
                src="/landing-i1.png"
                alt={contactPerson.name}
                width={48}
                height={48}
                className="rounded-full border-2 border-gray-100"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate">
                  {contactPerson.name}
                </h4>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <PhoneCall className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{contactPerson.phoneNumber}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{contactPerson.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {children}
    </div>
  );
};

export default ApplicationCard;