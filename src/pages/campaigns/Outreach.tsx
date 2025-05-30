
import { useState } from "react";
import CampaignLayout from "@/components/layout/CampaignLayout";
import AgentPanel from "@/components/agents/AgentPanel";
import InfluencerSelector from "@/components/outreach/InfluencerSelector";
import MessageComposer from "@/components/outreach/MessageComposer";
import OutreachLog from "@/components/outreach/OutreachLog";
import OutreachStats from "@/components/outreach/OutreachStats";

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
          <InfluencerSelector
            availableInfluencers={availableInfluencers}
            selectedInfluencers={selectedInfluencers}
            onToggleInfluencer={toggleInfluencerSelection}
          />

          <MessageComposer
            message={message}
            onMessageChange={setMessage}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            selectedPlatform={selectedPlatform}
            onPlatformChange={setSelectedPlatform}
            selectedInfluencersCount={selectedInfluencers.length}
            onSendAsText={handleSendAsText}
            onSendAsVoice={handleSendAsVoice}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <OutreachLog outreachLog={outreachLog} />
          <OutreachStats />
        </div>
      </div>

      {/* Agent Panel */}
      <AgentPanel agentName="Outreach Agent" agentType="outreach" />
    </CampaignLayout>
  );
};

export default Outreach;
