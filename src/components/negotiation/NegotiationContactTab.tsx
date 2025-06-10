
import { Button } from "@/components/ui/button";
import { Copy, Phone, Mail, PhoneCall } from "lucide-react";
import { NegotiationThread } from "@/types/outreach";
import { useToast } from "@/hooks/use-toast";
import ManualPhoneInput from "./ManualPhoneInput";
import PrototypeBanner from "./PrototypeBanner";

interface NegotiationContactTabProps {
  selectedThread: NegotiationThread;
  onCall?: () => void;
}

const NegotiationContactTab = ({ selectedThread, onCall }: NegotiationContactTabProps) => {
  const { toast } = useToast();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} copied successfully`,
    });
  };

  const handleCall = () => {
    if (onCall) {
      onCall();
    } else {
      toast({
        title: "Call functionality unavailable",
        description: "Call feature is not available at the moment",
        variant: "destructive"
      });
    }
  };

  const handleManualCall = (phoneNumber: string) => {
    // For prototype stage, we'll just show a toast
    // In production, this would integrate with the actual calling system
    toast({
      title: "Call initiated",
      description: `Initiating call to ${phoneNumber}...`,
    });
  };

  return (
    <div className="px-6 h-full overflow-y-auto">
      <div className="space-y-6">
        {/* Prototype Banner */}
        <PrototypeBanner />

        <div>
          <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
            Creator Info
          </h4>
          <div className="bg-[#F2F2F7] rounded-xl p-4">
            <p className="text-sm font-semibold text-[#1D1D1F] font-sans">
              {selectedThread.name}
            </p>
            <p className="text-sm text-[#6E6E73] font-sans">
              {selectedThread.handle}
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
            Email
          </h4>
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-[#F2F2F7] rounded-xl p-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[#6E6E73]" />
                <span className="text-sm text-[#1D1D1F] font-sans">
                  {selectedThread.contact?.email || "Not Available"}
                </span>
              </div>
            </div>
            {selectedThread.contact?.email && (
              <Button
                onClick={() => handleCopy(selectedThread.contact!.email!, 'Email')}
                variant="outline"
                size="sm"
                className="p-2 border-[#E0E0E0] hover:border-[#0071E3] hover:bg-[#F8F9FA]"
              >
                <Copy className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
            Extracted Phone
          </h4>
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-[#F2F2F7] rounded-xl p-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-[#6E6E73]" />
                <span className="text-sm text-[#1D1D1F] font-sans">
                  {selectedThread.contact?.phone || "Not Available"}
                </span>
              </div>
            </div>
            {selectedThread.contact?.phone && (
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleCopy(selectedThread.contact!.phone!, 'Phone')}
                  variant="outline"
                  size="sm"
                  className="p-2 border-[#E0E0E0] hover:border-[#0071E3] hover:bg-[#F8F9FA]"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleCall}
                  variant="default"
                  size="sm"
                  className="p-2 bg-[#0071E3] hover:bg-[#005CBB] text-white"
                >
                  <PhoneCall className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Manual Phone Input */}
        <ManualPhoneInput onCall={handleManualCall} />
      </div>
    </div>
  );
};

export default NegotiationContactTab;
