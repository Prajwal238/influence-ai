
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Heart, Check } from "lucide-react";
import InfluencerDialog from "./InfluencerDialog";
import { useCampaignInfluencers } from "@/hooks/useCampaignInfluencers";
import { Influencer } from "@/types/influencer";

interface InfluencerActionsProps {
  influencer: Influencer;
  onInfluencerUpdate?: (influencerId: number, campaignName?: string) => void;
}

const InfluencerActions = ({ influencer, onInfluencerUpdate }: InfluencerActionsProps) => {
  const { addInfluencerToCampaign, loading } = useCampaignInfluencers();
  
  const isAddedToCampaign = Boolean(influencer.campaignName);

  const handleAddToCampaign = async () => {
    if (isAddedToCampaign) return;
    
    console.log('Adding influencer to campaign:', influencer.name, 'ID:', influencer.id);
    
    // Convert the numeric ID back to a string format that matches the API _id format
    const apiId = influencer.id.toString(16).padStart(24, '0');
    console.log('Converted ID for API:', apiId);
    
    const success = await addInfluencerToCampaign(apiId);
    if (success) {
      console.log('Successfully added influencer to campaign');
      // Update the parent component with the correct signature
      if (onInfluencerUpdate) {
        onInfluencerUpdate(influencer.id, 'campaign');
      }
    } else {
      console.log('Failed to add influencer to campaign');
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
