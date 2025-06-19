
import { useState } from "react";
import CampaignLayout from "@/components/layout/CampaignLayout";
import DiscoveryFilters from "@/components/discovery/DiscoveryFilters";
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

  // Use the appropriate dataset based on toggle state
  const baseInfluencers = showCampaignInfluencers ? campaignInfluencers : allInfluencers;

  const filteredInfluencers = useInfluencerFiltering({
    influencers: baseInfluencers,
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
        <div className="space-y-2">
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-500">Loading influencers...</p>
          </div>
        </div>
      </CampaignLayout>
    );
  }

  if (error) {
    return (
      <CampaignLayout>
        <div className="space-y-2">
          <div className="flex items-center justify-center py-8">
            <p className="text-red-500">Error loading influencers: {error}</p>
          </div>
        </div>
      </CampaignLayout>
    );
  }

  return (
    <CampaignLayout>
      <div className="flex flex-col h-[calc(100vh-160px)] space-y-2">
        {/* Compact Header */}
        <div className="flex-shrink-0">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Influencer Discovery
              </h1>
              <p className="text-xs text-gray-600">
                Find and add influencers to your campaign
              </p>
            </div>
          </div>
        </div>

        {/* Compact Filters */}
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

        {/* Main Content Area - Maximized for table */}
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full">
            <div className="pr-2">
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

        {/* Compact AI Recommendations - Always visible at bottom */}
        <div className="flex-shrink-0">
          <AIRecommendations
            isInCampaign={isInCampaign}
            onAddToCampaign={handleAddToCampaign}
            onRemoveFromCampaign={handleRemoveFromCampaign}
          />
        </div>
      </div>
    </CampaignLayout>
  );
};

export default Discovery;
