
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Heart, Check } from "lucide-react";
import InfluencerDialog from "./InfluencerDialog";
import { useCampaignInfluencers } from "@/hooks/useCampaignInfluencers";

interface Platform {
  name: string;
  handle: string;
  followers: string;
  engagement: string;
  verified: boolean;
  topBrand: string | null;
}

interface Influencer {
  id: number;
  name: string;
  bio: string;
  location: string;
  image: string;
  totalFollowers: string;
  avgEngagement: string;
  languages: string[];
  rating: number;
  niches: string[];
  platforms: Platform[];
  campaignName?: string;
}

interface InfluencerActionsProps {
  influencer: Influencer;
}

const InfluencerActions = ({ influencer }: InfluencerActionsProps) => {
  const { addInfluencerToCampaign, loading } = useCampaignInfluencers();
  
  const isAddedToCampaign = Boolean(influencer.campaignName);

  const handleAddToCampaign = async () => {
    if (isAddedToCampaign) return;
    
    const success = await addInfluencerToCampaign(influencer.name);
    if (success) {
      // Optionally refresh the page or update the local state
      window.location.reload();
    }
  };

  return (
    <div className="px-6 pb-6 pt-2 border-t border-gray-100">
      <div className="flex space-x-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex-1 h-9">
              <Eye className="h-4 w-4 mr-2" />
              View Profile
            </Button>
          </DialogTrigger>
          <InfluencerDialog influencer={influencer} />
        </Dialog>
        
        <Button 
          size="sm" 
          className={`flex-1 h-9 ${
            isAddedToCampaign 
              ? 'bg-green-600 hover:bg-green-700 cursor-default' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          onClick={handleAddToCampaign}
          disabled={loading || isAddedToCampaign}
        >
          {isAddedToCampaign ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Added to Campaign
            </>
          ) : (
            <>
              <Heart className="h-4 w-4 mr-2" />
              {loading ? 'Adding...' : 'Add to Campaign'}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default InfluencerActions;
