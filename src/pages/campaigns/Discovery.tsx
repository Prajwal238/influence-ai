
import { useState } from "react";
import CampaignLayout from "@/components/layout/CampaignLayout";
import DiscoveryFilters from "@/components/discovery/DiscoveryFilters";
import DiscoveryResults from "@/components/discovery/DiscoveryResults";
import NoResults from "@/components/discovery/NoResults";
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
        <div className="w-full max-w-none px-4 sm:px-6 md:px-8 py-2">
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
        <div className="w-full max-w-none px-4 sm:px-6 md:px-8 py-2">
          <div className="flex items-center justify-center py-8">
            <p className="text-red-500">Error loading influencers: {error}</p>
          </div>
        </div>
      </CampaignLayout>
    );
  }

  return (
    <CampaignLayout>
      <div className="w-full max-w-none h-screen flex flex-col">
        {/* Main content container with fixed height */}
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 py-2 flex-1 flex flex-col">
          
          {/* Search, Toggle, and Filters - no header */}
          <div className="mb-3 flex-shrink-0">
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

          {/* Scrollable Influencer Results Container - takes remaining space */}
          <div className="flex-1 min-h-0">
            <ScrollArea className="h-full">
              <div className="pb-2">
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
        </div>

        {/* Fixed AI Recommendations at bottom - always visible */}
        <div className="w-full bg-white border-t border-gray-200 flex-shrink-0">
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 py-2">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AI</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">AI-Powered Search</p>
                    <p className="text-xs text-blue-700">Get recommendations based on your campaign.</p>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-700 transition-colors whitespace-nowrap">
                  Search Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CampaignLayout>
  );
};

export default Discovery;
