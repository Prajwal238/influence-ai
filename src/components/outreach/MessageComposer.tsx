
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import BulkMessagingProgress from "./BulkMessagingProgress";
import SendButton from "./SendButton";
import AIPersonalizationInfo from "./AIPersonalizationInfo";
import MessageForm from "./MessageForm";
import { useBulkMessaging } from "@/hooks/useBulkMessaging";

interface MessageComposerProps {
  message: string;
  onMessageChange: (message: string) => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
  selectedInfluencersCount: number;
  onSendAsText: () => void;
  onSendAsVoice: () => void;
  onSendAsVideo?: () => void;
}

const MessageComposer = ({
  message,
  onMessageChange,
  selectedLanguage,
  onLanguageChange,
  selectedPlatform,
  onPlatformChange,
  selectedInfluencersCount,
  onSendAsText,
  onSendAsVoice,
  onSendAsVideo
}: MessageComposerProps) => {
  const messageForm = MessageForm({
    message,
    onMessageChange,
    selectedPlatform
  });
  
  const bulkMessaging = useBulkMessaging({
    selectedInfluencersCount,
    sendAsVoice: messageForm.messageType === "voice",
    onSendAsText,
    onSendAsVoice
  });

  // Mock platform breakdown for demonstration
  const platformBreakdown = {
    instagram: { sent: 2, total: 3 },
    email: { sent: 1, total: 2 },
    whatsapp: { sent: 0, total: 1 }
  };

  const handleSend = async () => {
    const contentToValidate = messageForm.getContentForValidation();
    await bulkMessaging.handleSend(contentToValidate);
  };

  const isFormValid = messageForm.getContentForValidation() && selectedInfluencersCount > 0;

  const getSendButtonText = () => {
    return selectedInfluencersCount > 1 
      ? `Send to ${selectedInfluencersCount} Influencers` 
      : 'Send Outreach Message';
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Message Composition</CardTitle>
            {selectedInfluencersCount > 1 && (
              <Badge className="bg-purple-100 text-purple-800 flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>Bulk Mode</span>
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {messageForm.renderForm()}

          <AIPersonalizationInfo
            selectedInfluencersCount={selectedInfluencersCount}
            sendAsVoice={messageForm.messageType === "voice"}
          />
        </CardContent>
      </Card>

      <SendButton
        selectedInfluencersCount={selectedInfluencersCount}
        isFormValid={isFormValid}
        isSending={bulkMessaging.isSending}
        onSend={handleSend}
        customText={getSendButtonText()}
      />

      <BulkMessagingProgress
        isActive={bulkMessaging.isBulkSending}
        progress={bulkMessaging.bulkProgress}
        completed={Math.floor(bulkMessaging.bulkProgress / 100 * selectedInfluencersCount)}
        total={selectedInfluencersCount}
        platformBreakdown={platformBreakdown}
      />
    </div>
  );
};

export default MessageComposer;
