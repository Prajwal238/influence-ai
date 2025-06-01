
import { useState } from "react";
import InfluencerSelector from "./InfluencerSelector";
import MessageComposer from "./MessageComposer";
import { InfluencerSelection } from "@/types/outreach";
import { useOutreachData } from "@/hooks/useOutreachData";

interface OutreachInfluencer {
  id: number;
  name: string;
  handle: string;
  followers: string;
  niche: string;
  platforms: string[];
}

interface OutreachPageContentProps {
  transformedInfluencers: OutreachInfluencer[];
  selectedInfluencers: InfluencerSelection[];
  onUpdateSelection: (influencerId: number, platform: string) => void;
  onRemoveSelection: (influencerId: number) => void;
  onClearSelectedInfluencers: () => void;
}

const OutreachPageContent = ({
  transformedInfluencers,
  selectedInfluencers,
  onUpdateSelection,
  onRemoveSelection,
  onClearSelectedInfluencers
}: OutreachPageContentProps) => {
  const [message, setMessage] = useState("Hi {name},\n\nI hope this message finds you well! I'm reaching out on behalf of our brand regarding a potential collaboration...");
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");

  const { addOutreachEntry } = useOutreachData();

  const handleSendAsText = () => {
    console.log("Sending message as text:", message);
    console.log("Selected influencers:", selectedInfluencers);
    
    // Add outreach entries for selected influencers
    selectedInfluencers.forEach(selection => {
      const influencer = transformedInfluencers.find(inf => inf.id === selection.influencerId);
      if (influencer) {
        addOutreachEntry({
          influencer: influencer.name,
          handle: influencer.handle,
          status: "sent",
          sentAt: "Just now",
          template: "Custom Message",
          platform: selection.platform as any,
          influencerId: influencer.id
        });
      }
    });

    // Clear selected influencers after sending
    onClearSelectedInfluencers();
  };

  const handleSendAsVoice = () => {
    console.log("Sending message as voice:", message);
    console.log("Selected influencers:", selectedInfluencers);
    
    // Add outreach entries for selected influencers
    selectedInfluencers.forEach(selection => {
      const influencer = transformedInfluencers.find(inf => inf.id === selection.influencerId);
      if (influencer) {
        addOutreachEntry({
          influencer: influencer.name,
          handle: influencer.handle,
          status: "sent",
          sentAt: "Just now",
          template: "Voice Message",
          platform: selection.platform as any,
          influencerId: influencer.id
        });
      }
    });

    // Clear selected influencers after sending
    onClearSelectedInfluencers();
  };

  return (
    <div className="flex-1 max-w-4xl space-y-8">
      <InfluencerSelector
        availableInfluencers={transformedInfluencers}
        selectedInfluencers={selectedInfluencers}
        onUpdateSelection={onUpdateSelection}
        onRemoveSelection={onRemoveSelection}
      />

      <MessageComposer
        message={message}
        onMessageChange={setMessage}
        selectedPlatform={selectedPlatform}
        selectedInfluencersCount={selectedInfluencers.length}
        onSendAsText={handleSendAsText}
        onSendAsVoice={handleSendAsVoice}
      />
    </div>
  );
};

export default OutreachPageContent;
