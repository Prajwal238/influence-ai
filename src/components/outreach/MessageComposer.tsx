
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import MessageForm from "./MessageForm";
import SendButton from "./SendButton";

interface MessageComposerProps {
  onMessageChange: (message: string) => void;
  message: string;
  selectedPlatform: string;
  selectedInfluencersCount: number;
  onSendAsText: () => void;
  onSendAsVoice: () => void;
}

const MessageComposer = ({ 
  onMessageChange, 
  message, 
  selectedPlatform, 
  selectedInfluencersCount,
  onSendAsText,
  onSendAsVoice 
}: MessageComposerProps) => {
  const { id: campaignId } = useParams<{ id: string }>();
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    setIsSending(true);
    try {
      await onSendAsText();
    } finally {
      setIsSending(false);
    }
  };

  const isFormValid = selectedInfluencersCount > 0 && message.trim().length > 0;

  return (
    <Card className="bg-white shadow-apple rounded-2xl border-0 p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-[#1D1D1F] font-sans tracking-tight mb-2">
            Message Composer
          </h3>
          <p className="text-[#6E6E73] font-sans text-sm">
            Create and customize your outreach messages
          </p>
        </div>

        <MessageForm
          message={message}
          onMessageChange={onMessageChange}
          selectedPlatform={selectedPlatform}
          campaignId={campaignId}
        />

        <SendButton
          selectedInfluencersCount={selectedInfluencersCount}
          isFormValid={isFormValid}
          isSending={isSending}
          onSend={handleSend}
        />
      </div>
    </Card>
  );
};

export default MessageComposer;
