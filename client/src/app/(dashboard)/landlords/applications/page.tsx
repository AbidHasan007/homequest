"use client";

import ApplicationCard from "@/components/ApplicationCard";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import TourSchedulingModal from "@/components/TourSchedulingModal";
import TourManagementModal from "@/components/TourManagementModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetApplicationsQuery,
  useGetAuthUserQuery,
  useUpdateApplicationStatusMutation,
} from "@/state/api";
import { 
  CircleCheckBig, 
  Download, 
  File, 
  Hospital, 
  Calendar, 
  CalendarDays,
  Search,
  Filter,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  MapPin,
  Building2,
  TrendingUp,
  FileText
} from "lucide-react";
import Link from "next/link";
import React, { useState, useMemo } from "react";

const Applications = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isTourScheduleModalOpen, setIsTourScheduleModalOpen] = useState(false);
  const [isTourManagementModalOpen, setIsTourManagementModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [leaseStartDate, setLeaseStartDate] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const {
    data: applications,
    isLoading,
    isError,
  } = useGetApplicationsQuery(
    {
      userId: authUser?.cognitoInfo?.userId,
      userType: "landlord",
    },
    {
      skip: !authUser?.cognitoInfo?.userId,
    }
  );
  const [updateApplicationStatus] = useUpdateApplicationStatusMutation();

  const handleStatusChange = async (id: number, status: string, leaseStartDate?: string) => {
    await updateApplicationStatus({ id, status, leaseStartDate });
  };

  const handleApproveApplication = (application: any) => {
    setSelectedApplication(application);
    // Set default start date to today
    const today = new Date().toISOString().split('T')[0];
    setLeaseStartDate(today);
    setIsApprovalModalOpen(true);
  };

  const confirmApproval = async () => {
    if (selectedApplication && leaseStartDate) {
      await handleStatusChange(selectedApplication.id, "Approved", leaseStartDate);
      setIsApprovalModalOpen(false);
      setSelectedApplication(null);
      setLeaseStartDate("");
    }
  };

  const handleScheduleTour = (application: any) => {
    setSelectedApplication(application);
    setIsTourScheduleModalOpen(true);
  };

  const handleViewTour = (application: any) => {
    setSelectedApplication(application);
    setIsTourManagementModalOpen(true);
  };

  const getStatusText = (application: any) => {
    switch (application.status) {
      case "Pending":
        return "This application is pending review.";
      case "Tour_Scheduled":
        return "Tour has been scheduled for this application.";
      case "Tour_Completed":
        return "Tour has been completed. Ready for approval.";
      case "Approved":
        return "This application has been approved.";
      case "Denied":
        return "This application has been denied.";
      default:
        return "Status unknown.";
    }
  };

  const canApprove = (application: any) => {
    return application.status === "Tour_Completed" || 
           (application.status === "Pending" && (!application.tour || application.tour?.status === "CANCELLED"));
  };

  // Statistics calculations
  const stats = useMemo(() => {
    if (!applications) return { total: 0, pending: 0, approved: 0, denied: 0 };
    
    return {
      total: applications.length,
      pending: applications.filter(app => app.status === "Pending" || app.status === "Tour_Scheduled").length,
      approved: applications.filter(app => app.status === "Approved").length,
      denied: applications.filter(app => app.status === "Denied").length,
    };
  }, [applications]);

  // Filter and search logic
  const filteredApplications = useMemo(() => {
    if (!applications) return [];
    
  const filtered = applications.filter((application) => {
      // Tab filter
      if (activeTab !== "all" && application.status.toLowerCase() !== activeTab) {
        return false;
      }
      
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return (
          application.property.name.toLowerCase().includes(searchLower) ||
          application.tenant.name.toLowerCase().includes(searchLower) ||
          application.property.location.city.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
    
    // Sort logic
  filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime();
        case "oldest":
          return new Date(a.applicationDate).getTime() - new Date(b.applicationDate).getTime();
        case "property":
          return a.property.name.localeCompare(b.property.name);
        case "tenant":
          return a.tenant.name.localeCompare(b.tenant.name);
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [applications, activeTab, searchQuery, sortBy]);

  if (isLoading) return <Loading />;
  if (isError || !applications) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error fetching applications</h3>
        <p className="text-gray-500">Please try refreshing the page</p>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <Header
        title="Applications Management"
        subtitle="Track and manage all tenant applications for your properties"
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">All time applications</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-3xl font-bold text-amber-600 mt-2">{stats.pending}</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-full">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Requires action</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.approved}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Active leases</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Declined</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{stats.denied}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-full">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Rejected applications</span>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by property, tenant, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="property">Property Name</SelectItem>
                <SelectItem value="tenant">Tenant Name</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {filteredApplications.length} {filteredApplications.length === 1 ? 'application' : 'applications'}
            </span>
          </div>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-6 mb-6 bg-gray-50 p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-white">
            All ({stats.total})
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-white">
            Pending ({applications?.filter(app => app.status === "Pending").length || 0})
          </TabsTrigger>
          <TabsTrigger value="tour_scheduled" className="data-[state=active]:bg-white">
            Tours ({applications?.filter(app => app.status === "Tour_Scheduled").length || 0})
          </TabsTrigger>
          <TabsTrigger value="tour_completed" className="data-[state=active]:bg-white">
            Completed ({applications?.filter(app => app.status === "Tour_Completed").length || 0})
          </TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:bg-white">
            Approved ({stats.approved})
          </TabsTrigger>
          <TabsTrigger value="denied" className="data-[state=active]:bg-white">
            Denied ({stats.denied})
          </TabsTrigger>
        </TabsList>
        {["all", "pending", "tour_scheduled", "tour_completed", "approved", "denied"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {filteredApplications.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {searchQuery ? "No applications found" : "No applications yet"}
                </h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  {searchQuery 
                    ? "Try adjusting your search terms or filters" 
                    : "Applications from tenants will appear here once they start applying to your properties."
                  }
                </p>
                {searchQuery && (
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchQuery("")}
                    className="mt-4"
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            ) : (
              filteredApplications.map((application) => (
                <div key={application.id} className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <ApplicationCard
                    application={application}
                    userType="landlord"
                    onScheduleTour={() => handleScheduleTour(application)}
                    onViewTour={() => handleViewTour(application)}
                    onDeny={() => handleStatusChange(application.id, "Denied")}
                  >
                    <div className="px-6 pb-6">
                      {/* Enhanced Status Section */}
                      <div className="mb-6">
                        <div className={`rounded-lg p-4 border-l-4 ${
                          application.status === "Approved"
                            ? "bg-green-50 border-green-400"
                            : application.status === "Denied"
                            ? "bg-red-50 border-red-400"
                            : application.status === "Tour_Scheduled"
                            ? "bg-blue-50 border-blue-400"
                            : application.status === "Tour_Completed"
                            ? "bg-purple-50 border-purple-400"
                            : "bg-amber-50 border-amber-400"
                        }`}>
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-full ${
                                application.status === "Approved" ? "bg-green-100" :
                                application.status === "Denied" ? "bg-red-100" :
                                application.status === "Tour_Scheduled" ? "bg-blue-100" :
                                application.status === "Tour_Completed" ? "bg-purple-100" :
                                "bg-amber-100"
                              }`}>
                                {application.status === "Approved" ? (
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                ) : application.status === "Denied" ? (
                                  <XCircle className="h-5 w-5 text-red-600" />
                                ) : application.status === "Tour_Scheduled" ? (
                                  <Calendar className="h-5 w-5 text-blue-600" />
                                ) : application.status === "Tour_Completed" ? (
                                  <Eye className="h-5 w-5 text-purple-600" />
                                ) : (
                                  <Clock className="h-5 w-5 text-amber-600" />
                                )}
                              </div>
                              
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`font-semibold ${
                                    application.status === "Approved" ? "text-green-800" :
                                    application.status === "Denied" ? "text-red-800" :
                                    application.status === "Tour_Scheduled" ? "text-blue-800" :
                                    application.status === "Tour_Completed" ? "text-purple-800" :
                                    "text-amber-800"
                                  }`}>
                                    {getStatusText(application)}
                                  </span>
                                </div>
                                <p className={`text-sm ${
                                  application.status === "Approved" ? "text-green-600" :
                                  application.status === "Denied" ? "text-red-600" :
                                  application.status === "Tour_Scheduled" ? "text-blue-600" :
                                  application.status === "Tour_Completed" ? "text-purple-600" :
                                  "text-amber-600"
                                }`}>
                                  Application submitted on {new Date(application.applicationDate).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                  })}
                                </p>
                                
                                {application.lease && (
                                  <div className="mt-2 text-sm text-green-600">
                                    <strong>Lease Start:</strong> {new Date(application.lease.startDate).toLocaleDateString()}
                                    {application.lease.nextPaymentDate && (
                                      <span className="ml-4">
                                        <strong>Next Payment:</strong> {new Date(application.lease.nextPaymentDate).toLocaleDateString()}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>

                            <Badge 
                              className={`${
                                application.status === "Approved" ? "bg-green-100 text-green-800" :
                                application.status === "Denied" ? "bg-red-100 text-red-800" :
                                application.status === "Tour_Scheduled" ? "bg-blue-100 text-blue-800" :
                                application.status === "Tour_Completed" ? "bg-purple-100 text-purple-800" :
                                "bg-amber-100 text-amber-800"
                              } border-0`}
                            >
                              {application.status.replace("_", " ")}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3 justify-between items-center">
                        <div className="flex flex-wrap gap-3">
                          <Link
                            href={`/landlords/properties/${application.property.id}`}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
                            scroll={false}
                          >
                            <Building2 className="w-4 h-4 mr-2" />
                            View Property
                          </Link>
                          
                          {application.status === "Approved" && (
                            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                              <Download className="w-4 h-4 mr-2" />
                              Download Agreement
                            </button>
                          )}
                          
                          {application.status === "Denied" && (
                            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                              <Users className="w-4 h-4 mr-2" />
                              Contact Tenant
                            </button>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {application.status === "Pending" && (
                            <>
                              {(!application.tour || application.tour?.status === "CANCELLED") && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleScheduleTour(application)}
                                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                >
                                  <Calendar className="w-4 h-4 mr-2" />
                                  {application.tour?.status === "CANCELLED" ? "Reschedule Tour" : "Schedule Tour"}
                                </Button>
                              )}
                              <Button
                                size="sm"
                                onClick={() => handleApproveApplication(application)}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleStatusChange(application.id, "Denied")}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Decline
                              </Button>
                            </>
                          )}
                          
                          {canApprove(application) && application.status === "Tour_Completed" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleApproveApplication(application)}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve Application
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleStatusChange(application.id, "Denied")}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Decline
                              </Button>
                            </>
                          )}
                          
                          {application.status === "Tour_Scheduled" && (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleStatusChange(application.id, "Denied")}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Decline Application
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </ApplicationCard>
                </div>
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Tour Scheduling Modal */}
      {selectedApplication && (
        <TourSchedulingModal
          isOpen={isTourScheduleModalOpen}
          onClose={() => {
            setIsTourScheduleModalOpen(false);
            setSelectedApplication(null);
          }}
          application={selectedApplication}
        />
      )}

      {/* Tour Management Modal */}
      {selectedApplication && (
        <TourManagementModal
          isOpen={isTourManagementModalOpen}
          onClose={() => {
            setIsTourManagementModalOpen(false);
            setSelectedApplication(null);
          }}
          applicationId={selectedApplication.id.toString()}
          userRole="landlord"
        />
      )}

      {/* Lease Approval Modal */}
      <Dialog open={isApprovalModalOpen} onOpenChange={setIsApprovalModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-green-600" />
              Approve Application
            </DialogTitle>
            <DialogDescription>
              Set the lease start date for {selectedApplication?.name}&rsquo;s application.
              The lease will begin on this date and continue indefinitely until termination.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="leaseStartDate" className="text-sm font-medium">
                Lease Start Date *
              </Label>
              <Input
                id="leaseStartDate"
                type="date"
                value={leaseStartDate}
                onChange={(e) => setLeaseStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]} // Cannot be in the past
                className="w-full"
                required
              />
              <p className="text-xs text-gray-500">
                Select when the tenant can move in and the lease becomes active.
              </p>
            </div>
            
            {selectedApplication && (
              <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                <h4 className="font-medium text-sm">Application Details:</h4>
                <p className="text-sm text-gray-600">
                  <strong>Tenant:</strong> {selectedApplication.name}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Property:</strong> {selectedApplication.property?.name}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Monthly Rent:</strong> ৳{selectedApplication.property?.pricePerMonth?.toLocaleString()}
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsApprovalModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmApproval}
              disabled={!leaseStartDate}
              className="bg-green-600 hover:bg-green-700"
            >
              Approve & Create Lease
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Applications;