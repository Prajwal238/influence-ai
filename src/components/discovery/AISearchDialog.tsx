
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import DiscoveryResults from "./DiscoveryResults";
import { Influencer, ApiInfluencer } from "@/types/influencer";
import { transformApiDataToInfluencer } from "@/utils/influencerTransforms";

interface AISearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaignId: string;
  isInCampaign: (influencer: Influencer) => boolean;
  onAddToCampaign: (influencer: Influencer) => Promise<boolean>;
  onRemoveFromCampaign: (influencer: Influencer) => Promise<boolean>;
}

const AISearchDialog = ({
  open,
  onOpenChange,
  campaignId,
  isInCampaign,
  onAddToCampaign,
  onRemoveFromCampaign
}: AISearchDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Calling AI search API for campaign:', campaignId);
      const response = await fetch(`http://localhost:5000/api/user_123/campaigns/${campaignId}/influencers/llm`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch AI recommendations');
      }
      
      const apiInfluencers: ApiInfluencer[] = await response.json();
      console.log('AI search results:', apiInfluencers.length, 'influencers');
      
      // Transform API data to our influencer format
      const transformedInfluencers = apiInfluencers.map(data => 
        transformApiDataToInfluencer(data, false)
      );
      
      setInfluencers(transformedInfluencers);
    } catch (err) {
      console.error('Error fetching AI recommendations:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Call the API when dialog opens
  useState(() => {
    if (open && influencers.length === 0) {
      handleSearch();
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>AI-Powered Influencer Recommendations</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 min-h-0">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-gray-600">Finding perfect influencer matches...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-red-600 mb-4">Error: {error}</p>
                <button 
                  onClick={handleSearch}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : influencers.length > 0 ? (
            <ScrollArea className="h-full">
              <div className="p-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    Found {influencers.length} AI-recommended influencers based on your campaign
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
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No recommendations found</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AISearchDialog;
