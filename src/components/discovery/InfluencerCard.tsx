
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, Eye, Heart, Check, Plus } from "lucide-react";
import { getPlatformIcon } from "./platformUtils";
import InfluencerDialog from "./InfluencerDialog";
import { Influencer } from "@/types/influencer";
import { useState } from "react";

interface InfluencerCardProps {
  influencer: Influencer;
  isInCampaign: boolean;
  onAddToCampaign: (influencer: Influencer) => Promise<boolean>;
  onRemoveFromCampaign: (influencer: Influencer) => Promise<boolean>;
  showCampaignInfluencers?: boolean;
}

const InfluencerCard = ({ 
  influencer, 
  isInCampaign, 
  onAddToCampaign, 
  onRemoveFromCampaign,
  showCampaignInfluencers = false
}: InfluencerCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Calculate match percentage (mock calculation based on rating)
  const matchPercentage = Math.round((influencer.rating / 5) * 100);

  const handleCampaignAction = async (e: React.MouseEvent) => {
    e.stopPropagation();
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
    <Card className="group bg-white shadow-sm border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer overflow-hidden relative">
      <CardContent className="p-0">
        {/* Added to Campaign Badge - Top right corner */}
        {isInCampaign && (
          <div className="absolute top-1 right-1 z-10">
            <div className="flex items-center space-x-1 bg-green-50 border border-green-200 rounded-full px-1.5 py-0.5">
              <Check className="h-2 w-2 text-green-600" />
              <span className="text-xs text-green-700 font-medium">✓</span>
            </div>
          </div>
        )}

        <Dialog>
          <DialogTrigger asChild>
            <div className="p-2 hover:bg-gray-50 transition-colors">
              {/* Table-style layout - Ultra compact */}
              <div className="grid grid-cols-12 gap-2 items-center">
                {/* Creator Column */}
                <div className="col-span-3 flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={influencer.image} alt={influencer.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-xs">
                      {influencer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-xs text-gray-900 truncate">{influencer.name}</p>
                    <div className="flex items-center space-x-1 mt-0.5">
                      {influencer.platforms.slice(0, 2).map((platform) => {
                        const IconComponent = getPlatformIcon(platform.name);
                        return (
                          <IconComponent key={platform.name} className="h-2 w-2 text-gray-400" />
                        );
                      })}
                      {influencer.platforms.length > 2 && (
                        <span className="text-xs text-gray-400">+{influencer.platforms.length - 2}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Match Column */}
                <div className="col-span-1 text-center">
                  <div className="inline-flex items-center px-1 py-0.5 rounded-full bg-green-50 border border-green-200">
                    <span className="text-xs font-medium text-green-700">{matchPercentage}%</span>
                  </div>
                </div>

                {/* Followers Column */}
                <div className="col-span-2 text-center">
                  <p className="text-xs font-medium text-gray-900">{influencer.totalFollowers}</p>
                </div>

                {/* Views Column */}
                <div className="col-span-1 text-center">
                  <p className="text-xs text-gray-600">{influencer.avgEngagement}</p>
                </div>

                {/* Rating Column */}
                <div className="col-span-1 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="h-2 w-2 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">{influencer.rating}</span>
                  </div>
                </div>

                {/* Categories Column */}
                <div className="col-span-2">
                  <div className="flex flex-wrap gap-1">
                    {influencer.niches.slice(0, 1).map((niche) => (
                      <Badge 
                        key={niche} 
                        variant="secondary" 
                        className="text-xs px-1 py-0 h-4 bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {niche}
                      </Badge>
                    ))}
                    {influencer.niches.length > 1 && (
                      <span className="text-xs text-gray-400">+{influencer.niches.length - 1}</span>
                    )}
                  </div>
                </div>

                {/* Actions Column - Always visible */}
                <div className="col-span-2 flex items-center justify-end space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 px-1 text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                  
                  {showCampaignInfluencers ? (
                    <Button 
                      size="sm" 
                      variant="destructive"
                      className="h-6 px-2 text-xs"
                      onClick={handleCampaignAction}
                      disabled={isLoading}
                    >
                      Remove
                    </Button>
                  ) : (
                    !isInCampaign && (
                      <Button 
                        size="sm" 
                        className="h-6 px-2 text-xs bg-blue-600 hover:bg-blue-700"
                        onClick={handleCampaignAction}
                        disabled={isLoading}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        {isLoading ? '...' : 'Add'}
                      </Button>
                    )
                  )}
                </div>
              </div>
            </div>
          </DialogTrigger>
          <InfluencerDialog influencer={influencer} />
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default InfluencerCard;
