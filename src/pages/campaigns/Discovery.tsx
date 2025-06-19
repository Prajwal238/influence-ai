
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <DiscoveryHeader />
            <div className="flex items-center justify-center py-24">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 font-medium">Discovering amazing influencers...</p>
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <DiscoveryHeader />
            <div className="flex items-center justify-center py-24">
              <div className="text-center space-y-4 bg-red-50 p-8 rounded-2xl border border-red-200">
                <p className="text-red-600 font-semibold">Error loading influencers</p>
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </CampaignLayout>
    );
  }

  return (
    <CampaignLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
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
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-gray-900">
                  {showCampaignInfluencers ? 'Your Campaign Influencers' : 'Discover Influencers'}
                </h2>
                <p className="text-sm text-gray-600">
                  {filteredInfluencers.length} {filteredInfluencers.length === 1 ? 'influencer' : 'influencers'} found
                </p>
              </div>
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
