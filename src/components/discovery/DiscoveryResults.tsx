
import InfluencerCard from "./InfluencerCard";

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

interface DiscoveryResultsProps {
  influencers: Influencer[];
  onInfluencerUpdate?: (influencerId: number, campaignName?: string) => void;
}

const DiscoveryResults = ({ influencers, onInfluencerUpdate }: DiscoveryResultsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {influencers.map((influencer) => (
        <InfluencerCard 
          key={influencer.id} 
          influencer={influencer} 
          onInfluencerUpdate={onInfluencerUpdate}
        />
      ))}
    </div>
  );
};

export default DiscoveryResults;
