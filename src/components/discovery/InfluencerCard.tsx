
import { Card, CardContent } from "@/components/ui/card";
import PlatformPill from "./PlatformPill";
import InfluencerHeader from "./InfluencerHeader";
import InfluencerStats from "./InfluencerStats";
import InfluencerNiches from "./InfluencerNiches";
import InfluencerActions from "./InfluencerActions";

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
  campaignName?: string; // New optional property for campaign status
}

interface InfluencerCardProps {
  influencer: Influencer;
}

const InfluencerCard = ({ influencer }: InfluencerCardProps) => {
  return (
    <Card className="group bg-white shadow-sm border-gray-200 hover:shadow-xl hover:border-gray-300 hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden">
      <CardContent className="p-0">
        {/* Influencer Identity */}
        <InfluencerHeader influencer={influencer} />

        {/* Platform Overview */}
        <div className="px-6 pb-4">
          <div className="space-y-3">
            {influencer.platforms.slice(0, 3).map((platform) => (
              <PlatformPill key={platform.name} platform={platform} />
            ))}
            {influencer.platforms.length > 3 && (
              <div className="flex items-center justify-center p-2 text-xs text-gray-500 bg-gray-50 rounded-lg">
                +{influencer.platforms.length - 3} more platforms
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
        <InfluencerActions influencer={influencer} />
      </CardContent>
    </Card>
  );
};

export default InfluencerCard;
