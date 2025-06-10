
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, PhoneCall } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ManualPhoneInputProps {
  onCall?: (phoneNumber: string) => void;
}

const ManualPhoneInput = ({ onCall }: ManualPhoneInputProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const { toast } = useToast();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleCall = () => {
    if (phoneNumber.length === 10) {
      if (onCall) {
        onCall(phoneNumber);
      }
      toast({
        title: "Call initiated",
        description: `Calling ${phoneNumber}...`,
      });
    } else {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive"
      });
    }
  };

  const isValidPhone = phoneNumber.length === 10;

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans">
        Manual Phone Input
      </h4>
      
      <div className="flex items-center space-x-3">
        <div className="flex-1 bg-[#F2F2F7] rounded-xl p-3">
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-[#6E6E73]" />
            <Input
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className="border-0 bg-transparent p-0 text-sm text-[#1D1D1F] font-sans placeholder:text-[#8E8E93] focus-visible:ring-0"
              maxLength={10}
            />
          </div>
        </div>
        
        <Button
          onClick={handleCall}
          disabled={!isValidPhone}
          variant="default"
          size="sm"
          className="p-2 bg-[#0071E3] hover:bg-[#005CBB] text-white disabled:bg-[#C7C7CC] disabled:text-[#8E8E93]"
        >
          <PhoneCall className="h-4 w-4" />
        </Button>
      </div>
      
      {phoneNumber.length > 0 && phoneNumber.length < 10 && (
        <p className="text-xs text-[#FF3B30] font-sans">
          {10 - phoneNumber.length} more digit{10 - phoneNumber.length > 1 ? 's' : ''} required
        </p>
      )}
    </div>
  );
};

export default ManualPhoneInput;
