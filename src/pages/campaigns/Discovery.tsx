
import { useState } from "react";
import CampaignLayout from "@/components/layout/CampaignLayout";
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <DiscoveryHeader />
            <div className="flex items-center justify-center py-32">
              <div className="text-center space-y-6">
                <div className="relative mx-auto w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-800">Discovering amazing creators...</p>
                  <p className="text-sm text-gray-500">Finding the perfect match for your campaign</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CampaignLayout>
    );
  }

  if (error) {
    return (
      <CampaignLayout>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <DiscoveryHeader />
            <div className="flex items-center justify-center py-32">
              <div className="text-center space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-red-100 shadow-lg max-w-md">
                <div className="w-12 h-12 mx-auto bg-red-50 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-red-800">Unable to load creators</p>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CampaignLayout>
    );
  }

  return (
    <CampaignLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
          {/* Header */}
          <DiscoveryHeader />

          {/* Search and Filters */}
          <DiscoveryFilters 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            showCampaignInfluencers={showCampaignInfluencers}
            onToggleChange={setShowCampaignInfluencers}
            activeFilters={activeFilters}
            onFilterAdd={handleFilterAdd}
            onFilterRemove={handleFilterRemove}
          />

          {/* Results Container */}
          <div className="space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100/60">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-gray-900">
                  {showCampaignInfluencers ? 'Your Campaign Creators' : 'Discover Creators'}
                </h2>
                <p className="text-sm text-gray-600">
                  {filteredInfluencers.length} {filteredInfluencers.length === 1 ? 'creator' : 'creators'} found
                  {searchQuery && (
                    <span className="ml-1 text-blue-600 font-medium">
                      for "{searchQuery}"
                    </span>
                  )}
                </p>
              </div>
              
              {campaignInfluencers.length > 0 && (
                <div className="bg-blue-50/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-blue-200/60">
                  <span className="text-xs font-semibold text-blue-700">
                    {campaignInfluencers.length} in campaign
                  </span>
                </div>
              )}
            </div>

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

          {/* AI Recommendations */}
          {!showCampaignInfluencers && (
            <AIRecommendations 
              isInCampaign={isInCampaign}
              onAddToCampaign={handleAddToCampaign}
              onRemoveFromCampaign={handleRemoveFromCampaign}
            />
          )}
        </div>
      </div>
    </CampaignLayout>
  );
};

export default Discovery;
