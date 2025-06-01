
import { useState } from "react";
import InfluencerSelector from "./InfluencerSelector";
import MessageComposer from "./MessageComposer";
import { InfluencerSelection } from "@/types/outreach";
import { useOutreachMessageHandlers } from "@/hooks/useOutreachMessageHandlers";

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

  const { handleSendAsText, handleSendAsVoice } = useOutreachMessageHandlers({
    transformedInfluencers,
    selectedInfluencers,
    onClearSelectedInfluencers
  });

  const onSendAsText = () => handleSendAsText(message);
  const onSendAsVoice = () => handleSendAsVoice(message);

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
        onSendAsText={onSendAsText}
        onSendAsVoice={onSendAsVoice}
      />
    </div>
  );
};

export default OutreachPageContent;
