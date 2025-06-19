
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Star, X } from "lucide-react";
import { getPlatformIcon } from "./platformUtils";
import InfluencerDialog from "./InfluencerDialog";
import InfluencerActions from "./InfluencerActions";
import CampaignBadge from "./CampaignBadge";
import { Influencer } from "@/types/influencer";

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
  // Calculate match percentage (mock calculation based on rating)
  const matchPercentage = Math.round((influencer.rating / 5) * 100);

  return (
    <Card className="group bg-white shadow-sm border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer overflow-hidden relative">
      <CardContent className="p-0">
        {/* Campaign Badge */}
        {isInCampaign && (
          <CampaignBadge campaignName="campaign" />
        )}

        <Dialog>
          <DialogTrigger asChild>
            <div className="p-4 hover:bg-gray-50 transition-colors">
              {/* Table-style layout */}
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Creator Column */}
                <div className="col-span-3 flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={influencer.image} alt={influencer.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-sm">
                      {influencer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">{influencer.name}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {influencer.platforms.slice(0, 2).map((platform) => {
                        const IconComponent = getPlatformIcon(platform.name);
                        return (
                          <IconComponent key={platform.name} className="h-3 w-3 text-gray-400" />
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
                  <div className="inline-flex items-center px-2 py-1 rounded-full bg-green-50 border border-green-200">
                    <span className="text-xs font-medium text-green-700">{matchPercentage}%</span>
                  </div>
                </div>

                {/* Followers Column */}
                <div className="col-span-2 text-center">
                  <p className="text-sm font-medium text-gray-900">{influencer.totalFollowers}</p>
                </div>

                {/* Views Column (using engagement as proxy) */}
                <div className="col-span-1 text-center">
                  <p className="text-sm text-gray-600">{influencer.avgEngagement}</p>
                </div>

                {/* Engagement Column */}
                <div className="col-span-1 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">{influencer.rating}</span>
                  </div>
                </div>

                {/* Categories Column */}
                <div className="col-span-2">
                  <div className="flex flex-wrap gap-1">
                    {influencer.niches.slice(0, 2).map((niche) => (
                      <Badge 
                        key={niche} 
                        variant="secondary" 
                        className="text-xs px-2 py-0 bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {niche}
                      </Badge>
                    ))}
                    {influencer.niches.length > 2 && (
                      <span className="text-xs text-gray-400">+{influencer.niches.length - 2}</span>
                    )}
                  </div>
                </div>

                {/* Bio Column */}
                <div className="col-span-2">
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {influencer.bio}
                  </p>
                </div>
              </div>
            </div>
          </DialogTrigger>
          <InfluencerDialog influencer={influencer} />
        </Dialog>

        {/* Actions - Only show on hover */}
        <div className="border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
          <InfluencerActions 
            influencer={influencer}
            isInCampaign={isInCampaign}
            onAddToCampaign={onAddToCampaign}
            onRemoveFromCampaign={onRemoveFromCampaign}
            showCampaignInfluencers={showCampaignInfluencers}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default InfluencerCard;
