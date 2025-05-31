
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
import { useInfluencerTabs } from "@/hooks/useInfluencerTabs";
import { useToast } from "@/hooks/use-toast";

const Discovery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCampaignInfluencers, setShowCampaignInfluencers] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { toast } = useToast();

  const { 
    allInfluencers, 
    campaignInfluencers, 
    loading, 
    error, 
    addToCampaign, 
    removeFromCampaign, 
    isInCampaign 
  } = useInfluencerTabs();

  const filteredInfluencers = useInfluencerFiltering({
    influencers: allInfluencers,
    campaignInfluencers,
    searchQuery,
    showCampaignInfluencers,
    activeFilters
  });

  const handleAddToCampaign = async (influencer: any) => {
    const success = await addToCampaign(influencer);
    if (success) {
      toast({
        title: "Success",
        description: `${influencer.name} added to campaign`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to add influencer to campaign",
        variant: "destructive",
      });
    }
    return success;
  };

  const handleRemoveFromCampaign = async (influencer: any) => {
    const success = await removeFromCampaign(influencer);
    if (success) {
      toast({
        title: "Success",
        description: `${influencer.name} removed from campaign`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to remove influencer from campaign",
        variant: "destructive",
      });
    }
    return success;
  };

  const handleFilterAdd = (filter: string) => {
    setActiveFilters(prev => [...prev, filter]);
  };

  const handleFilterRemove = (filter: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filter));
  };

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
      <div className="flex flex-col h-[calc(100vh-240px)] space-y-4">
        {/* Header */}
        <div className="flex-shrink-0">
          <DiscoveryHeader />
        </div>

        {/* Search, Filters, and Toggle */}
        <div className="flex-shrink-0">
          <DiscoveryFilters 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            showCampaignInfluencers={showCampaignInfluencers}
            onToggleChange={setShowCampaignInfluencers}
            activeFilters={activeFilters}
            onFilterAdd={handleFilterAdd}
            onFilterRemove={handleFilterRemove}
          />
        </div>

        {/* Scrollable Results Container */}
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full">
            <div className="pr-4 pb-4">
              {/* Results */}
              {filteredInfluencers.length > 0 ? (
                <DiscoveryResults 
                  influencers={filteredInfluencers}
                  isInCampaign={isInCampaign}
                  onAddToCampaign={handleAddToCampaign}
                  onRemoveFromCampaign={handleRemoveFromCampaign}
                  showCampaignInfluencers={showCampaignInfluencers}
                />
              ) : (
                <NoResults />
              )}
            </div>
          </ScrollArea>
        </div>

        {/* AI Recommendations - Fixed at bottom */}
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
