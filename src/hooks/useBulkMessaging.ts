
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface BulkMessagingState {
  isSending: boolean;
  isBulkSending: boolean;
  bulkProgress: number;
}

interface BulkMessagingOptions {
  selectedInfluencersCount: number;
  sendAsVoice: boolean;
  onSendAsText: () => void;
  onSendAsVoice: () => void;
}

export const useBulkMessaging = (options: BulkMessagingOptions) => {
  const [state, setState] = useState<BulkMessagingState>({
    isSending: false,
    isBulkSending: false,
    bulkProgress: 0,
  });
  
  const { toast } = useToast();
  const { selectedInfluencersCount, sendAsVoice, onSendAsText, onSendAsVoice } = options;

  const startBulkSending = () => {
    setState(prev => ({ ...prev, isBulkSending: true, bulkProgress: 0 }));

    const interval = setInterval(() => {
      setState(prev => {
        if (prev.bulkProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setState(prev => ({ ...prev, isBulkSending: false, isSending: false }));
            toast({
              title: "Outreach Complete!",
              description: `Successfully sent ${selectedInfluencersCount} personalized ${sendAsVoice ? 'voice' : 'text'} messages.`,
            });
          }, 1000);
          return prev;
        }
        return { ...prev, bulkProgress: prev.bulkProgress + 20 };
      });
    }, 500);
  };

  const startSingleSending = () => {
    setTimeout(() => {
      setState(prev => ({ ...prev, isSending: false }));
      toast({
        title: "Message Sent!",
        description: `Your ${sendAsVoice ? 'voice' : 'text'} outreach message has been sent successfully.`,
      });
    }, 1000);
  };

  const handleSend = async (contentToValidate: string) => {
    if (selectedInfluencersCount === 0) return;
    
    if (!contentToValidate.trim()) {
      toast({
        title: "Missing Content",
        description: `Please add ${sendAsVoice ? 'voice' : 'text'} message content before sending.`,
        variant: "destructive"
      });
      return;
    }
    
    setState(prev => ({ ...prev, isSending: true }));
    
    if (selectedInfluencersCount > 1) {
      startBulkSending();
    } else {
      startSingleSending();
    }

    // Call the original handlers
    if (sendAsVoice) {
      onSendAsVoice();
    } else {
      onSendAsText();
    }
  };

  return {
    ...state,
    handleSend,
  };
};
