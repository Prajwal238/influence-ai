
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import DiscoveryResults from "./DiscoveryResults";
import { Influencer } from "@/types/influencer";

interface AISearchResultsProps {
  loading: boolean;
  error: string | null;
  influencers: Influencer[];
  isInCampaign: (influencer: Influencer) => boolean;
  onAddToCampaign: (influencer: Influencer) => Promise<boolean>;
  onRemoveFromCampaign: (influencer: Influencer) => Promise<boolean>;
  onRetry: () => void;
}

const AISearchResults = ({
  loading,
  error,
  influencers,
  isInCampaign,
  onAddToCampaign,
  onRemoveFromCampaign,
  onRetry
}: AISearchResultsProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Finding perfect influencer matches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={onRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (influencers.length > 0) {
    return (
      <ScrollArea className="h-full">
        <div className="p-4">
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Found {influencers.length} AI-recommended influencers
            </p>
          </div>
          <DiscoveryResults
            influencers={influencers}
            isInCampaign={isInCampaign}
            onAddToCampaign={onAddToCampaign}
            onRemoveFromCampaign={onRemoveFromCampaign}
            showCampaignInfluencers={false}
          />
        </div>
      </ScrollArea>
    );
  }

  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-500">No recommendations found</p>
    </div>
  );
};

export default AISearchResults;
