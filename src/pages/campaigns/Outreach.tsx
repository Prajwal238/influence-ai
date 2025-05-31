
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CampaignLayout from "@/components/layout/CampaignLayout";
import AgentPanel from "@/components/agents/AgentPanel";
import InfluencerSelector from "@/components/outreach/InfluencerSelector";
import MessageComposer from "@/components/outreach/MessageComposer";
import OutreachLog from "@/components/outreach/OutreachLog";
import OutreachStats from "@/components/outreach/OutreachStats";
import { useOutreachData } from "@/hooks/useOutreachData";
import { transformApiDataToOutreachInfluencer } from "@/utils/outreachTransforms";
import { InfluencerSelection } from "@/types/outreach";

const Outreach = () => {
  const [message, setMessage] = useState("Hi {name},\n\nI hope this message finds you well! I'm reaching out on behalf of our brand regarding a potential collaboration...");
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");
  const [selectedInfluencers, setSelectedInfluencers] = useState<InfluencerSelection[]>([]);
  const [apiInfluencers, setApiInfluencers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id: campaignId } = useParams();
  const { outreachLog, addOutreachEntry } = useOutreachData();

  // Fetch influencers from API
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/user_123/campaigns/${campaignId}/outreach_seed`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch influencers');
        }
        
        const data = await response.json();
        console.log('Outreach API response:', data);
        setApiInfluencers(data.influencers || []);
      } catch (err) {
        console.error('Error fetching outreach influencers:', err);
        setError(err instanceof Error ? err.message : 'Failed to load influencers');
      } finally {
        setLoading(false);
      }
    };

    if (campaignId) {
      fetchInfluencers();
    }
  }, [campaignId]);

  // Transform API data to component format
  const transformedInfluencers = apiInfluencers.map((apiInfluencer, index) => 
    transformApiDataToOutreachInfluencer(apiInfluencer, index + 1)
  );

  const updateInfluencerSelection = (influencerId: number, platform: string) => {
    setSelectedInfluencers(prev => {
      const existingIndex = prev.findIndex(sel => sel.influencerId === influencerId);
      if (existingIndex >= 0) {
        // Update existing selection
        const updated = [...prev];
        updated[existingIndex] = { influencerId, platform };
        return updated;
      } else {
        // Add new selection
        return [...prev, { influencerId, platform }];
      }
    });
  };

  const removeInfluencerSelection = (influencerId: number) => {
    setSelectedInfluencers(prev => prev.filter(sel => sel.influencerId !== influencerId));
  };

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
    setSelectedInfluencers([]);
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
    setSelectedInfluencers([]);
  };

  if (loading) {
    return (
      <CampaignLayout>
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">Loading influencers...</p>
        </div>
      </CampaignLayout>
    );
  }

  if (error) {
    return (
      <CampaignLayout>
        <div className="flex items-center justify-center py-12">
          <p className="text-red-500">Error loading influencers: {error}</p>
        </div>
      </CampaignLayout>
    );
  }

  return (
    <CampaignLayout>
      <div className="flex gap-8">
        {/* Main Content - Left Side */}
        <div className="flex-1 max-w-4xl space-y-8">
          <InfluencerSelector
            availableInfluencers={transformedInfluencers}
            selectedInfluencers={selectedInfluencers}
            onUpdateSelection={updateInfluencerSelection}
            onRemoveSelection={removeInfluencerSelection}
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
