
import { Button } from "@/components/ui/button";
import { Copy, Phone, Mail } from "lucide-react";
import { NegotiationThread } from "@/types/outreach";
import { useToast } from "@/hooks/use-toast";

interface NegotiationContactTabProps {
  selectedThread: NegotiationThread;
}

const NegotiationContactTab = ({ selectedThread }: NegotiationContactTabProps) => {
  const { toast } = useToast();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} copied successfully`,
    });
  };

  return (
    <div className="px-6 h-full overflow-y-auto">
      <div className="space-y-6">
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

        {selectedThread.contact?.email && (
          <div>
            <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
              Email
            </h4>
            <div className="flex items-center space-x-3">
              <div className="flex-1 bg-[#F2F2F7] rounded-xl p-3">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-[#6E6E73]" />
                  <span className="text-sm text-[#1D1D1F] font-sans">
                    {selectedThread.contact.email}
                  </span>
                </div>
              </div>
              <Button
                onClick={() => handleCopy(selectedThread.contact!.email!, 'Email')}
                variant="outline"
                size="sm"
                className="p-2 border-[#E0E0E0] hover:border-[#0071E3] hover:bg-[#F8F9FA]"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {selectedThread.contact?.phone && (
          <div>
            <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
              Phone
            </h4>
            <div className="flex items-center space-x-3">
              <div className="flex-1 bg-[#F2F2F7] rounded-xl p-3">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-[#6E6E73]" />
                  <span className="text-sm text-[#1D1D1F] font-sans">
                    {selectedThread.contact.phone}
                  </span>
                </div>
              </div>
              <Button
                onClick={() => handleCopy(selectedThread.contact!.phone!, 'Phone')}
                variant="outline"
                size="sm"
                className="p-2 border-[#E0E0E0] hover:border-[#0071E3] hover:bg-[#F8F9FA]"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NegotiationContactTab;
