import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  useGetTourByApplicationQuery,
  useUpdateTourMutation,
  useCompleteTourMutation,
  useCancelTourMutation,
} from "@/state/api";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  CheckCircle, 
  XCircle,
  Edit3,
  Star
} from "lucide-react";
import { CustomFormField } from "@/components/FormField";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

interface TourManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationId: string;
  userRole: "landlord" | "tenant";
}

const tourUpdateSchema = z.object({
  scheduledDate: z.string().optional(),
  notes: z.string().optional(),
  feedbackRating: z.number().min(1).max(5).optional(),
});

type TourUpdateFormData = z.infer<typeof tourUpdateSchema>;

const TourManagementModal: React.FC<TourManagementModalProps> = ({
  isOpen,
  onClose,
  applicationId,
  userRole,
}) => {
  const { data: tour, isLoading: tourLoading, refetch } = useGetTourByApplicationQuery(applicationId, {
    skip: !isOpen || !applicationId,
  });

  const [updateTour, { isLoading: updating }] = useUpdateTourMutation();
  const [completeTour, { isLoading: completing }] = useCompleteTourMutation();
  const [cancelTour, { isLoading: canceling }] = useCancelTourMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [action, setAction] = useState<"complete" | "cancel" | null>(null);

  const form = useForm<TourUpdateFormData>({
    resolver: zodResolver(tourUpdateSchema),
    defaultValues: {
      scheduledDate: "",
      notes: "",
      feedbackRating: undefined,
    },
  });

  React.useEffect(() => {
    if (tour) {
      form.setValue("scheduledDate", new Date(tour.scheduledDate).toISOString().slice(0, 16));
      form.setValue("notes", userRole === "landlord" ? tour.landlordNotes || "" : tour.tenantNotes || "");
    }
  }, [tour, form, userRole]);

  const handleReschedule = async (data: TourUpdateFormData) => {
    try {
      const updateData: any = {
        tourId: tour.id.toString(),
        scheduledDate: data.scheduledDate,
      };

      if (userRole === "landlord") {
        updateData.landlordNotes = data.notes;
      } else {
        updateData.tenantNotes = data.notes;
      }

      await updateTour(updateData).unwrap();
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error("Error updating tour:", error);
    }
  };

  const handleComplete = async (data: TourUpdateFormData) => {
    try {
      await completeTour({
        tourId: tour.id.toString(),
        feedbackRating: data.feedbackRating,
        [userRole === "landlord" ? "landlordNotes" : "tenantNotes"]: data.notes,
      }).unwrap();
      setAction(null);
      refetch();
    } catch (error) {
      console.error("Error completing tour:", error);
    }
  };

  const handleCancel = async (data: TourUpdateFormData) => {
    try {
      await cancelTour({
        tourId: tour.id.toString(),
        reason: data.notes,
      }).unwrap();
      setAction(null);
      refetch();
    } catch (error) {
      console.error("Error canceling tour:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SCHEDULED": return "bg-blue-100 text-blue-800";
      case "IN_PROGRESS": return "bg-yellow-100 text-yellow-800";
      case "COMPLETED": return "bg-green-100 text-green-800";
      case "CANCELLED": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const canModify = tour && (tour.status === "SCHEDULED" || tour.status === "IN_PROGRESS");
  const canComplete = tour && userRole === "landlord" && tour.status !== "COMPLETED" && tour.status !== "CANCELLED";

  if (tourLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Loading Tour Details</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            <span className="ml-3">Loading tour details...</span>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!tour) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>No Tour Scheduled</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">No tour has been scheduled for this application yet.</p>
          <Button onClick={onClose} className="mt-4">Close</Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-600" />
            Tour Details
            <Badge className={`ml-2 ${getStatusColor(tour.status)}`}>
              {tour.status.replace("_", " ")}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        {/* Property and Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Property Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Property
            </h3>
            <p className="font-medium">{tour.application.property.name}</p>
            <p className="text-sm text-gray-600">{tour.application.property.location.address}</p>
            <p className="text-sm text-gray-600">{tour.application.property.location.city}</p>
          </div>

          {/* Contact Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              {userRole === "landlord" ? "Tenant" : "Landlord"} Contact
            </h3>
            {userRole === "landlord" ? (
              <>
                <p className="font-medium">{tour.application.tenant.name}</p>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Mail className="w-3 h-3" />
                  {tour.application.tenant.email}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Phone className="w-3 h-3" />
                  {tour.application.tenant.phoneNumber}
                </div>
              </>
            ) : (
              <>
                <p className="font-medium">{tour.application.property.landlord?.name}</p>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Mail className="w-3 h-3" />
                  {tour.application.property.landlord?.email}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Phone className="w-3 h-3" />
                  {tour.application.property.landlord?.phoneNumber}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Tour Schedule Info */}
        <div className="bg-teal-50 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-teal-900 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Scheduled Time
          </h3>
          <p className="text-teal-800 font-medium">
            {new Date(tour.scheduledDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </p>
        </div>

        {/* Notes Section */}
        {(tour.landlordNotes || tour.tenantNotes) && (
          <div className="space-y-3 mb-4">
            {tour.landlordNotes && (
              <div className="bg-blue-50 rounded-lg p-3">
                <h4 className="font-medium text-blue-900 text-sm mb-1">Landlord Notes:</h4>
                <p className="text-blue-800 text-sm">{tour.landlordNotes}</p>
              </div>
            )}
            {tour.tenantNotes && (
              <div className="bg-green-50 rounded-lg p-3">
                <h4 className="font-medium text-green-900 text-sm mb-1">Tenant Notes:</h4>
                <p className="text-green-800 text-sm">{tour.tenantNotes}</p>
              </div>
            )}
          </div>
        )}

        {/* Feedback Rating */}
        {tour.feedbackRating && (
          <div className="bg-yellow-50 rounded-lg p-3 mb-4">
            <h4 className="font-medium text-yellow-900 text-sm mb-1">Tour Feedback:</h4>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < tour.feedbackRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-yellow-800">{tour.feedbackRating}/5</span>
            </div>
          </div>
        )}

        {/* Action Forms */}
        {(isEditing || action) && (
          <div className="border-t pt-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(
                  action === "complete" ? handleComplete : action === "cancel" ? handleCancel : handleReschedule
                )}
                className="space-y-4"
              >
              {isEditing && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reschedule To:
                    </label>
                    <input
                      type="datetime-local"
                      {...form.register("scheduledDate")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      min={new Date().toISOString().slice(0, 16)}
                    />
                  </div>
                  <CustomFormField
                    name="notes"
                    label={`${userRole === "landlord" ? "Landlord" : "Tenant"} Notes`}
                    type="textarea"
                    placeholder="Add any notes about the reschedule..."
                  />
                </>
              )}

              {action === "complete" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rate the Tour (1-5):
                    </label>
                    <select
                      {...form.register("feedbackRating", { valueAsNumber: true })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Select Rating</option>
                      {[1, 2, 3, 4, 5].map(rating => (
                        <option key={rating} value={rating}>{rating} Star{rating > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <CustomFormField
                    name="notes"
                    label="Tour Feedback"
                    type="textarea"
                    placeholder="How was the tour? Any observations or feedback..."
                  />
                </>
              )}

              {action === "cancel" && (
                <CustomFormField
                  name="notes"
                  label="Cancellation Reason"
                  type="textarea"
                  placeholder="Please provide a reason for canceling the tour..."
                />
              )}

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setAction(null);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-teal-600 hover:bg-teal-700"
                  disabled={updating || completing || canceling}
                >
                  {action === "complete" && "Complete Tour"}
                  {action === "cancel" && "Cancel Tour"}
                  {isEditing && "Update Tour"}
                </Button>
              </div>
            </form>
            </Form>
          </div>
        )}

        {/* Action Buttons */}
        {!isEditing && !action && (
          <div className="flex flex-wrap gap-2 pt-4 border-t">
            {canModify && (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Reschedule
              </Button>
            )}

            {canComplete && tour.status !== "COMPLETED" && (
              <Button
                onClick={() => setAction("complete")}
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Complete Tour
              </Button>
            )}

            {canModify && (
              <Button
                onClick={() => setAction("cancel")}
                variant="destructive"
                className="flex items-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Cancel Tour
              </Button>
            )}

            <Button onClick={onClose} variant="outline" className="ml-auto">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TourManagementModal;