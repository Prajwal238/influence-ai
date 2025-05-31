
import { useState } from "react";
import CampaignLayout from "@/components/layout/CampaignLayout";
import AgentPanel from "@/components/agents/AgentPanel";
import DiscoveryFilters from "@/components/discovery/DiscoveryFilters";
import DiscoveryHeader from "@/components/discovery/DiscoveryHeader";
import DiscoveryResults from "@/components/discovery/DiscoveryResults";
import NoResults from "@/components/discovery/NoResults";
import AIRecommendations from "@/components/discovery/AIRecommendations";
import { useInfluencerFiltering } from "@/hooks/useInfluencerFiltering";
import { influencersData } from "@/data/influencersData";

const Discovery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCampaignInfluencers, setShowCampaignInfluencers] = useState(false);

  const filteredInfluencers = useInfluencerFiltering({
    influencers: influencersData,
    searchQuery,
    showCampaignInfluencers
  });

  return (
    <CampaignLayout>
      <div className="space-y-6">
        {/* Header */}
        <DiscoveryHeader />

        {/* Search, Filters, and Toggle */}
        <DiscoveryFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showCampaignInfluencers={showCampaignInfluencers}
          onToggleChange={setShowCampaignInfluencers}
        />

        {/* Results */}
        {filteredInfluencers.length > 0 ? (
          <DiscoveryResults influencers={filteredInfluencers} />
        ) : (
          <NoResults />
        )}

        {/* AI Suggestions */}
        <AIRecommendations />
      </div>

      {/* Agent Panel */}
      <AgentPanel agentName="Discovery Agent" agentType="discovery" />
    </CampaignLayout>
  );
};

export default Discovery;
