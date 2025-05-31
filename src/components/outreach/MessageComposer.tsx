
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, Volume2, Globe, Play, MessageSquare, Mic, AlertCircle, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BulkMessagingProgress from "./BulkMessagingProgress";

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
      onMessageChange(`Hi {name},

I hope this message finds you well! I'm reaching out on behalf of our Summer Fashion 2024 campaign. We've been following your amazing content in the ${selectedPlatform === 'instagram' ? 'fashion' : 'lifestyle'} space and would love to collaborate with you.

Our campaign focuses on sustainable summer fashion, and we believe your authentic voice and engaged audience would be a perfect fit for our brand values.

Would you be interested in discussing a potential partnership? We'd love to share more details about the collaboration and compensation.

Looking forward to hearing from you!

Best regards,
Campaign Team`);
      setIsGenerating(false);
    }, 2000);
  };

  const handlePreviewVoice = () => {
    toast({
      title: "Voice Preview",
      description: `Playing voice preview in ${voiceLanguage}...`,
    });
  };

  const handleSend = async () => {
    if (selectedInfluencersCount === 0) return;
    
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
                description: `Successfully sent ${selectedInfluencersCount} personalized messages.`,
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
          description: "Your outreach message has been sent successfully.",
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

  const isFormValid = message.trim() && selectedInfluencersCount > 0;

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
          {/* Template Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Message Template
            </label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a message template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="first-reach">First Reach Out</SelectItem>
                <SelectItem value="follow-up">Follow Up</SelectItem>
                <SelectItem value="collaboration">Collaboration Proposal</SelectItem>
                <SelectItem value="thank-you">Thank You Message</SelectItem>
                <SelectItem value="custom">Custom Message</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message Type Toggle */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Message Type
            </label>
            <div className="flex space-x-2">
              <Button 
                variant={!sendAsVoice ? "default" : "outline"}
                size="sm"
                onClick={() => setSendAsVoice(false)}
                className="flex items-center space-x-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Text Message</span>
              </Button>
              <Button 
                variant={sendAsVoice ? "default" : "outline"}
                size="sm"
                onClick={() => setSendAsVoice(true)}
                className="flex items-center space-x-2"
              >
                <Mic className="h-4 w-4" />
                <span>Voice Message</span>
              </Button>
            </div>
          </div>

          {/* Text Message Composition */}
          {!sendAsVoice && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Message Content
                </label>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleGenerateWithAI}
                  disabled={isGenerating}
                  className="flex items-center space-x-2"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{isGenerating ? 'Generating...' : 'Generate with AI'}</span>
                </Button>
              </div>
              <Textarea 
                value={message}
                onChange={(e) => onMessageChange(e.target.value)}
                className="min-h-32 resize-none"
                placeholder="Write your message..."
              />
              <p className="text-xs text-gray-500">
                Use variables like {"{name}"}, {"{followers}"}, and {"{niche}"} for personalization
              </p>
            </div>
          )}

          {/* Voice Message Composition */}
          {sendAsVoice && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Voice Message Content
                </label>
                <Input
                  value={voiceMessage}
                  onChange={(e) => setVoiceMessage(e.target.value)}
                  placeholder="Type message in English"
                  className="w-full"
                />
              </div>
              
              <div className="flex space-x-3">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Voice Language
                  </label>
                  <Select value={voiceLanguage} onValueChange={setVoiceLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button 
                    variant="outline"
                    onClick={handlePreviewVoice}
                    disabled={!voiceMessage.trim()}
                    className="flex items-center space-x-2"
                  >
                    <Volume2 className="h-4 w-4" />
                    <span>Preview Voice</span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Target Languages */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Target Languages
            </label>
            <div className="flex flex-wrap gap-2">
              {["english", "spanish", "french", "german"].map((lang) => (
                <Button
                  key={lang}
                  variant={selectedTargetLanguages.includes(lang) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedTargetLanguages(prev => 
                      prev.includes(lang) 
                        ? prev.filter(l => l !== lang)
                        : [...prev, lang]
                    );
                  }}
                  className="capitalize flex items-center space-x-1"
                >
                  <Globe className="h-3 w-3" />
                  <span>{lang}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* AI Personalization Info */}
          {selectedInfluencersCount > 1 && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">AI Bulk Personalization</span>
              </div>
              <p className="text-sm text-purple-800">
                Each message will be automatically personalized for individual influencers based on their profile, niche, and engagement style.
              </p>
            </div>
          )}

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
        </CardContent>
      </Card>

      {/* Send Button */}
      <div className="sticky bottom-6 z-10">
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base font-medium shadow-lg"
          onClick={handleSend}
          disabled={!isFormValid || isSending}
        >
          <Send className="h-4 w-4 mr-2" />
          {isSending ? 'Sending...' : 
           selectedInfluencersCount > 1 ? `Send to ${selectedInfluencersCount} Influencers` : 
           'Send Outreach Message'}
        </Button>
      </div>

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
