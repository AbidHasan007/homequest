"use client";

import ApplicationCard from "@/components/ApplicationCard";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import TourManagementModal from "@/components/TourManagementModal";
import { useGetApplicationsQuery, useGetAuthUserQuery } from "@/state/api";
import { 
  CircleCheckBig, 
  Clock, 
  Download, 
  XCircle, 
  Calendar, 
  CheckCircle2,
  Filter,
  Search,
  FileText,
  MapPin,
  Eye,
  AlertTriangle,
  Zap,
  RefreshCw,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Home,
  Building,
  TrendingUp,
  Activity,
  Plus
} from "lucide-react";
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Applications = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isTourManagementModalOpen, setIsTourManagementModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "status" | "property">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
  const {
    data: applications,
    isLoading,
    isError,
    refetch,
  } = useGetApplicationsQuery({
    userId: authUser?.cognitoInfo?.userId,
    userType: "tenant",
  }, {
    skip: !authUser?.cognitoInfo?.userId
  });

  // Calculate application statistics
  const applicationStats = useMemo(() => {
    if (!applications || !Array.isArray(applications)) {
      return { total: 0, pending: 0, approved: 0, denied: 0, tourScheduled: 0 };
    }
    
    try {
      return {
        total: applications.length,
        pending: applications.filter((app: any) => app && app.status === 'Pending').length,
        approved: applications.filter((app: any) => app && app.status === 'Approved').length,
        denied: applications.filter((app: any) => app && app.status === 'Denied').length,
        tourScheduled: applications.filter((app: any) => app && app.status === 'Tour_Scheduled').length,
      };
    } catch (error) {
      console.error('Error calculating application stats:', error);
      return { total: 0, pending: 0, approved: 0, denied: 0, tourScheduled: 0 };
    }
  }, [applications]);

  // Filter and sort applications
  const filteredAndSortedApplications = useMemo(() => {
    if (!applications || !Array.isArray(applications)) return [];
    
    try {
      let filtered = [...applications]; // Create a copy to avoid mutating original array
      
      // Filter by tab
      if (activeTab !== "all") {
        filtered = filtered.filter((app: any) => {
          if (!app || !app.status) return false;
          
          switch (activeTab) {
            case "pending":
              return app.status === "Pending";
            case "scheduled":
              return app.status === "Tour_Scheduled";
            case "completed":
              return app.status === "Tour_Completed";
            case "approved":
              return app.status === "Approved";
            case "denied":
              return app.status === "Denied";
            default:
              return true;
          }
        });
      }
      
      // Filter by search term
      if (searchTerm && searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter((app: any) => {
          if (!app) return false;
          
          const propertyName = app.property?.name || '';
          const propertyAddress = app.property?.location?.address || '';
          
          return propertyName.toLowerCase().includes(searchLower) ||
                 propertyAddress.toLowerCase().includes(searchLower);
        });
      }
      
      // Sort applications
      filtered.sort((a: any, b: any) => {
        if (!a || !b) return 0;
        
        let comparison = 0;
        
        try {
          switch (sortBy) {
            case "date":
              const dateA = a.applicationDate ? new Date(a.applicationDate).getTime() : 0;
              const dateB = b.applicationDate ? new Date(b.applicationDate).getTime() : 0;
              comparison = dateA - dateB;
              break;
            case "status":
              const statusA = a.status || '';
              const statusB = b.status || '';
              comparison = statusA.localeCompare(statusB);
              break;
            case "property":
              const propertyA = a.property?.name || '';
              const propertyB = b.property?.name || '';
              comparison = propertyA.localeCompare(propertyB);
              break;
            default:
              comparison = 0;
          }
        } catch (error) {
          console.warn('Error in sorting applications:', error);
          comparison = 0;
        }
        
        return sortOrder === "asc" ? comparison : -comparison;
      });
      
      return filtered;
    } catch (error) {
      console.error('Error in filteredAndSortedApplications:', error);
      return [];
    }
  }, [applications, activeTab, searchTerm, sortBy, sortOrder]);

  const handleViewTour = (application: any) => {
    setSelectedApplication(application);
    setIsTourManagementModalOpen(true);
  };

  const getStatusColor = (status: string | undefined) => {
    if (!status) return "bg-gray-100 text-gray-700 border-gray-200";
    
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Tour_Scheduled":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Tour_Completed":
        return "bg-teal-100 text-teal-700 border-teal-200";
      case "Denied":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string | undefined) => {
    if (!status) return <FileText size={16} />;
    
    switch (status) {
      case "Approved":
        return <CircleCheckBig size={16} />;
      case "Pending":
        return <Clock size={16} />;
      case "Tour_Scheduled":
        return <Calendar size={16} />;
      case "Tour_Completed":
        return <CheckCircle2 size={16} />;
      case "Denied":
        return <XCircle size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  if (isLoading || !authUser) return <Loading />;
  
  if (isError || !applications) {
    return (
      <div className="dashboard-container">
        <div className="text-center py-12">
          <AlertTriangle size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Failed to Load Applications</h2>
          <p className="text-gray-600 mb-4">There was an error fetching your applications.</p>
          <Button onClick={() => refetch()} className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw size={16} className="mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">My Applications</h1>
            <p className="text-gray-600">Track and manage your property rental applications</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => refetch()}
              variant="outline" 
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <RefreshCw size={16} className="mr-2" />
              Refresh
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" />
              New Application
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{applicationStats.total}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-yellow-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{applicationStats.pending}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-blue-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{applicationStats.tourScheduled}</p>
                <p className="text-sm text-gray-600">Scheduled</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-green-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CircleCheckBig size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{applicationStats.approved}</p>
                <p className="text-sm text-gray-600">Approved</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-red-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle size={20} className="text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{applicationStats.denied}</p>
                <p className="text-sm text-gray-600">Denied</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by property name or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Sort Controls */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="date">Sort by Date</option>
                <option value="status">Sort by Status</option>
                <option value="property">Sort by Property</option>
              </select>
              
              <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
              >
                {sortOrder === "asc" ? <SortAsc size={16} /> : <SortDesc size={16} />}
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Applications Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-white border border-gray-200">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Activity size={16} />
            All ({applicationStats.total})
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock size={16} />
            Pending ({applicationStats.pending})
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="flex items-center gap-2">
            <Calendar size={16} />
            Scheduled ({applicationStats.tourScheduled})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle2 size={16} />
            Completed
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center gap-2">
            <CircleCheckBig size={16} />
            Approved ({applicationStats.approved})
          </TabsTrigger>
          <TabsTrigger value="denied" className="flex items-center gap-2">
            <XCircle size={16} />
            Denied ({applicationStats.denied})
          </TabsTrigger>
        </TabsList>

        {/* Applications Grid/List */}
        <TabsContent value={activeTab} className="space-y-6">
          {filteredAndSortedApplications.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {searchTerm ? 'No applications found' : 'No applications yet'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm 
                  ? 'Try adjusting your search criteria.' 
                  : 'Start by browsing properties and submitting applications.'
                }
              </p>
              {!searchTerm && (
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus size={16} className="mr-2" />
                  Browse Properties
                </Button>
              )}
            </div>
          ) : (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {filteredAndSortedApplications.map((application: any) => {
                if (!application || !application.id) return null;
                
                return (
                  <div
                    key={application.id}
                    className={`bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 ${
                      viewMode === "list" ? "p-6" : "overflow-hidden"
                    }`}
                  >
                  {viewMode === "grid" ? (
                    // Grid View - Card Layout
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 mb-1">
                            {application.property?.name || 'Property Name'}
                          </h3>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin size={14} />
                            {application.property?.location?.address || 'Address not available'}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(application.status)}`}>
                          {getStatusIcon(application.status)}
                        </span>
                      </div>

                        <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Applied on:</span>
                          <span className="font-medium">
                            {application.applicationDate 
                              ? new Date(application.applicationDate).toLocaleDateString()
                              : 'Date not available'
                            }
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Monthly Rent:</span>
                          <span className="font-medium text-blue-600">
                            ৳{application.property?.pricePerMonth || 'N/A'}
                          </span>
                        </div>
                      </div>                      {/* Status Message */}
                      <div className={`p-3 rounded-lg border text-sm mb-4 ${getStatusColor(application.status)}`}>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(application.status)}
                          <span className="font-medium">
                            {application.status === "Approved" && "Application Approved!"} 
                            {application.status === "Pending" && "Application Pending"}
                            {application.status === "Tour_Scheduled" && "Tour Scheduled"}
                            {application.status === "Tour_Completed" && "Tour Completed"}
                            {application.status === "Denied" && "Application Denied"}
                          </span>
                        </div>
                        {application.status === "Tour_Scheduled" && application.tour?.scheduledDate && (
                          <p className="mt-1">
                            Tour on {new Date(application.tour.scheduledDate).toLocaleString()}
                          </p>
                        )}
                        {application.status === "Approved" && application.lease && application.lease.startDate && application.lease.endDate && (
                          <p className="mt-1">
                            Lease: {new Date(application.lease.startDate).toLocaleDateString()} - {new Date(application.lease.endDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleViewTour(application)}
                        >
                          <Eye size={14} className="mr-2" />
                          View Details
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          <Download size={14} className="mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // List View - Row Layout
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStatusColor(application.status)}`}>
                          {getStatusIcon(application.status)}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">
                            {application.property?.name || 'Property Name'}
                          </h3>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin size={14} />
                            {application.property?.location?.address || 'Address not available'}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Applied</p>
                          <p className="font-medium">
                            {application.applicationDate 
                              ? new Date(application.applicationDate).toLocaleDateString()
                              : 'N/A'
                            }
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Rent</p>
                          <p className="font-medium text-blue-600">৳{application.property?.pricePerMonth || 'N/A'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewTour(application)}
                        >
                          <Eye size={14} className="mr-2" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          <Download size={14} />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Tour Management Modal */}
      {selectedApplication && (
        <TourManagementModal
          isOpen={isTourManagementModalOpen}
          onClose={() => {
            setIsTourManagementModalOpen(false);
            setSelectedApplication(null);
          }}
          applicationId={selectedApplication.id.toString()}
          userRole="tenant"
        />
      )}
    </div>
  );
};

export default Applications;