
import { useState } from "react";
import InfluencerSelector from "./InfluencerSelector";
import MessageComposer from "./MessageComposer";
import { InfluencerSelection } from "@/types/outreach";
import { useOutreachData } from "@/hooks/useOutreachData";
import { buildApiUrl } from "@/config/api";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const logOutreachAttempt = async (influencerId: number, platform: string, messageType: string) => {
    try {
      const response = await fetch(buildApiUrl('/api/outreach/log'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          host: 'outreach.platform.com', // This would be modified based on platform
          platform: platform,
          influencerId: influencerId,
          messageType: messageType,
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        console.error('Failed to log outreach attempt:', response.statusText);
      } else {
        console.log('Outreach attempt logged successfully for influencer:', influencerId);
      }
    } catch (error) {
      console.error('Error logging outreach attempt:', error);
    }
  };

  const handleSendAsText = async () => {
    console.log("Sending message as text:", message);
    console.log("Selected influencers:", selectedInfluencers);
    
    // Log API calls and add outreach entries for selected influencers
    for (const selection of selectedInfluencers) {
      const influencer = transformedInfluencers.find(inf => inf.id === selection.influencerId);
      if (influencer) {
        // Log the outreach attempt via API
        await logOutreachAttempt(selection.influencerId, selection.platform, 'text');
        
        // Add to local outreach log
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
    }

    // Show success toast
    toast({
      title: "Messages Sent!",
      description: `Successfully sent ${selectedInfluencers.length} text message${selectedInfluencers.length > 1 ? 's' : ''}.`,
    });

    // Clear selected influencers after sending
    onClearSelectedInfluencers();
  };

  const handleSendAsVoice = async () => {
    console.log("Sending message as voice:", message);
    console.log("Selected influencers:", selectedInfluencers);
    
    // Log API calls and add outreach entries for selected influencers
    for (const selection of selectedInfluencers) {
      const influencer = transformedInfluencers.find(inf => inf.id === selection.influencerId);
      if (influencer) {
        // Log the outreach attempt via API
        await logOutreachAttempt(selection.influencerId, selection.platform, 'voice');
        
        // Add to local outreach log
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
    }

    // Show success toast
    toast({
      title: "Voice Messages Sent!",
      description: `Successfully sent ${selectedInfluencers.length} voice message${selectedInfluencers.length > 1 ? 's' : ''}.`,
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
