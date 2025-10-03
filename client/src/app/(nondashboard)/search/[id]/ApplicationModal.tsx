import { CustomFormField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { ApplicationFormData, applicationSchema } from "@/lib/schemas";
import { useCreateApplicationMutation, useGetAuthUserQuery, useCheckExistingApplicationQuery } from "@/state/api";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AlertTriangle, CheckCircle, Clock, X } from "lucide-react";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: number;
}

const ApplicationModal = ({
  isOpen,
  onClose,
  propertyId,
}: ApplicationModalProps) => {
  const [createApplication, { isLoading: isSubmitting }] = useCreateApplicationMutation();
  const { data: authUser } = useGetAuthUserQuery();
  const [error, setError] = useState<string | null>(null);

  // Check for existing application
  const { data: existingCheck, isLoading: isCheckingExisting } = useCheckExistingApplicationQuery(
    {
      propertyId: propertyId,
      tenantCognitoId: authUser?.cognitoInfo?.userId || ""
    },
    {
      skip: !authUser?.cognitoInfo?.userId || !isOpen
    }
  );

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: authUser?.userInfo.name || "",
      email: authUser?.userInfo.email || "",
      phoneNumber: authUser?.userInfo.phoneNumber || "",
      message: "",
    },
  });

  const onSubmit = async (data: ApplicationFormData) => {
    if (!authUser || authUser.userRole !== "tenant") {
      setError("You must be logged in as a tenant to submit an application");
      return;
    }

    // Check if user can apply (should be handled by UI, but double-check)
    if (existingCheck && !existingCheck.canApply) {
      setError(existingCheck.reason);
      return;
    }

    try {
      setError(null);
      await createApplication({
        ...data,
        applicationDate: new Date().toISOString(),
        status: "Pending",
        propertyId: propertyId,
        tenantCognitoId: authUser.cognitoInfo.userId,
      }).unwrap();
      
      onClose();
      form.reset();
    } catch (err: any) {
      setError(err?.data?.message || "Failed to submit application. Please try again.");
    }
  };

  // Show loading while checking existing application
  if (isCheckingExisting && isOpen) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Checking Application Status</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            <span className="ml-3">Checking application status...</span>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Show existing application status if user cannot apply
  if (existingCheck && !existingCheck.canApply) {
    // Handle active lease with landlord restriction
    if (existingCheck.restrictionType === 'ACTIVE_LEASE_WITH_LANDLORD') {
      return (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="bg-white">
            <DialogHeader className="mb-4">
              <DialogTitle>Application Not Available</DialogTitle>
            </DialogHeader>
            <div className="text-center p-6">
              <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-orange-600" />
              <h3 className="text-lg font-semibold mb-2">Active Lease Restriction</h3>
              <p className="text-gray-600 mb-4">{existingCheck.reason}</p>
              {existingCheck.existingLease && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700 mb-1">
                    <strong>Current Property:</strong> {existingCheck.existingLease.propertyName}
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    <strong>Landlord:</strong> {existingCheck.existingLease.landlordName}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Lease Period:</strong> {new Date(existingCheck.existingLease.startDate).toLocaleDateString()} - {new Date(existingCheck.existingLease.endDate).toLocaleDateString()}
                  </p>
                </div>
              )}
              <Button onClick={onClose} className="mt-4">
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      );
    }

    // Handle existing application restrictions
    const existingApp = existingCheck.application;
    const statusColor = existingApp?.status === 'Pending' ? 'text-yellow-600' : 'text-green-600';
    const StatusIcon = existingApp?.status === 'Pending' ? Clock : CheckCircle;

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white">
          <DialogHeader className="mb-4">
            <DialogTitle>Application Status</DialogTitle>
          </DialogHeader>
          <div className="text-center p-6">
            <StatusIcon className={`w-16 h-16 mx-auto mb-4 ${statusColor}`} />
            <h3 className="text-lg font-semibold mb-2">
              {existingApp?.status === 'Pending' ? 'Application Pending' : 'Application Approved'}
            </h3>
            <p className="text-gray-600 mb-4">{existingCheck.reason}</p>
            {existingApp?.status === 'Pending' && (
              <p className="text-sm text-gray-500">
                Submitted on {new Date(existingApp.applicationDate).toLocaleDateString()}
              </p>
            )}
            <Button onClick={onClose} className="mt-4">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader className="mb-4">
          <DialogTitle>Submit Application for this Property</DialogTitle>
        </DialogHeader>

        {/* Show error message if any */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Show reapplication notice if this is a reapplication after denial */}
        {existingCheck?.hasExisting && existingCheck.canApply && existingCheck.application?.status === 'Denied' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-blue-500 mr-2" />
              <p className="text-blue-700 text-sm">
                Your previous application was denied. You can submit a new application.
              </p>
            </div>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <CustomFormField
              name="name"
              label="Name"
              type="text"
              placeholder="Enter your full name"
              disabled
            />
            <CustomFormField
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email address"
              disabled
            />
            <CustomFormField
              name="phoneNumber"
              label="Phone Number"
              type="text"
              disabled
              placeholder="Enter your phone number"
            />
            <CustomFormField
              name="message"
              label="Message (Optional)"
              type="textarea"
              placeholder="Enter any additional information"
            />
            <span className="text-sm text-gray-600 mt-6">By clicking on &ldquo;submit application&rdquo;, 
              you agree to share your contact information with this property owner.</span>
            <Button 
              type="submit" 
              className="bg-teal-700 text-white w-full"
              disabled={isSubmitting || (existingCheck && !existingCheck.canApply)}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                existingCheck?.hasExisting && existingCheck.canApply && existingCheck.application?.status === 'Denied'
                  ? "Resubmit Application"
                  : "Submit Application"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;
