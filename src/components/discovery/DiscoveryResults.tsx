
import InfluencerCard from "./InfluencerCard";
import { Influencer } from "@/types/influencer";

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
