
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Play, Globe, Instagram, Mail, Phone, Volume2 } from "lucide-react";

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
  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          Outreach Message
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Platform Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Platform
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

        {/* Voice Preview */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Play className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">AI Voice Preview</span>
          </div>
          <p className="text-sm text-blue-800">
            This message will be personalized for each influencer using AI tone matching
          </p>
        </div>

        {/* Send Options */}
        <div className="space-y-3">
          <div className="flex space-x-3">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 flex-1"
              onClick={onSendAsText}
              disabled={selectedInfluencersCount === 0}
            >
              <Send className="h-4 w-4 mr-2" />
              Send as Text
            </Button>
            <Button 
              className="bg-purple-600 hover:bg-purple-700 flex-1"
              onClick={onSendAsVoice}
              disabled={selectedInfluencersCount === 0}
            >
              <Volume2 className="h-4 w-4 mr-2" />
              Send as Voice
            </Button>
          </div>
          <p className="text-xs text-gray-500 text-center">
            {selectedInfluencersCount === 0 
              ? "Select influencers to send messages" 
              : `Ready to send to ${selectedInfluencersCount} selected influencer${selectedInfluencersCount > 1 ? 's' : ''}`
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageComposer;
