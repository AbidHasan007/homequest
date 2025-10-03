import { Button } from "@/components/ui/button";
import { useGetAuthUserQuery } from "@/state/api";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const ContactWidget = ({ onOpenModal }: ContactWidgetProps) => {
  const { data: authUser } = useGetAuthUserQuery();
  const router = useRouter();

  const handleButtonClick = () => {
    if (authUser) {
      onOpenModal();
    } else {
      router.push("/signin");
    }
  };

  return (
    <div className="bg-white border border-primary-200 rounded-2xl p-7 h-fit min-w-[300px]">
      {/* Contact Property */}
      <div className="flex items-center gap-5 mb-4 border border-primary-200 p-4 rounded-xl">
        <div className="flex items-center p-4 bg-teal-900 rounded-full">
          <MessageCircle className="text-primary-50" size={15} />
        </div>
        <div>
          <p>Contact This Property</p>
          <div className="text-lg font-bold text-primary-800">
           Via Message
          </div>
        </div>
      </div>
      <Button
        className="w-full bg-teal-700 text-white hover:bg-teal-600"
        onClick={handleButtonClick}
      >
        {authUser ? "Submit Application" : "Sign In to Rent"}
      </Button>

      <hr className="my-4" />
      <div className="text-sm">
        <div className="text-primary-600">
          House visits by appointment only. Please submit rent request to get a
          schedule.
        </div>
      </div>
    </div>
  );
};

export default ContactWidget;