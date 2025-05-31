
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import BulkMessagingProgress from "./BulkMessagingProgress";
import TemplateSelector from "./TemplateSelector";
import MessageTypeToggle from "./MessageTypeToggle";
import TextMessageEditor from "./TextMessageEditor";
import VoiceMessageEditor from "./VoiceMessageEditor";
import LanguageSelector from "./LanguageSelector";
import SendButton from "./SendButton";
import AIPersonalizationInfo from "./AIPersonalizationInfo";
import { useBulkMessaging } from "@/hooks/useBulkMessaging";
import { useToast } from "@/hooks/use-toast";

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
  onSendAsVoice
}: MessageComposerProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState("first-reach");
  const [voiceMessage, setVoiceMessage] = useState("");
  const [voiceLanguage, setVoiceLanguage] = useState("english");
  const [sendAsVoice, setSendAsVoice] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTargetLanguages, setSelectedTargetLanguages] = useState<string[]>(["english"]);
  
  const { toast } = useToast();
  
  const bulkMessaging = useBulkMessaging({
    selectedInfluencersCount,
    sendAsVoice,
    onSendAsText,
    onSendAsVoice
  });

  // Mock platform breakdown for demonstration
  const platformBreakdown = {
    instagram: { sent: 2, total: 3 },
    email: { sent: 1, total: 2 },
    whatsapp: { sent: 0, total: 1 }
  };

  const handleGenerateWithAI = async () => {
    setIsGenerating(true);
    
    try {
      toast({
        title: "Generating Message",
        description: "AI is creating your personalized message...",
      });

      const response = await fetch('http://localhost:5000/api/user_123/campaigns/summer_fashion_2024/ai_message', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.type === 'message' && data.message) {
        if (sendAsVoice) {
          setVoiceMessage(data.message);
        } else {
          onMessageChange(data.message);
        }
        
        toast({
          title: "Message Generated",
          description: "AI has successfully created your message!",
        });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error generating AI message:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate AI message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLanguageToggle = (language: string) => {
    setSelectedTargetLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const handleSend = async () => {
    const contentToValidate = sendAsVoice ? voiceMessage : message;
    await bulkMessaging.handleSend(contentToValidate);
  };

  const isFormValid = (sendAsVoice ? voiceMessage.trim() : message.trim()) && selectedInfluencersCount > 0;

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
          <TemplateSelector 
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
          />

          <MessageTypeToggle 
            sendAsVoice={sendAsVoice}
            onToggle={setSendAsVoice}
          />

          {!sendAsVoice && (
            <TextMessageEditor
              message={message}
              onMessageChange={onMessageChange}
              selectedPlatform={selectedPlatform}
              onGenerateWithAI={handleGenerateWithAI}
              isGenerating={isGenerating}
            />
          )}

          {sendAsVoice && (
            <VoiceMessageEditor
              voiceMessage={voiceMessage}
              onVoiceMessageChange={setVoiceMessage}
              voiceLanguage={voiceLanguage}
              onVoiceLanguageChange={setVoiceLanguage}
              selectedPlatform={selectedPlatform}
              onGenerateWithAI={handleGenerateWithAI}
              isGenerating={isGenerating}
            />
          )}

          <LanguageSelector
            selectedLanguages={selectedTargetLanguages}
            onLanguageToggle={handleLanguageToggle}
          />

          <AIPersonalizationInfo
            selectedInfluencersCount={selectedInfluencersCount}
            sendAsVoice={sendAsVoice}
          />
        </CardContent>
      </Card>

      <SendButton
        selectedInfluencersCount={selectedInfluencersCount}
        isFormValid={isFormValid}
        isSending={bulkMessaging.isSending}
        onSend={handleSend}
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
