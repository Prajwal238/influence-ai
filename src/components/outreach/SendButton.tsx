
import { Button } from "@/components/ui/button";
import { Send, AlertCircle } from "lucide-react";

interface SendButtonProps {
  selectedInfluencersCount: number;
  isFormValid: boolean;
  isSending: boolean;
  onSend: () => void;
}

const SendButton = ({ selectedInfluencersCount, isFormValid, isSending, onSend }: SendButtonProps) => {
  return (
    <div className="space-y-4">
      {/* Error State */}
      {selectedInfluencersCount === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-900">
              Please select at least one influencer to send messages
            </span>
          </div>
        </div>
      )}

      {/* Send Button */}
      <div className="sticky bottom-6 z-10">
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base font-medium shadow-lg"
          onClick={onSend}
          disabled={!isFormValid || isSending}
        >
          <Send className="h-4 w-4 mr-2" />
          {isSending ? 'Sending...' : 
           selectedInfluencersCount > 1 ? `Send to ${selectedInfluencersCount} Influencers` : 
           'Send Outreach Message'}
        </Button>
      </div>
    </div>
  );
};

export default SendButton;
