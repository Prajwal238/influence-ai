
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PlatformPill from "./PlatformPill";
import InfluencerHeader from "./InfluencerHeader";
import InfluencerStats from "./InfluencerStats";
import InfluencerNiches from "./InfluencerNiches";
import InfluencerActions from "./InfluencerActions";
import CampaignBadge from "./CampaignBadge";

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

interface InfluencerCardProps {
  influencer: Influencer;
  onInfluencerUpdate?: (influencerId: number, campaignName?: string) => void;
}

const InfluencerCard = ({ influencer, onInfluencerUpdate }: InfluencerCardProps) => {
  const [currentInfluencer, setCurrentInfluencer] = useState(influencer);

  const handleInfluencerUpdate = (influencerId: number, campaignName?: string) => {
    console.log('Updating influencer in card:', influencerId, campaignName);
    
    // Update local state
    const updatedInfluencer = { ...currentInfluencer, campaignName };
    setCurrentInfluencer(updatedInfluencer);
    
    // Also notify the parent component
    if (onInfluencerUpdate) {
      onInfluencerUpdate(influencerId, campaignName);
    }
  };

  return (
    <Card className="group bg-white shadow-sm border-gray-200 hover:shadow-xl hover:border-gray-300 hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden relative">
      <CardContent className="p-0">
        {/* Campaign Badge - only show if influencer is in a campaign */}
        {currentInfluencer.campaignName && (
          <CampaignBadge campaignName={currentInfluencer.campaignName} />
        )}

        {/* Influencer Identity */}
        <InfluencerHeader influencer={currentInfluencer} />

        {/* Platform Overview */}
        <div className="px-6 pb-4">
          <div className="space-y-3">
            {currentInfluencer.platforms.slice(0, 3).map((platform) => (
              <PlatformPill key={platform.name} platform={platform} />
            ))}
            {currentInfluencer.platforms.length > 3 && (
              <div className="flex items-center justify-center p-2 text-xs text-gray-500 bg-gray-50 rounded-lg">
                +{currentInfluencer.platforms.length - 3} more platforms
              </div>
            )}
          </div>
        </div>

        {/* Aggregated Stats */}
        <InfluencerStats 
          totalFollowers={currentInfluencer.totalFollowers}
          avgEngagement={currentInfluencer.avgEngagement}
          rating={currentInfluencer.rating}
          languages={currentInfluencer.languages}
        />

        {/* Niche Tags */}
        <InfluencerNiches niches={currentInfluencer.niches} />

        {/* Actions */}
        <InfluencerActions 
          influencer={currentInfluencer} 
          onInfluencerUpdate={handleInfluencerUpdate}
        />
      </CardContent>
    </Card>
  );
};

export default InfluencerCard;
