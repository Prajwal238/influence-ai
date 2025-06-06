
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
  // Debug: Check for duplicate influencers in the rendered list
  const influencerNames = influencers.map(inf => inf.name);
  const duplicateNames = influencerNames.filter((name, index) => influencerNames.indexOf(name) !== index);
  
  if (duplicateNames.length > 0) {
    console.error('DUPLICATE INFLUENCERS IN RENDER:', duplicateNames);
    console.log('All influencers being rendered:', influencers.map(inf => ({ name: inf.name, id: inf.id, apiId: inf.apiId })));
  }

  // Debug: Check for duplicate IDs
  const influencerIds = influencers.map(inf => inf.id);
  const duplicateIds = influencerIds.filter((id, index) => influencerIds.indexOf(id) !== index);
  
  if (duplicateIds.length > 0) {
    console.error('DUPLICATE IDS IN RENDER:', duplicateIds);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {influencers.map((influencer) => (
        <InfluencerCard 
          key={`${influencer.apiId}-${influencer.id}`} 
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
