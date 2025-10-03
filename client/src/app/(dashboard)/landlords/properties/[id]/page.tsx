"use client";

import Loading from "@/components/Loading";
import {
  useGetPropertyLeasesQuery,
  useGetPropertyQuery,
} from "@/state/api";
import { 
  ArrowLeft, 
  Download, 
  Edit3, 
  MapPin, 
  DollarSign,
  Users,
  Calendar,
  Home,
  Bath,
  Bed,
  Square,
  Star,
  Phone,
  Mail,
  FileText,
  AlertCircle,
  MoreVertical,
  Share2,
  Settings,
  Eye
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const PropertyDetails = () => {
  const { id } = useParams();
  const propertyId = Number(id);
  const [activeTab, setActiveTab] = useState("overview");

  const { data: property, isLoading: propertyLoading } =
    useGetPropertyQuery(propertyId);
  const { data: leases, isLoading: leasesLoading } =
    useGetPropertyLeasesQuery(propertyId);

  if (propertyLoading || leasesLoading) return <Loading />;

  const activeLeases = leases?.filter(lease => new Date(lease.endDate) > new Date()) || [];
  const totalRentIncome = activeLeases.reduce((sum, lease) => sum + lease.rent, 0);
  const occupancyRate = property ? (activeLeases.length / 1) * 100 : 0; // Assuming 1 unit per property

  return (
    <div className="dashboard-container">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/landlords/properties"
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to Properties</span>
        </Link>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Property
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="w-4 h-4 mr-2" />
                View Public Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Property Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <AlertCircle className="w-4 h-4 mr-2" />
                Delete Property
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Property Header */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Property Image */}
            <div className="lg:w-1/3">
              <div className="aspect-[4/3] relative rounded-xl overflow-hidden">
                <Image
                  src={property?.photoUrls?.[0] || "/placeholder.jpg"}
                  alt={property?.name || "Property"}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Property Info */}
            <div className="lg:w-2/3 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {property?.name}
                </h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{property?.location?.address}, {property?.location?.city}</span>
                </div>
                
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center">
                    <Bed className="w-5 h-5 mr-2 text-gray-400" />
                    <span className="font-medium">{property?.beds} Bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-5 h-5 mr-2 text-gray-400" />
                    <span className="font-medium">{property?.baths} Bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="w-5 h-5 mr-2 text-gray-400" />
                    <span className="font-medium">{property?.squareFeet} sq ft</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-400" />
                    <span className="font-medium">{property?.averageRating.toFixed(1)} ({property?.numberOfReviews} reviews)</span>
                  </div>
                </div>

                <div className="text-3xl font-bold text-gray-900">
                  BDT {property?.pricePerMonth.toLocaleString()}
                  <span className="text-lg font-normal text-gray-500 ml-2">/month</span>
                </div>
              </div>

              {/* Property Features */}
              <div className="flex flex-wrap gap-2">
                {property?.isPetsAllowed && (
                  <Badge variant="secondary">Pet Friendly</Badge>
                )}
                {property?.isParkingIncluded && (
                  <Badge variant="secondary">Parking Included</Badge>
                )}
                {property?.isBachelorFriendly && (
                  <Badge variant="secondary">Bachelor Friendly</Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Income</p>
                <p className="text-2xl font-bold text-gray-900">BDT {totalRentIncome.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                <p className="text-2xl font-bold text-gray-900">{occupancyRate.toFixed(0)}%</p>
                <div className="mt-2 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-blue-600 rounded-full transition-all duration-300" 
                    style={{ width: `${occupancyRate}%` }}
                  />
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Tenants</p>
                <p className="text-2xl font-bold text-gray-900">{activeLeases.length}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900">
                  {property?.numberOfReviews || 0}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tenants">Tenants</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Property Description */}
            <Card>
              <CardHeader>
                <CardTitle>Property Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {property?.description || "No description available for this property."}
                </p>
              </CardContent>
            </Card>

            {/* Property Features */}
            <Card>
              <CardHeader>
                <CardTitle>Property Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${property?.isPetsAllowed ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm text-gray-700">Pets {property?.isPetsAllowed ? 'Allowed' : 'Not Allowed'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${property?.isParkingIncluded ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm text-gray-700">Parking {property?.isParkingIncluded ? 'Included' : 'Not Included'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${property?.isBachelorFriendly ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm text-gray-700">Bachelor {property?.isBachelorFriendly ? 'Friendly' : 'Not Allowed'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${property?.isFemaleOnly ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                    <span className="text-sm text-gray-700">{property?.isFemaleOnly ? 'Female Only' : 'Mixed Gender'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tenants">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Current Tenants</CardTitle>
                <CardDescription>
                  Manage and view all tenants for this property
                </CardDescription>
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </CardHeader>
            <CardContent>
              {activeLeases.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No active tenants</h3>
                  <p className="text-gray-500">This property is currently vacant.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Lease Period</TableHead>
                      <TableHead>Monthly Rent</TableHead>
                      <TableHead>Lease Status</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeLeases.map((lease) => (
                      <TableRow key={lease.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-600">
                                {lease.tenant.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{lease.tenant.name}</div>
                              <div className="text-sm text-gray-500">{lease.tenant.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{new Date(lease.startDate).toLocaleDateString()}</div>
                            <div className="text-gray-500">to {new Date(lease.endDate).toLocaleDateString()}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">BDT {lease.rent.toLocaleString()}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={new Date(lease.endDate) > new Date() ? "default" : "secondary"}>
                            {new Date(lease.endDate) > new Date() ? "Active" : "Expired"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Phone className="w-3 h-3 mr-2 text-gray-400" />
                              {lease.tenant.phoneNumber}
                            </div>
                            <div className="flex items-center text-sm">
                              <Mail className="w-3 h-3 mr-2 text-gray-400" />
                              {lease.tenant.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <FileText className="w-4 h-4 mr-2" />
                                View Lease Agreement
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                Download Agreement
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Mail className="w-4 h-4 mr-2" />
                                Send Message
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>



        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Requests</CardTitle>
              <CardDescription>
                Track and manage property maintenance issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No maintenance requests</h3>
                <p className="text-gray-500">All maintenance requests will be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertyDetails;