
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCampaigns } from "@/hooks/useCampaigns";
import CampaignCard from "./CampaignCard";
import { Folder, Search } from "lucide-react";

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
        campaign.targetAudience.location.toLowerCase().includes(query) ||
        campaign.targetAudience.gender.toLowerCase().includes(query) ||
        campaign.targetAudience.ageRange.toLowerCase().includes(query) ||
        campaign.targetAudience.interests.some(interest => 
          interest.toLowerCase().includes(query)
        ) ||
        campaign.preferredPlatforms.some(platform => 
          platform.toLowerCase().includes(query)
        ) ||
        campaign.languages.some(language => 
          language.toLowerCase().includes(query)
        )
      );
    });
  }, [campaigns, searchQuery]);

  if (isLoading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm shadow-sm border-gray-200/60 rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
              <Folder className="h-5 w-5 text-blue-600" />
            </div>
            Active Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-100 rounded-xl"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm shadow-sm border-gray-200/60 rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
              <Folder className="h-5 w-5 text-blue-600" />
            </div>
            Active Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-600 p-6 text-center rounded-xl bg-red-50 border border-red-200">
            <p className="font-medium">Unable to load campaigns</p>
            <p className="text-sm text-red-500 mt-1">{error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const displayCampaigns = filteredCampaigns || [];
  const hasSearchQuery = searchQuery.trim().length > 0;

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-sm border-gray-200/60 rounded-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
            {hasSearchQuery ? (
              <Search className="h-5 w-5 text-blue-600" />
            ) : (
              <Folder className="h-5 w-5 text-blue-600" />
            )}
          </div>
          {hasSearchQuery ? `Search Results (${displayCampaigns.length})` : 'Active Campaigns'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-3 pr-4">
            {displayCampaigns && displayCampaigns.length > 0 ? (
              displayCampaigns.map((campaign) => (
                <CampaignCard key={campaign._id} campaign={campaign} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="p-4 rounded-full bg-gray-100 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  {hasSearchQuery ? (
                    <Search className="h-8 w-8 text-gray-400" />
                  ) : (
                    <Folder className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {hasSearchQuery ? 'No results found' : 'No campaigns yet'}
                </h3>
                <p className="text-gray-600 max-w-sm mx-auto">
                  {hasSearchQuery 
                    ? `No campaigns found matching "${searchQuery}". Try a different search term.`
                    : "Create your first campaign to get started with influencer marketing automation."
                  }
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CampaignsList;
