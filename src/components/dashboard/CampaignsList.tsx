
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCampaigns } from "@/hooks/useCampaigns";
import CampaignCard from "./CampaignCard";

interface CampaignsListProps {
  searchQuery: string;
}

const CampaignsList = ({ searchQuery }: CampaignsListProps) => {
  const { data: campaigns, isLoading, error } = useCampaigns();

  const filteredCampaigns = useMemo(() => {
    if (!campaigns || !searchQuery) return campaigns;
    
    const query = searchQuery.toLowerCase().trim();
    return campaigns.filter((campaign) => {
      return (
        campaign.campaignName.toLowerCase().includes(query) ||
        campaign.objective.toLowerCase().includes(query) ||
        campaign.targetAudience.toLowerCase().includes(query) ||
        campaign.productCategory.toLowerCase().includes(query)
      );
    });
  }, [campaigns, searchQuery]);

  if (isLoading) {
    return (
      <Card className="bg-white shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Active Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-white shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Active Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-600 p-4">
            Error loading campaigns: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  const displayCampaigns = filteredCampaigns || [];
  const hasSearchQuery = searchQuery.trim().length > 0;

  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          {hasSearchQuery ? `Search Results (${displayCampaigns.length})` : 'Active Campaigns'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4 pr-4">
            {displayCampaigns && displayCampaigns.length > 0 ? (
              displayCampaigns.map((campaign) => (
                <CampaignCard key={campaign._id} campaign={campaign} />
              ))
            ) : (
              <div className="text-gray-500 text-center py-8">
                {hasSearchQuery 
                  ? `No campaigns found matching "${searchQuery}". Try a different search term.`
                  : "No campaigns found. Create your first campaign to get started."
                }
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CampaignsList;
