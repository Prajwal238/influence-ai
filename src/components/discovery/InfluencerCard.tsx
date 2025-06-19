
import { Card, CardContent } from "@/components/ui/card";
import PlatformPill from "./PlatformPill";
import InfluencerHeader from "./InfluencerHeader";
import InfluencerStats from "./InfluencerStats";
import InfluencerNiches from "./InfluencerNiches";
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
  return (
    <Card className="group relative bg-white/70 backdrop-blur-sm border border-gray-200/60 hover:bg-white hover:shadow-xl hover:shadow-blue-100/30 hover:border-blue-300/60 hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden">
      <CardContent className="p-0">
        {/* Campaign Badge */}
        {isInCampaign && (
          <CampaignBadge campaignName="campaign" />
        )}

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Influencer Identity */}
          <InfluencerHeader influencer={influencer} />

          {/* Platform Overview */}
          <div className="px-6 pb-4">
            <div className="space-y-2">
              {influencer.platforms.slice(0, 2).map((platform) => (
                <PlatformPill key={platform.name} platform={platform} />
              ))}
              {influencer.platforms.length > 2 && (
                <div className="flex items-center justify-center p-2.5 text-xs text-gray-500 bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm rounded-lg border border-gray-200/40 group-hover:border-gray-300/60 transition-colors">
                  <span className="font-medium">+{influencer.platforms.length - 2} more platforms</span>
                </div>
              )}
            </div>
          </div>

          {/* Aggregated Stats */}
          <InfluencerStats 
            totalFollowers={influencer.totalFollowers}
            avgEngagement={influencer.avgEngagement}
            rating={influencer.rating}
            languages={influencer.languages}
          />

          {/* Niche Tags */}
          <InfluencerNiches niches={influencer.niches} />

          {/* Actions */}
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
