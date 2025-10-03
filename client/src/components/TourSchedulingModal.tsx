import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "@/components/FormField";
import { useScheduleTourMutation } from "@/state/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, Clock, MapPin, User } from "lucide-react";

interface TourSchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: any;
}

const tourScheduleSchema = z.object({
  scheduledDate: z.string().min(1, "Date and time are required"),
  landlordNotes: z.string().optional(),
});

type TourScheduleFormData = z.infer<typeof tourScheduleSchema>;

const TourSchedulingModal: React.FC<TourSchedulingModalProps> = ({
  isOpen,
  onClose,
  application,
}) => {
  const [scheduleTour, { isLoading }] = useScheduleTourMutation();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<TourScheduleFormData>({
    resolver: zodResolver(tourScheduleSchema),
    defaultValues: {
      scheduledDate: "",
      landlordNotes: "",
    },
  });

  const onSubmit = async (data: TourScheduleFormData) => {
    try {
      setError(null);
      
      // Validate that the scheduled date is in the future
      const selectedDate = new Date(data.scheduledDate);
      const now = new Date();
      
      if (selectedDate <= now) {
        setError("Tour date must be in the future");
        return;
      }

      await scheduleTour({
        applicationId: application.id.toString(),
        scheduledDate: data.scheduledDate,
        landlordNotes: data.landlordNotes,
      }).unwrap();

      form.reset();
      onClose();
    } catch (err: any) {
      setError(err?.data?.message || "Failed to schedule tour. Please try again.");
    }
  };

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().slice(0, 16);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-600" />
            {application.tour?.status === "CANCELLED" ? "Reschedule Property Tour" : "Schedule Property Tour"}
          </DialogTitle>
        </DialogHeader>

        {/* Application Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <h3 className="font-semibold text-sm text-gray-900">
                  {application.property?.name}
                </h3>
              </div>
              <p className="text-xs text-gray-600 mb-2">
                {application.property?.location?.address}
              </p>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">
                  {application.tenant?.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Tour Date & Time
              </label>
              <input
                type="datetime-local"
                min={minDate}
                {...form.register("scheduledDate")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
              {form.formState.errors.scheduledDate && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.scheduledDate.message}
                </p>
              )}
            </div>

            <CustomFormField
              name="landlordNotes"
              label="Notes for Tenant (Optional)"
              type="textarea"
              placeholder="Any special instructions or notes for the tour..."
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-teal-600 hover:bg-teal-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {application.tour?.status === "CANCELLED" ? "Rescheduling..." : "Scheduling..."}
                  </>
                ) : (
                  application.tour?.status === "CANCELLED" ? "Reschedule Tour" : "Schedule Tour"
                )}
              </Button>
            </div>
          </form>
        </Form>

        <div className="bg-blue-50 rounded-lg p-3 mt-4">
          <p className="text-blue-700 text-xs">
            📋 The tenant will be notified about the {application.tour?.status === "CANCELLED" ? "rescheduled" : "scheduled"} tour and can accept or request to reschedule.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TourSchedulingModal;