
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Heart, Check, X, Plus } from "lucide-react";
import InfluencerDialog from "./InfluencerDialog";
import { Influencer } from "@/types/influencer";
import { useState } from "react";

interface InfluencerActionsProps {
  influencer: Influencer;
  isInCampaign: boolean;
  onAddToCampaign: (influencer: Influencer) => Promise<boolean>;
  onRemoveFromCampaign: (influencer: Influencer) => Promise<boolean>;
  showCampaignInfluencers?: boolean;
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
          variant="outline"
          className="flex-1 h-9 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all duration-200"
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
            className="flex-1 h-9 bg-emerald-50/80 border-emerald-200 text-emerald-700 cursor-not-allowed backdrop-blur-sm"
            disabled={true}
          >
            <Check className="h-4 w-4 mr-2" />
            In Campaign
          </Button>
        );
      } else {
        // Show "Add to Campaign" button
        return (
          <Button 
            size="sm" 
            className="flex-1 h-9 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 border-0"
            onClick={handleCampaignAction}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add to Campaign
              </>
            )}
          </Button>
        );
      }
    }
  };

  return (
    <div className="px-6 pb-6 pt-2 border-t border-gray-100/60">
      <div className="flex space-x-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 h-9 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            >
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
