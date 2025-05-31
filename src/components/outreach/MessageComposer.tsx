
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Send, Play, Globe, Instagram, Mail, Phone, Volume2, Users, Sparkles } from "lucide-react";
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
  const [isBulkSending, setIsBulkSending] = useState(false);
  const [bulkProgress, setBulkProgress] = useState(0);

  // Mock platform breakdown for demonstration
  const platformBreakdown = {
    instagram: { sent: 2, total: 3 },
    email: { sent: 1, total: 2 },
    whatsapp: { sent: 0, total: 1 }
  };

  const handleBulkSend = async (type: 'text' | 'voice') => {
    setIsBulkSending(true);
    setBulkProgress(0);

    // Simulate bulk sending progress
    const interval = setInterval(() => {
      setBulkProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsBulkSending(false), 1000);
          return 100;
        }
        return prev + 20;
      });
    }, 500);

    // Call the original handlers
    if (type === 'text') {
      onSendAsText();
    } else {
      onSendAsVoice();
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-white shadow-sm border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-900">
              Bulk Outreach Message
            </CardTitle>
            {selectedInfluencersCount > 1 && (
              <Badge className="bg-blue-600 text-white flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>Bulk Mode</span>
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Platform Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Platform
            </label>
            <Select value={selectedPlatform} onValueChange={onPlatformChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instagram">
                  <div className="flex items-center space-x-2">
                    <Instagram className="h-4 w-4" />
                    <span>Instagram</span>
                  </div>
                </SelectItem>
                <SelectItem value="email">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </div>
                </SelectItem>
                <SelectItem value="whatsapp">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Template Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message Template
            </label>
            <Select defaultValue="fashion">
              <SelectTrigger>
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fashion">Fashion Collaboration</SelectItem>
                <SelectItem value="tech">Tech Partnership</SelectItem>
                <SelectItem value="lifestyle">Lifestyle Brand</SelectItem>
                <SelectItem value="custom">Custom Message</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Language Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <div className="flex space-x-2">
              <Button 
                variant={selectedLanguage === "english" ? "default" : "outline"}
                size="sm"
                onClick={() => onLanguageChange("english")}
              >
                <Globe className="h-4 w-4 mr-2" />
                English
              </Button>
              <Button 
                variant={selectedLanguage === "spanish" ? "default" : "outline"}
                size="sm"
                onClick={() => onLanguageChange("spanish")}
              >
                <Globe className="h-4 w-4 mr-2" />
                Spanish
              </Button>
            </div>
          </div>

          {/* Message Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message Content
            </label>
            <Textarea 
              value={message}
              onChange={(e) => onMessageChange(e.target.value)}
              className="min-h-32"
              placeholder="Compose your outreach message..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Use variables like {"{name}"}, {"{followers}"}, and {"{niche}"} for personalization
            </p>
          </div>

          {/* AI Personalization Preview */}
          {selectedInfluencersCount > 1 && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">AI Bulk Personalization</span>
              </div>
              <p className="text-sm text-purple-800">
                Each message will be automatically personalized for individual influencers based on their profile, niche, and engagement style.
              </p>
            </div>
          )}

          {/* Voice Preview */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Play className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">AI Voice Preview</span>
            </div>
            <p className="text-sm text-blue-800">
              Voice messages will use AI tone matching for each influencer's communication style
            </p>
          </div>

          {/* Send Options */}
          <div className="space-y-3">
            <div className="flex space-x-3">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 flex-1"
                onClick={() => handleBulkSend('text')}
                disabled={selectedInfluencersCount === 0 || isBulkSending}
              >
                <Send className="h-4 w-4 mr-2" />
                {selectedInfluencersCount > 1 ? 'Bulk Send Text' : 'Send as Text'}
              </Button>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 flex-1"
                onClick={() => handleBulkSend('voice')}
                disabled={selectedInfluencersCount === 0 || isBulkSending}
              >
                <Volume2 className="h-4 w-4 mr-2" />
                {selectedInfluencersCount > 1 ? 'Bulk Send Voice' : 'Send as Voice'}
              </Button>
            </div>
            <p className="text-xs text-gray-500 text-center">
              {selectedInfluencersCount === 0 
                ? "Select influencers to send messages" 
                : selectedInfluencersCount === 1
                ? `Ready to send to 1 selected influencer`
                : `Ready to bulk send to ${selectedInfluencersCount} selected influencers across platforms`
              }
            </p>
          </div>
        </CardContent>
      </Card>

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
