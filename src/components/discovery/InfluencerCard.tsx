
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
    <Card className="group bg-white/80 backdrop-blur-sm border-gray-200/60 hover:bg-white hover:shadow-xl hover:shadow-blue-100/50 hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden relative">
      <CardContent className="p-0">
        {/* Campaign Badge */}
        {isInCampaign && (
          <CampaignBadge campaignName="campaign" />
        )}

        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Influencer Identity */}
          <InfluencerHeader influencer={influencer} />

          {/* Platform Overview */}
          <div className="px-6 pb-4">
            <div className="space-y-3">
              {influencer.platforms.slice(0, 2).map((platform) => (
                <PlatformPill key={platform.name} platform={platform} />
              ))}
              {influencer.platforms.length > 2 && (
                <div className="flex items-center justify-center p-3 text-xs text-gray-500 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/60">
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
