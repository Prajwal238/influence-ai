
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BulkMessagingProgress from "./BulkMessagingProgress";
import TemplateSelector from "./TemplateSelector";
import MessageTypeToggle from "./MessageTypeToggle";
import TextMessageEditor from "./TextMessageEditor";
import VoiceMessageEditor from "./VoiceMessageEditor";
import LanguageSelector from "./LanguageSelector";
import SendButton from "./SendButton";

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
  const [isSending, setIsSending] = useState(false);
  const [selectedTargetLanguages, setSelectedTargetLanguages] = useState<string[]>(["english"]);
  const [isBulkSending, setIsBulkSending] = useState(false);
  const [bulkProgress, setBulkProgress] = useState(0);
  
  const { toast } = useToast();

  // Mock platform breakdown for demonstration
  const platformBreakdown = {
    instagram: { sent: 2, total: 3 },
    email: { sent: 1, total: 2 },
    whatsapp: { sent: 0, total: 1 }
  };

  const handleGenerateWithAI = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      if (sendAsVoice) {
        // Generate voice-optimized content
        setVoiceMessage(`Hi {name}!

I hope you're doing amazing! I'm reaching out about an exciting collaboration opportunity with our Summer Fashion 2024 campaign.

We've been following your incredible content in the ${selectedPlatform === 'instagram' ? 'fashion' : 'lifestyle'} space, and we absolutely love your authentic style and the way you connect with your audience.

Our campaign is all about sustainable summer fashion, and we believe your voice and values align perfectly with what we're trying to achieve.

Would you be interested in chatting about a potential partnership? We'd love to share more details about the collaboration and of course, discuss compensation that reflects your amazing work.

Looking forward to hearing from you soon!

Best regards,
The Campaign Team`);
      } else {
        // Generate text-optimized content
        onMessageChange(`Hi {name},

I hope this message finds you well! I'm reaching out on behalf of our Summer Fashion 2024 campaign. We've been following your amazing content in the ${selectedPlatform === 'instagram' ? 'fashion' : 'lifestyle'} space and would love to collaborate with you.

Our campaign focuses on sustainable summer fashion, and we believe your authentic voice and engaged audience would be a perfect fit for our brand values.

Would you be interested in discussing a potential partnership? We'd love to share more details about the collaboration and compensation.

Looking forward to hearing from you!

Best regards,
Campaign Team`);
      }
      setIsGenerating(false);
    }, 2000);
  };

  const handleLanguageToggle = (language: string) => {
    setSelectedTargetLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const handleSend = async () => {
    if (selectedInfluencersCount === 0) return;
    
    // Validate content based on message type
    const contentToValidate = sendAsVoice ? voiceMessage : message;
    if (!contentToValidate.trim()) {
      toast({
        title: "Missing Content",
        description: `Please add ${sendAsVoice ? 'voice' : 'text'} message content before sending.`,
        variant: "destructive"
      });
      return;
    }
    
    setIsSending(true);
    
    if (selectedInfluencersCount > 1) {
      setIsBulkSending(true);
      setBulkProgress(0);

      // Simulate bulk sending progress
      const interval = setInterval(() => {
        setBulkProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsBulkSending(false);
              setIsSending(false);
              toast({
                title: "Outreach Complete!",
                description: `Successfully sent ${selectedInfluencersCount} personalized ${sendAsVoice ? 'voice' : 'text'} messages.`,
              });
            }, 1000);
            return 100;
          }
          return prev + 20;
        });
      }, 500);
    } else {
      // Single send
      setTimeout(() => {
        setIsSending(false);
        toast({
          title: "Message Sent!",
          description: `Your ${sendAsVoice ? 'voice' : 'text'} outreach message has been sent successfully.`,
        });
      }, 1000);
    }

    // Call the original handlers
    if (sendAsVoice) {
      onSendAsVoice();
    } else {
      onSendAsText();
    }
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

          {/* AI Personalization Info */}
          {selectedInfluencersCount > 1 && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">AI Bulk Personalization</span>
              </div>
              <p className="text-sm text-purple-800">
                Each {sendAsVoice ? 'voice' : 'text'} message will be automatically personalized for individual influencers based on their profile, niche, and engagement style.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <SendButton
        selectedInfluencersCount={selectedInfluencersCount}
        isFormValid={isFormValid}
        isSending={isSending}
        onSend={handleSend}
      />

      {/* Bulk Messaging Progress */}
      <BulkMessagingProgress
        isActive={isBulkSending}
        progress={bulkProgress}
        completed={Math.floor(bulkProgress / 100 * selectedInfluencersCount)}
        total={selectedInfluencersCount}
        platformBreakdown={platformBreakdown}
      />
    </div>
  );
};

export default MessageComposer;
