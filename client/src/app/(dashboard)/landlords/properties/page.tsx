"use client";

import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { useGetAuthUserQuery, useGetLandlordPropertiesQuery, useDeletePropertyMutation } from "@/state/api";
import { 
  Building2, 
  Plus, 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  MapPin,
  DollarSign,
  Home,
  Eye,
  Edit,
  Trash2,
  Bath,
  Bed,
  Square,
  Users,
  Star
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const Properties = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleteDialog, setDeleteDialog] = useState<{open: boolean, property: any | null}>({
    open: false,
    property: null
  });

  const { data: authUser } = useGetAuthUserQuery();
  const {
    data: landlordProperties,
    isLoading,
    error,
    refetch
  } = useGetLandlordPropertiesQuery(authUser?.cognitoInfo?.userId || "", {
    skip: !authUser?.cognitoInfo?.userId,
  });
  const [deleteProperty, { isLoading: isDeleting }] = useDeletePropertyMutation();

  // Filter properties based on search and status
  const filteredProperties = landlordProperties?.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location?.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location?.city?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Add status filtering logic here when status field is available
    const matchesStatus = filterStatus === 'all'; // || property.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  }) || [];

  const handleDeleteProperty = (property: any) => {
    setDeleteDialog({ open: true, property });
  };

  const confirmDelete = async () => {
    if (!deleteDialog.property) return;
    
    try {
      await deleteProperty(deleteDialog.property.id).unwrap();
      setDeleteDialog({ open: false, property: null });
      refetch();
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return (
    <div className="dashboard-container">
      <div className="text-center py-12">
        <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading properties</h3>
        <p className="text-gray-500">Please try again later.</p>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Header with Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Properties</h1>
          <p className="text-gray-600">Manage your property listings and track performance</p>
        </div>
        <div className="mt-4 lg:mt-0 flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Building2 className="w-6 h-6 text-teal-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Properties</p>
                <p className="text-2xl font-bold text-gray-900">{landlordProperties?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Tenants</p>
                <p className="text-2xl font-bold text-gray-900">
                  {landlordProperties?.reduce((acc, prop) => acc + (prop.leases?.filter((l: any) => new Date(l.endDate) > new Date()).length || 0), 0) || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Monthly Income</p>
                <p className="text-2xl font-bold text-gray-900">
                  BDT {landlordProperties?.reduce((acc, prop) => acc + (prop.leases?.filter((l: any) => new Date(l.endDate) > new Date()).reduce((sum: number, lease: any) => sum + lease.rent, 0) || 0), 0).toLocaleString() || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg. Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(landlordProperties?.reduce((acc, prop) => acc + prop.averageRating, 0) / (landlordProperties?.length || 1) || 0).toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search properties by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="vacant">Vacant</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Properties Grid/List */}
      {filteredProperties.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm || filterStatus !== 'all' ? 'No properties found' : 'No properties yet'}
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search criteria to find properties.' 
                : 'Get started by adding your first property listing to attract tenants.'}
            </p>
            {(!searchTerm && filterStatus === 'all') && (
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Property
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
        }>
          {filteredProperties.map((property) => (
            viewMode === 'grid' ? (
              <PropertyCard 
                key={property.id} 
                property={property} 
                onDelete={() => handleDeleteProperty(property)}
              />
            ) : (
              <PropertyListItem 
                key={property.id} 
                property={property} 
                onDelete={() => handleDeleteProperty(property)}
              />
            )
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({...deleteDialog, open})}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Property</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &ldquo;{deleteDialog.property?.name}&rdquo;? This action cannot be undone.
              All associated leases, applications, and reviews will also be removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog({open: false, property: null})} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete Property'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Property Card Component for Grid View
const PropertyCard = ({ property, onDelete }: { property: any, onDelete: () => void }) => {
  const [imgSrc, setImgSrc] = useState(property.photoUrls?.[0] || "/placeholder.jpg");
  const activeLeases = property.leases?.filter((lease: any) => new Date(lease.endDate) > new Date()).length || 0;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden">
      <div className="relative">
        {/* Property Image */}
        <div className="aspect-[4/3] relative overflow-hidden">
          <Link href={`/landlords/properties/${property.id}`}>
            <Image
              src={imgSrc}
              alt={property.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
              onError={() => setImgSrc("/placeholder.jpg")}
            />
          </Link>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <Badge 
              variant={activeLeases > 0 ? "default" : "secondary"} 
              className={`${
                activeLeases > 0 
                  ? "bg-teal-600 hover:bg-teal-700 text-white shadow-lg" 
                  : "bg-gray-100 text-gray-700 shadow-lg"
              } font-medium px-3 py-1`}
            >
              {activeLeases > 0 ? `${activeLeases} Active Tenant${activeLeases > 1 ? 's' : ''}` : 'Vacant'}
            </Badge>
          </div>

          {/* Property Features Badges */}
          <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
            {property.isPetsAllowed && (
              <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                Pet Friendly
              </span>
            )}
            {property.isParkingIncluded && (
              <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                Parking
              </span>
            )}
            {property.isBachelorFriendly && (
              <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                Bachelor OK
              </span>
            )}
          </div>
        </div>

        {/* Card Content */}
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Property Info */}
            <div>
              <Link href={`/landlords/properties/${property.id}`}>
                <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2 hover:text-teal-600 transition-colors cursor-pointer leading-tight">
                  {property.name}
                </h3>
              </Link>
              
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <span className="line-clamp-1">
                  {property.location?.address}, {property.location?.city}
                </span>
              </div>
              
              <div className="text-3xl font-bold text-gray-900 mb-1">
                BDT {property.pricePerMonth.toLocaleString()}
                <span className="text-lg font-normal text-gray-500 ml-2">/month</span>
              </div>
            </div>
            
            {/* Property Details */}
            <div className="flex items-center justify-between py-3 border-t border-gray-100">
              <div className="flex items-center gap-5 text-sm text-gray-600">
                <div className="flex items-center font-medium">
                  <Bed className="w-4 h-4 mr-1.5 text-gray-500" />
                  {property.beds} {property.beds === 1 ? 'Bed' : 'Beds'}
                </div>
                <div className="flex items-center font-medium">
                  <Bath className="w-4 h-4 mr-1.5 text-gray-500" />
                  {property.baths} {property.baths === 1 ? 'Bath' : 'Baths'}
                </div>
                <div className="flex items-center font-medium">
                  <Square className="w-4 h-4 mr-1.5 text-gray-500" />
                  {property.squareFeet} sq ft
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900 flex items-center justify-end">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  {property.averageRating.toFixed(1)}
                </div>
                <div className="text-xs text-gray-500">
                  {property.numberOfReviews} reviews
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Link href={`/landlords/properties/${property.id}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-300 font-medium">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="px-4 border-gray-200 hover:bg-gray-50">
                <Edit className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onDelete}
                className="px-4 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

// Property List Item Component for List View
const PropertyListItem = ({ property, onDelete }: { property: any, onDelete: () => void }) => {
  const [imgSrc, setImgSrc] = useState(property.photoUrls?.[0] || "/placeholder.jpg");
  const activeLeases = property.leases?.filter((lease: any) => new Date(lease.endDate) > new Date()).length || 0;

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-6">
          {/* Property Image */}
          <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <Link href={`/landlords/properties/${property.id}`}>
              <Image
                src={imgSrc}
                alt={property.name}
                fill
                className="object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
                onError={() => setImgSrc("/placeholder.jpg")}
              />
            </Link>
            <div className="absolute top-2 left-2">
              <Badge 
                variant={activeLeases > 0 ? "default" : "secondary"}
                className={`text-xs ${
                  activeLeases > 0 
                    ? "bg-teal-600 hover:bg-teal-700 text-white" 
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {activeLeases > 0 ? `${activeLeases} Active` : 'Vacant'}
              </Badge>
            </div>
          </div>
          
          {/* Property Information */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Link href={`/landlords/properties/${property.id}`}>
                  <h3 className="font-bold text-xl text-gray-900 mb-2 hover:text-teal-600 transition-colors cursor-pointer line-clamp-1">
                    {property.name}
                  </h3>
                </Link>
                
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="line-clamp-1">
                    {property.location?.address}, {property.location?.city}
                  </span>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center font-medium">
                    <Bed className="w-4 h-4 mr-1.5 text-gray-500" />
                    {property.beds} {property.beds === 1 ? 'Bed' : 'Beds'}
                  </div>
                  <div className="flex items-center font-medium">
                    <Bath className="w-4 h-4 mr-1.5 text-gray-500" />
                    {property.baths} {property.baths === 1 ? 'Bath' : 'Baths'}
                  </div>
                  <div className="flex items-center font-medium">
                    <Square className="w-4 h-4 mr-1.5 text-gray-500" />
                    {property.squareFeet} sq ft
                  </div>
                  <div className="flex items-center font-medium">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    {property.averageRating.toFixed(1)} ({property.numberOfReviews} reviews)
                  </div>
                </div>

                {/* Property Features */}
                <div className="flex gap-2 mt-3">
                  {property.isPetsAllowed && (
                    <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                      Pet Friendly
                    </span>
                  )}
                  {property.isParkingIncluded && (
                    <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                      Parking
                    </span>
                  )}
                  {property.isBachelorFriendly && (
                    <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                      Bachelor OK
                    </span>
                  )}
                </div>
              </div>
              
              {/* Price and Actions */}
              <div className="flex items-center gap-6 ml-6">
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    BDT {property.pricePerMonth.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">per month</div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link href={`/landlords/properties/${property.id}`}>
                    <Button variant="outline" size="sm" className="border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-300">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onDelete}
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Properties;