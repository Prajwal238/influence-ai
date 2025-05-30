import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CampaignLayout from "@/components/layout/CampaignLayout";
import AgentPanel from "@/components/agents/AgentPanel";
import { Send, Play, Globe, MessageSquare, Clock, CheckCircle, XCircle, Instagram, Mail, Phone, Volume2, Users, Check } from "lucide-react";

const Outreach = () => {
  const [message, setMessage] = useState("Hi {name},\n\nI hope this message finds you well! I'm reaching out on behalf of our brand regarding a potential collaboration...");
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");
  const [selectedInfluencers, setSelectedInfluencers] = useState<number[]>([]);

  const availableInfluencers = [
    {
      id: 1,
      name: "Sarah Johnson",
      handle: "@sarahjohnson",
      followers: "125K",
      niche: "Fashion"
    },
    {
      id: 2,
      name: "Mike Chen",
      handle: "@mikechen",
      followers: "89K",
      niche: "Tech"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      handle: "@emmarodriguez",
      followers: "200K",
      niche: "Lifestyle"
    },
  ];

  const outreachLog = [
    {
      id: 1,
      influencer: "Sarah Johnson",
      handle: "@sarahjohnson",
      status: "sent",
      sentAt: "2 hours ago",
      template: "Fashion Collaboration",
      platform: "instagram"
    },
    {
      id: 2,
      influencer: "Mike Chen", 
      handle: "@mikechen",
      status: "pending",
      sentAt: "1 day ago",
      template: "Tech Partnership",
      platform: "email"
    },
    {
      id: 3,
      influencer: "Emma Rodriguez",
      handle: "@emmarodriguez", 
      status: "replied",
      sentAt: "3 hours ago",
      template: "Lifestyle Brand",
      platform: "whatsapp"
    },
  ];

  const toggleInfluencerSelection = (influencerId: number) => {
    setSelectedInfluencers(prev => 
      prev.includes(influencerId) 
        ? prev.filter(id => id !== influencerId)
        : [...prev, influencerId]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "replied": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "declined": return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent": return "bg-yellow-100 text-yellow-800";
      case "replied": return "bg-green-100 text-green-800";
      case "declined": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram": return <Instagram className="h-3 w-3" />;
      case "email": return <Mail className="h-3 w-3" />;
      case "whatsapp": return <Phone className="h-3 w-3" />;
      default: return <MessageSquare className="h-3 w-3" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "instagram": return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
      case "email": return "bg-blue-500 text-white";
      case "whatsapp": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const handleSendAsText = () => {
    console.log("Sending message as text:", message);
    console.log("Selected influencers:", selectedInfluencers);
    // Add text sending logic here
  };

  const handleSendAsVoice = () => {
    console.log("Sending message as voice:", message);
    console.log("Selected influencers:", selectedInfluencers);
    // Add voice sending logic here
  };

  return (
    <CampaignLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message Composer */}
        <div className="lg:col-span-2 space-y-6">
          {/* Influencer Selection */}
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Select Influencers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {availableInfluencers.map((influencer) => (
                  <div 
                    key={influencer.id}
                    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedInfluencers.includes(influencer.id) 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => toggleInfluencerSelection(influencer.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{influencer.name}</h4>
                        <p className="text-xs text-gray-600">{influencer.handle} • {influencer.followers} • {influencer.niche}</p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selectedInfluencers.includes(influencer.id) 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-300'
                    }`}>
                      {selectedInfluencers.includes(influencer.id) && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {selectedInfluencers.length > 0 && (
                <p className="text-sm text-blue-600 mt-3">
                  {selectedInfluencers.length} influencer{selectedInfluencers.length > 1 ? 's' : ''} selected
                </p>
              )}
            </CardContent>
          </Card>

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
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
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
                    onClick={() => setSelectedLanguage("english")}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    English
                  </Button>
                  <Button 
                    variant={selectedLanguage === "spanish" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLanguage("spanish")}
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
                  onChange={(e) => setMessage(e.target.value)}
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
                    onClick={handleSendAsText}
                    disabled={selectedInfluencers.length === 0}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send as Text
                  </Button>
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700 flex-1"
                    onClick={handleSendAsVoice}
                    disabled={selectedInfluencers.length === 0}
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Send as Voice
                  </Button>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  {selectedInfluencers.length === 0 
                    ? "Select influencers to send messages" 
                    : `Ready to send to ${selectedInfluencers.length} selected influencer${selectedInfluencers.length > 1 ? 's' : ''}`
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Outreach Log */}
        <div>
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Outreach Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {outreachLog.map((entry) => (
                  <div key={entry.id} className="border border-gray-100 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{entry.influencer}</h4>
                        <p className="text-xs text-gray-600">{entry.handle}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(entry.status)}
                        <Badge className={getStatusColor(entry.status)}>
                          {entry.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        <p>{entry.template}</p>
                        <p>Sent {entry.sentAt}</p>
                      </div>
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(entry.platform)}`}>
                        {getPlatformIcon(entry.platform)}
                        <span className="capitalize">{entry.platform}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-white shadow-sm border-gray-200 mt-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Messages Sent</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Reply Rate</span>
                  <span className="font-medium">67%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Positive Responses</span>
                  <span className="font-medium">14</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Agent Panel */}
      <AgentPanel agentName="Outreach Agent" agentType="outreach" />
    </CampaignLayout>
  );
};

export default Outreach;
