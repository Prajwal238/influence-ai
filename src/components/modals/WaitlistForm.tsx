
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Users, Sparkles } from "lucide-react";
import { WaitlistFormFields } from "./WaitlistFormFields";
import { useWaitlistForm } from "./hooks/useWaitlistForm";

interface WaitlistFormProps {
  onClose: () => void;
}

export const WaitlistForm = ({ onClose }: WaitlistFormProps) => {
  const {
    formData,
    isSubmitting,
    errors,
    handleSubmit,
    handleInputChange,
  } = useWaitlistForm();

  return (
    <>
      <DialogHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <Sparkles className="w-6 h-6 text-yellow-500" />
        </div>
        <DialogTitle className="text-xl font-semibold text-gray-900">
          We're building something exciting — want in early?
        </DialogTitle>
        <DialogDescription className="text-gray-600">
          We're onboarding businesses in phases. Join early to get access, feedback perks, and help shape the future of influencer marketing.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <WaitlistFormFields
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Maybe Later
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? "Joining..." : "Join the Movement"}
          </Button>
        </div>
      </form>
    </>
  );
};
