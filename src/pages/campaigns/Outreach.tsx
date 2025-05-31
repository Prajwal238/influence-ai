
import { useState } from "react";
import CampaignLayout from "@/components/layout/CampaignLayout";
import AgentPanel from "@/components/agents/AgentPanel";
import InfluencerSelector from "@/components/outreach/InfluencerSelector";
import MessageComposer from "@/components/outreach/MessageComposer";
import OutreachLog from "@/components/outreach/OutreachLog";
import OutreachStats from "@/components/outreach/OutreachStats";
import { useOutreachData } from "@/hooks/useOutreachData";

const Outreach = () => {
  const [message, setMessage] = useState("Hi {name},\n\nI hope this message finds you well! I'm reaching out on behalf of our brand regarding a potential collaboration...");
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");
  const [selectedInfluencers, setSelectedInfluencers] = useState<number[]>([]);

  const { influencers, outreachLog, addOutreachEntry } = useOutreachData();

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
    
    // Add outreach entries for selected influencers
    selectedInfluencers.forEach(influencerId => {
      const influencer = influencers.find(inf => inf.id === influencerId);
      if (influencer) {
        addOutreachEntry({
          influencer: influencer.name,
          handle: influencer.handle,
          status: "sent",
          sentAt: "Just now",
          template: "Custom Message",
          platform: selectedPlatform as any,
          influencerId: influencer.id
        });
      }
    });

    // Clear selected influencers after sending
    setSelectedInfluencers([]);
  };

  const handleSendAsVoice = () => {
    console.log("Sending message as voice:", message);
    console.log("Selected influencers:", selectedInfluencers);
    
    // Add outreach entries for selected influencers
    selectedInfluencers.forEach(influencerId => {
      const influencer = influencers.find(inf => inf.id === influencerId);
      if (influencer) {
        addOutreachEntry({
          influencer: influencer.name,
          handle: influencer.handle,
          status: "sent",
          sentAt: "Just now",
          template: "Voice Message",
          platform: selectedPlatform as any,
          influencerId: influencer.id
        });
      }
    });

    // Clear selected influencers after sending
    setSelectedInfluencers([]);
  };

  return (
    <CampaignLayout>
      <div className="flex gap-8">
        {/* Main Content - Left Side */}
        <div className="flex-1 max-w-4xl space-y-8">
          <InfluencerSelector
            availableInfluencers={influencers}
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

        {/* Sidebar - Right Side */}
        <div className="hidden lg:block w-80 space-y-6">
          <div className="sticky top-8">
            <div className="space-y-6">
              <OutreachStats />
              <OutreachLog outreachLog={outreachLog} />
            </div>
          </div>
        </div>
      </div>

      {/* Agent Panel */}
      <AgentPanel agentName="Outreach Agent" agentType="outreach" />
    </CampaignLayout>
  );
};

export default Outreach;
