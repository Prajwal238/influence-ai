
import InfluencerCard from "./InfluencerCard";
import { Influencer } from "@/types/influencer";

interface DiscoveryResultsProps {
  influencers: Influencer[];
  isInCampaign: (influencer: Influencer) => boolean;
  onAddToCampaign: (influencer: Influencer) => Promise<boolean>;
  onRemoveFromCampaign: (influencer: Influencer) => Promise<boolean>;
  showCampaignInfluencers?: boolean; // New prop to indicate tab context
}

const DiscoveryResults = ({ 
  influencers, 
  isInCampaign, 
  onAddToCampaign, 
  onRemoveFromCampaign,
  showCampaignInfluencers = false
}: DiscoveryResultsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {influencers.map((influencer) => (
        <InfluencerCard 
          key={influencer.id} 
          influencer={influencer}
          isInCampaign={isInCampaign(influencer)}
          onAddToCampaign={onAddToCampaign}
          onRemoveFromCampaign={onRemoveFromCampaign}
          showCampaignInfluencers={showCampaignInfluencers}
        />
      ))}
    </div>
  );
};

export default DiscoveryResults;
