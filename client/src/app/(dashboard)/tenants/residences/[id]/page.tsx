"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAuthUserQuery,
  useGetLeasesQuery,
  useGetPaymentsQuery,
  useGetPropertyQuery,
  useCreateTerminationRequestMutation,
} from "@/state/api";
import { 
  ArrowLeft,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  AlertTriangle,
  Camera,
  Bed,
  Bath,
  Square,
  Car,
  Wifi,
  Zap,
  Droplets,
  Shield,
  CheckCircle,
  Download,
  Check,
  CreditCard,
  Edit,
  ArrowDownToLineIcon,
  BanknoteArrowDown
} from "lucide-react";

const ResidenceDetailPage = () => {
  const params = useParams();
  const propertyId = params.id;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // API Queries
  const { data: authUser } = useGetAuthUserQuery();
  const {
    data: property,
    isLoading: propertyLoading,
    error: propertyError,
  } = useGetPropertyQuery(Number(propertyId));

  const { data: leases, isLoading: leasesLoading } = useGetLeasesQuery(
    parseInt(authUser?.cognitoInfo?.userId || "0"),
    { skip: !authUser?.cognitoInfo?.userId }
  );
  
  const currentLease = leases?.find(
    (lease) => lease.propertyId === property?.id
  );

  const { data: payments, isLoading: paymentsLoading } = useGetPaymentsQuery(
    currentLease?.id || 0,
    { skip: !currentLease?.id }
  );

  const [createTerminationRequest] = useCreateTerminationRequestMutation();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateString));
  };

  const daysRemaining = () => {
    if (!currentLease) return 0;
    const endDate = new Date(currentLease.endDate);
    const now = new Date();
    return Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  };

  const isLeaseEndingSoon = () => {
    return daysRemaining() <= 30;
  };

  const handleLeaveRequest = async () => {
    if (!currentLease?.id) {
      console.error("No active lease found");
      return;
    }

    setIsSubmitting(true);
    try {
      await createTerminationRequest({
        leaseId: currentLease.id,
        reason: reason.trim() || undefined
      }).unwrap();
      
      setLeaveModalOpen(false);
      setReason(""); // Clear the reason field
    } catch (error) {
      console.error("Failed to submit termination request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock data for features when property data is available
  const getPropertyFeatures = () => {
    if (!property) return [];
    return [
      "Floor-to-ceiling windows with city views",
      "Modern kitchen with stainless steel appliances",
      "Hardwood floors throughout",
      "Central air conditioning and heating",
      "In-unit washer and dryer",
      "Private balcony",
      "Building gym and rooftop terrace",
      "24/7 concierge service"
    ];
  };

  const getPropertyAmenities = () => {
    return [
      { icon: Bed, label: "2 Bedrooms" },
      { icon: Bath, label: "2 Bathrooms" },
      { icon: Square, label: "1,200 sq ft" },
      { icon: Car, label: "1 Parking Space" },
      { icon: Wifi, label: "High Speed Internet" },
      { icon: Zap, label: "Utilities Included" },
      { icon: Droplets, label: "In-Unit Laundry" },
      { icon: Shield, label: "24/7 Security" }
    ];
  };

  if (propertyLoading || leasesLoading || paymentsLoading) return <Loading />;
  
  if (!property || propertyError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-red-200">
          <div className="text-red-600 text-center">
            <h2 className="text-lg font-semibold mb-2">Error Loading Property</h2>
            <p>Property not found or an error occurred</p>
          </div>
        </div>
      </div>
    );
  }

  const propertyImages = property.images && property.images.length > 0 
    ? property.images 
    : ["/placeholder.jpg", "/singlelisting-2.jpg", "/singlelisting-3.jpg"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 border-gray-200 hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Residences
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{property.title || property.name}</h1>
            <div className="flex items-center gap-2 text-gray-600 mt-1">
              <MapPin className="h-4 w-4" />
              <span>
                {property.location?.address}, {property.location?.city}, {property.location?.state || property.location?.country}
              </span>
            </div>
          </div>
          {currentLease && isLeaseEndingSoon() && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Lease Ending Soon
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden shadow-lg border-0">
              <div className="relative h-96 w-full">
                <Image
                  src={propertyImages[activeImageIndex]}
                  alt={property.title || property.name || "Property"}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-md text-sm">
                  {activeImageIndex + 1} / {propertyImages.length}
                </div>
              </div>
              {propertyImages.length > 1 && (
                <div className="p-4 bg-gray-50">
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {propertyImages.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`relative h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          activeImageIndex === index
                            ? 'border-teal-500 scale-105'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${property.title || property.name} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Property Details Tabs */}
            <Card className="shadow-lg border-0">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger 
                    value="details" 
                    className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger 
                    value="amenities"
                    className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
                  >
                    Amenities
                  </TabsTrigger>
                  <TabsTrigger 
                    value="lease"
                    className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
                  >
                    Lease Info
                  </TabsTrigger>
                  <TabsTrigger 
                    value="payments"
                    className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
                  >
                    Payments
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Property Description</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {property.description || "Experience modern living in this beautifully appointed property. Located in a prime area with easy access to local amenities, shopping, and transportation."}
                    </p>
                    
                    <Separator className="my-4" />
                    
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Key Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {getPropertyFeatures().map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="amenities" className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getPropertyAmenities().map((amenity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="p-2 bg-teal-100 rounded-lg">
                          <amenity.icon className="h-5 w-5 text-teal-600" />
                        </div>
                        <span className="font-medium text-gray-900">{amenity.label}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="lease" className="p-6">
                  {currentLease ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <BanknoteArrowDown className="h-4 w-4 text-teal-600" />
                            <span className="text-sm font-medium text-gray-500">Monthly Rent</span>
                          </div>
                          <p className="text-2xl font-bold text-gray-900">
                            {formatCurrency(currentLease.rent || currentLease.monthlyRent)}
                          </p>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-4 w-4 text-teal-600" />
                            <span className="text-sm font-medium text-gray-500">Security Deposit</span>
                          </div>
                          <p className="text-2xl font-bold text-gray-900">
                            {formatCurrency(currentLease.securityDeposit || currentLease.rent || 0)}
                          </p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="h-4 w-4 text-teal-600" />
                            <span className="text-sm font-medium text-gray-500">Lease Period</span>
                          </div>
                          <p className="text-gray-900">
                            {formatDate(currentLease.startDate)} - {formatDate(currentLease.endDate)}
                          </p>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-teal-600" />
                            <span className="text-sm font-medium text-gray-500">Days Remaining</span>
                          </div>
                          <p className="text-gray-900">
                            {daysRemaining()} days
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No active lease information available</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="payments" className="p-6">
                  {payments && payments.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {payments.map((payment) => (
                            <TableRow key={payment.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center">
                                  <FileText className="w-4 h-4 mr-2" />
                                  Invoice #{payment.id}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant={payment.paymentStatus === "Paid" ? "default" : "secondary"}>
                                  {payment.paymentStatus === "Paid" && <Check className="w-4 h-4 mr-1" />}
                                  {payment.paymentStatus}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {formatDate(payment.paymentDate)}
                              </TableCell>
                              <TableCell>
                                {formatCurrency(payment.amountPaid)}
                              </TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  <Download className="w-4 h-4 mr-1" />
                                  Download
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No payment history available</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Landlord Contact */}
            {property.landlord && (
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-teal-600" />
                    Landlord Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {property.landlord.name}
                      </p>
                      <p className="text-sm text-gray-500">Property Owner</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    {property.landlord.email && (
                      <a 
                        href={`mailto:${property.landlord.email}`}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Mail className="h-4 w-4 text-teal-600" />
                        <span className="text-gray-900">{property.landlord.email}</span>
                      </a>
                    )}
                    
                    {property.landlord.phoneNumber && (
                      <a 
                        href={`tel:${property.landlord.phoneNumber}`}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Phone className="h-4 w-4 text-teal-600" />
                        <span className="text-gray-900">{property.landlord.phoneNumber}</span>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-teal-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-gray-200 hover:bg-gray-50"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Lease Document
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-gray-200 hover:bg-gray-50"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Payment History
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-gray-200 hover:bg-gray-50"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Report Issue
                </Button>
                
                <Separator />
                
                {currentLease && (
                  <Dialog open={leaveModalOpen} onOpenChange={setLeaveModalOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="destructive" 
                        className="w-full justify-start"
                      >
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Request Lease Termination
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-600">
                          <AlertTriangle className="h-5 w-5" />
                          Request Lease Termination
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-700">
                            <strong>Important:</strong> Terminating your lease early may result in penalties. 
                            Please review your lease agreement or contact your landlord for details.
                          </p>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Reason for termination (optional)
                          </label>
                          <Textarea
                            placeholder="Please provide a reason for your lease termination request..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows={3}
                          />
                        </div>
                        
                        <div className="flex gap-3">
                          <Button 
                            variant="outline" 
                            onClick={() => setLeaveModalOpen(false)}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                          <Button 
                            variant="destructive" 
                            onClick={handleLeaveRequest}
                            disabled={isSubmitting}
                            className="flex-1"
                          >
                            {isSubmitting ? "Submitting..." : "Submit Request"}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>

            {/* Lease Status */}
            {currentLease && (
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-teal-600" />
                    Lease Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Status</span>
                      <Badge variant="default">Active</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Days Remaining</span>
                      <span className={`font-medium ${isLeaseEndingSoon() ? 'text-red-600' : 'text-gray-900'}`}>
                        {daysRemaining()} days
                      </span>
                    </div>
                    
                    {isLeaseEndingSoon() && (
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-800">
                            Lease Expiring Soon
                          </span>
                        </div>
                        <p className="text-xs text-yellow-700 mt-1">
                          Contact your landlord to discuss renewal options.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidenceDetailPage;