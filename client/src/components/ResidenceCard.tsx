import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCreateTerminationRequestMutation } from "@/state/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { 
  Home,
  Calendar,
  DollarSign,
  Clock,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  X,
  User,
  BanknoteArrowDown
} from "lucide-react";

interface ResidenceCardProps {
  residence: {
    id: string;
    title: string;
    address: string;
    city: string;
    state: string;
    images: string[];
    lease: {
      id: string;
      rent: number;
      startDate: string;
      deposit: number;
      status?: 'active' | 'upcoming' | 'pending';
      daysLived?: number;
      daysUntilStart?: number;
    } | null;
    landlord: {
      name: string;
      email: string;
      phoneNumber: string;
    } | null;
  };
}

const ResidenceCard: React.FC<ResidenceCardProps> = ({ residence }) => {
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const [createTerminationRequest] = useCreateTerminationRequestMutation();
  
  // For indefinite leases, we don't have lease ending warnings
  const isLeaseEnding = () => {
    return false; // Indefinite leases don't have end dates
  };
  
  const handleLeaveRequest = async () => {
    if (!residence.lease?.id) {
      console.error("No active lease found");
      return;
    }

    setIsSubmitting(true);
    try {
      await createTerminationRequest({
        leaseId: Number(residence.lease.id),
        reason: reason.trim() || undefined
      }).unwrap();
      
      setLeaveModalOpen(false);
      setConfirmationOpen(true);
      setReason(""); // Clear the reason field
    } catch (error) {
      console.error("Failed to submit termination request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // For active leases, show days lived; for upcoming leases, show days until start
  const getDaysDisplay = () => {
    if (!residence.lease) return { days: 0, label: 'N/A' };
    
    if (residence.lease.status === 'upcoming') {
      return {
        days: residence.lease.daysUntilStart || 0,
        label: 'Days Until Start'
      };
    } else if (residence.lease.status === 'active') {
      return {
        days: residence.lease.daysLived || 0,
        label: 'Days Lived'
      };
    }
    
    return { days: 0, label: 'N/A' };
  };



  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No date available';
    try {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(new Date(dateString));
    } catch (error) {
      return 'Invalid date';
    }
  };

  const handleViewDetails = () => {
    if (residence?.id) {
      router.push(`/tenants/residences/${residence.id}`);
    }
  };

  // Safety check for residence data
  if (!residence || !residence.id) {
    return (
      <Card className="overflow-hidden shadow-md bg-white">
        <CardContent className="p-6 text-center text-gray-500">
          <p>Property information not available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white">
        <div className="relative h-48 w-full overflow-hidden">
          {residence.images && residence.images.length > 0 ? (
            <Image
              src={residence.images[0]}
              alt={residence.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center">
              <Home className="h-16 w-16 text-teal-300" />
            </div>
          )}
          {/* No lease ending badge for indefinite leases */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-teal-700 transition-colors">
                {residence.title}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">
                  {residence.address}, {residence.city}, {residence.state}
                </span>
              </p>
            </div>
            <Badge 
              variant="outline" 
              className={`font-medium ${
                residence.lease?.status === 'upcoming' 
                  ? 'bg-blue-50 text-blue-700 border-blue-200' 
                  : residence.lease?.status === 'active'
                  ? 'bg-teal-50 text-teal-700 border-teal-200'
                  : 'bg-gray-50 text-gray-700 border-gray-200'
              }`}
            >
              {residence.lease?.status === 'upcoming' ? 'Upcoming Lease' : 
               residence.lease?.status === 'active' ? 'Active Lease' : 'Lease'}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pb-4">
          {residence.lease && (
            <>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <BanknoteArrowDown className="h-4 w-4 text-teal-600" />
                  <div>
                    <p className="text-xs text-gray-500">Monthly Rent</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatCurrency(residence.lease.rent)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <Clock className="h-4 w-4 text-teal-600" />
                  <div>
                    <p className="text-xs text-gray-500">
                      {getDaysDisplay().label}
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {getDaysDisplay().days} days
                    </p>
                  </div>
                </div>
              </div>
              
              <Separator className="my-3" />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Lease Start</span>
                  <span className="font-medium text-gray-900">{formatDate(residence.lease.startDate)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Lease Type</span>
                  <span className="font-medium text-teal-700">Ongoing (No Fixed End Date)</span>
                </div>
                {residence.landlord && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Landlord</span>
                    <span className="font-medium text-gray-900">
                      {residence.landlord.name}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
          
          {!residence.lease && (
            <div className="text-center py-4 text-gray-500">
              <p>No active lease information available</p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex gap-2 pt-0">
          <Button 
            variant="default" 
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
            onClick={handleViewDetails}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-all duration-200"
            onClick={() => setLeaveModalOpen(true)}
          >
            Request Termination
          </Button>
        </CardFooter>
      </Card>

      {/* Leave Lease Modal */}
      <Dialog open={leaveModalOpen} onOpenChange={setLeaveModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Request Lease Termination
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              This will notify your landlord of your intent to terminate the lease. 
              Note that early termination may have financial implications based on your lease agreement.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800 mb-2">Important Information</h4>
                  <ul className="text-sm space-y-1 text-amber-700 list-disc pl-4">
                    <li>Your security deposit may be affected</li>
                    <li>You may be responsible for rent until a new tenant is found</li>
                    <li>Early termination fees may apply</li>
                    <li>This request is subject to landlord approval</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="reason" className="text-sm font-medium text-gray-700">
                Reason for termination request *
              </label>
              <textarea
                id="reason"
                className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                placeholder="Please explain why you wish to terminate your lease..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setLeaveModalOpen(false)}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleLeaveRequest} 
              disabled={!reason.trim() || isSubmitting}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Confirmation Modal */}
      <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Request Submitted Successfully</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <div className="relative">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600 animate-pulse" />
              </div>
              <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-20" />
            </div>
            <p className="text-center text-gray-600 leading-relaxed">
              Your lease termination request has been submitted to your landlord.
              You will receive a notification when they respond to your request.
            </p>
          </div>
          <DialogFooter>
            <Button 
              onClick={() => setConfirmationOpen(false)}
              className="w-full bg-teal-600 hover:bg-teal-700"
            >
              Got it, thanks!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResidenceCard;