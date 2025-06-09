
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface WaitlistSuccessViewProps {
  onClose: () => void;
}

export const WaitlistSuccessView = ({ onClose }: WaitlistSuccessViewProps) => {
  return (
    <div className="text-center py-6">
      <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Thanks for joining the waitlist!
      </h3>
      <p className="text-gray-600 mb-6">
        You're one of us now 🚀
      </p>
      <Button onClick={onClose} className="w-full">
        Continue Exploring
      </Button>
    </div>
  );
};
