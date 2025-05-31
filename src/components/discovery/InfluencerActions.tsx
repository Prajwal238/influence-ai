
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Heart, Check, X } from "lucide-react";
import InfluencerDialog from "./InfluencerDialog";
import { Influencer } from "@/types/influencer";
import { useState } from "react";

interface InfluencerActionsProps {
  influencer: Influencer;
  isInCampaign: boolean;
  onAddToCampaign: (influencer: Influencer) => Promise<boolean>;
  onRemoveFromCampaign: (influencer: Influencer) => Promise<boolean>;
  showCampaignInfluencers?: boolean; // New prop to indicate tab context
}

const InfluencerActions = ({ 
  influencer, 
  isInCampaign, 
  onAddToCampaign, 
  onRemoveFromCampaign,
  showCampaignInfluencers = false
}: InfluencerActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCampaignAction = async () => {
    setIsLoading(true);
    
    try {
      if (isInCampaign) {
        await onRemoveFromCampaign(influencer);
      } else {
        await onAddToCampaign(influencer);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderCampaignButton = () => {
    if (showCampaignInfluencers) {
      // In "My Campaign's Influencers" tab - show remove button
      return (
        <Button 
          size="sm" 
          variant="destructive"
          className="flex-1 h-9"
          onClick={handleCampaignAction}
          disabled={isLoading}
        >
          <X className="h-4 w-4 mr-2" />
          {isLoading ? 'Removing...' : 'Remove'}
        </Button>
      );
    } else {
      // In "All Influencers" tab or AI search dialog
      if (isInCampaign) {
        // Show disabled "Added to Campaign" state
        return (
          <Button 
            size="sm" 
            variant="outline"
            className="flex-1 h-9 bg-green-50 border-green-200 text-green-700 cursor-not-allowed"
            disabled={true}
          >
            <Check className="h-4 w-4 mr-2" />
            Added to Campaign
          </Button>
        );
      } else {
        // Show "Add to Campaign" button with improved styling
        return (
          <Button 
            size="sm" 
            className="flex-1 h-9 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 border-0"
            onClick={handleCampaignAction}
            disabled={isLoading}
          >
            <Heart className="h-4 w-4 mr-2" />
            {isLoading ? 'Adding...' : 'Add to Campaign'}
          </Button>
        );
      }
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
        
        {renderCampaignButton()}
      </div>
    </div>
  );
};

export default InfluencerActions;
