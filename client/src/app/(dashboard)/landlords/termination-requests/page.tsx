"use client";

import React, { useState } from "react";
import { useGetLandlordTerminationRequestsQuery, useUpdateTerminationRequestStatusMutation } from "@/state/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, Clock, AlertCircle, MapPin, Calendar } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import Loading from "@/components/Loading";

const TerminationRequestsPage = () => {
  const { data: terminationRequests = [], isLoading, error, refetch } = useGetLandlordTerminationRequestsQuery();
  const [updateTerminationStatus] = useUpdateTerminationRequestStatusMutation();
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
  const [landlordNotes, setLandlordNotes] = useState("");

  const handleUpdateStatus = async (requestId: number, status: "APPROVED" | "DENIED") => {
    try {
      await updateTerminationStatus({
        requestId,
        status,
        landlordNotes: landlordNotes.trim() || undefined
      }).unwrap();
      
      toast.success(`Termination request ${status.toLowerCase()} successfully`);
      setSelectedRequest(null);
      setLandlordNotes("");
      refetch();
    } catch (error) {
      toast.error(`Failed to ${status.toLowerCase()} termination request`);
    }
  };

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

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="p-8">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Requests</h2>
          <p className="text-gray-600 mb-4">Failed to load termination requests</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Termination Requests</h1>
        <p className="text-gray-600 mt-2">
          Manage lease termination requests from your tenants
        </p>
      </div>

      {terminationRequests.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Clock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Termination Requests
            </h3>
            <p className="text-gray-600">
              You don&apos;t have any lease termination requests at the moment.
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
                        Requested {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Tenant Information</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Name: {request.lease.tenant.name}</p>
                      <p>Email: {request.lease.tenant.email}</p>
                      <p>Phone: {request.lease.tenant.phoneNumber}</p>
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
                    <h4 className="font-medium text-gray-900 mb-2">Reason for Termination</h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {request.reason}
                    </p>
                  </div>
                )}

                {request.landlordNotes && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Your Response</h4>
                    <p className="text-sm text-gray-700 bg-teal-50 p-3 rounded-lg">
                      {request.landlordNotes}
                    </p>
                  </div>
                )}

                {request.processedDate && (
                  <div className="text-sm text-gray-600">
                    <strong>Processed:</strong> {new Date(request.processedDate).toLocaleDateString()}
                  </div>
                )}

                {request.status === "PENDING" && (
                  <div className="border-t pt-4">
                    {selectedRequest === request.id ? (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="landlordNotes" className="block text-sm font-medium text-gray-700 mb-2">
                            Add Notes (Optional)
                          </label>
                          <Textarea
                            id="landlordNotes"
                            placeholder="Add any notes or comments about this decision..."
                            value={landlordNotes}
                            onChange={(e) => setLandlordNotes(e.target.value)}
                            className="min-h-[100px]"
                          />
                        </div>
                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleUpdateStatus(request.id, "APPROVED")}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleUpdateStatus(request.id, "DENIED")}
                            variant="destructive"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Deny
                          </Button>
                          <Button
                            onClick={() => {
                              setSelectedRequest(null);
                              setLandlordNotes("");
                            }}
                            variant="outline"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setSelectedRequest(request.id)}
                        className="bg-teal-600 hover:bg-teal-700"
                      >
                        Respond to Request
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TerminationRequestsPage;