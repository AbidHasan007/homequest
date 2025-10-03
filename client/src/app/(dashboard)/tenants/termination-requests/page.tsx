"use client";

import React from "react";
import { useGetTenantTerminationRequestsQuery } from "@/state/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, AlertCircle, MapPin, Calendar, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Loading from "@/components/Loading";

const TenantTerminationRequestsPage = () => {
  const { data: terminationRequests = [], isLoading, error, refetch } = useGetTenantTerminationRequestsQuery();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "APPROVED":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case "DENIED":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Denied
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <AlertCircle className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        );
    }
  };

  const getStatusDescription = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Your termination request is being reviewed by the landlord.";
      case "APPROVED":
        return "Your termination request has been approved. Please coordinate with your landlord for move-out details.";
      case "DENIED":
        return "Your termination request has been denied. Please contact your landlord for more information.";
      default:
        return "Status unknown.";
    }
  };

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="p-8">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Requests</h2>
          <p className="text-gray-600 mb-4">Failed to load your termination requests</p>
          <button 
            onClick={() => refetch()}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Termination Requests</h1>
        <p className="text-gray-600 mt-2">
          View the status of your lease termination requests
        </p>
      </div>

      {terminationRequests.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <MessageSquare className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Termination Requests
            </h3>
            <p className="text-gray-600">
              You haven&apos;t submitted any lease termination requests yet.
              You can submit a request from your residence details page.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {terminationRequests.map((request: any) => (
            <Card key={request.id} className="border-l-4 border-l-teal-500">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      {request.lease.property.name}
                      {getStatusBadge(request.status)}
                    </CardTitle>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {request.lease.property.location?.address || "Address not available"}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Submitted {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Status</h4>
                  <p className="text-sm text-gray-700">
                    {getStatusDescription(request.status)}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Landlord Information</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Name: {request.lease.property.landlord.name}</p>
                      <p>Email: {request.lease.property.landlord.email}</p>
                      <p>Phone: {request.lease.property.landlord.phoneNumber}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Lease Details</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Start: {new Date(request.lease.startDate).toLocaleDateString()}</p>
                      <p>End: {new Date(request.lease.endDate).toLocaleDateString()}</p>
                      <p>Monthly Rent: ${request.lease.rentAmount}</p>
                    </div>
                  </div>
                </div>

                {request.reason && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Your Reason</h4>
                    <p className="text-sm text-gray-700 bg-teal-50 p-3 rounded-lg">
                      {request.reason}
                    </p>
                  </div>
                )}

                {request.landlordNotes && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Landlord Response</h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {request.landlordNotes}
                    </p>
                  </div>
                )}

                {request.processedDate && (
                  <div className="text-sm text-gray-600">
                    <strong>Processed:</strong> {new Date(request.processedDate).toLocaleDateString()}
                  </div>
                )}

                <div className="pt-2 border-t">
                  <div className="text-xs text-gray-500">
                    Request ID: #{request.id}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TenantTerminationRequestsPage;