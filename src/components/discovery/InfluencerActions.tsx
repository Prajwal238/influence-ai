
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
}

const InfluencerActions = ({ 
  influencer, 
  isInCampaign, 
  onAddToCampaign, 
  onRemoveFromCampaign 
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
            isInCampaign 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          onClick={handleCampaignAction}
          disabled={isLoading}
        >
          {isInCampaign ? (
            <>
              <X className="h-4 w-4 mr-2" />
              {isLoading ? 'Removing...' : 'Remove from Campaign'}
            </>
          ) : (
            <>
              <Heart className="h-4 w-4 mr-2" />
              {isLoading ? 'Adding...' : 'Add to Campaign'}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default InfluencerActions;
