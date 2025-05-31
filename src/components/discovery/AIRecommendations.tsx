
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import AISearchDialog from "./AISearchDialog";
import { useParams } from "react-router-dom";
import { Influencer } from "@/types/influencer";

interface AIRecommendationsProps {
  isInCampaign: (influencer: Influencer) => boolean;
  onAddToCampaign: (influencer: Influencer) => Promise<boolean>;
  onRemoveFromCampaign: (influencer: Influencer) => Promise<boolean>;
}

const AIRecommendations = ({
  isInCampaign,
  onAddToCampaign,
  onRemoveFromCampaign
}: AIRecommendationsProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { id: campaignId } = useParams();

  const handleSearchClick = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-900 mb-1">
                AI-Powered Search
              </h3>
              <p className="text-xs text-blue-800 mb-2 line-clamp-2">
                Get AI recommendations based on your campaign details. Find perfect influencer matches instantly.
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-blue-300 text-blue-700 hover:bg-blue-100 text-xs px-3 py-1"
              onClick={handleSearchClick}
            >
              Search Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {campaignId && (
        <AISearchDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          campaignId={campaignId}
          isInCampaign={isInCampaign}
          onAddToCampaign={onAddToCampaign}
          onRemoveFromCampaign={onRemoveFromCampaign}
        />
      )}
    </>
  );
};

export default AIRecommendations;
