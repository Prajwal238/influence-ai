
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCampaigns } from "@/hooks/useCampaigns";
import CampaignCard from "./CampaignCard";

const CampaignsList = () => {
  const { data: campaigns, isLoading, error } = useCampaigns();

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

  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          Active Campaigns
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4 pr-4">
            {campaigns && campaigns.length > 0 ? (
              campaigns.map((campaign) => (
                <CampaignCard key={campaign._id} campaign={campaign} />
              ))
            ) : (
              <div className="text-gray-500 text-center py-8">
                No campaigns found. Create your first campaign to get started.
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CampaignsList;
