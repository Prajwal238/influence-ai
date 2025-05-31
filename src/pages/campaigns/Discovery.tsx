
import { useState } from "react";
import CampaignLayout from "@/components/layout/CampaignLayout";
import AgentPanel from "@/components/agents/AgentPanel";
import DiscoveryFilters from "@/components/discovery/DiscoveryFilters";
import DiscoveryHeader from "@/components/discovery/DiscoveryHeader";
import DiscoveryResults from "@/components/discovery/DiscoveryResults";
import NoResults from "@/components/discovery/NoResults";
import AIRecommendations from "@/components/discovery/AIRecommendations";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInfluencerFiltering } from "@/hooks/useInfluencerFiltering";
import { useInfluencerData } from "@/hooks/useInfluencerData";

const Discovery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCampaignInfluencers, setShowCampaignInfluencers] = useState(false);

  const { influencers, loading, error } = useInfluencerData();

  const filteredInfluencers = useInfluencerFiltering({
    influencers,
    searchQuery,
    showCampaignInfluencers
  });

  if (loading) {
    return (
      <CampaignLayout>
        <div className="space-y-6">
          <DiscoveryHeader />
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">Loading influencers...</p>
          </div>
        </div>
        <AgentPanel agentName="Discovery Agent" agentType="discovery" />
      </CampaignLayout>
    );
  }

  if (error) {
    return (
      <CampaignLayout>
        <div className="space-y-6">
          <DiscoveryHeader />
          <div className="flex items-center justify-center py-12">
            <p className="text-red-500">Error loading influencers: {error}</p>
          </div>
        </div>
        <AgentPanel agentName="Discovery Agent" agentType="discovery" />
      </CampaignLayout>
    );
  }

  return (
    <CampaignLayout>
      <div className="h-[calc(100vh-200px)] flex flex-col space-y-4">
        {/* Header */}
        <DiscoveryHeader />

        {/* Search, Filters, and Toggle */}
        <DiscoveryFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showCampaignInfluencers={showCampaignInfluencers}
          onToggleChange={setShowCampaignInfluencers}
        />

        {/* Scrollable Results Container */}
        <ScrollArea className="flex-1 min-h-0">
          <div className="pr-4 pb-4">
            {/* Results */}
            {filteredInfluencers.length > 0 ? (
              <DiscoveryResults influencers={filteredInfluencers} />
            ) : (
              <NoResults />
            )}
          </div>
        </ScrollArea>

        {/* AI Recommendations - Compact at bottom */}
        <div className="flex-shrink-0">
          <AIRecommendations />
        </div>
      </div>

      {/* Agent Panel */}
      <AgentPanel agentName="Discovery Agent" agentType="discovery" />
    </CampaignLayout>
  );
};

export default Discovery;
