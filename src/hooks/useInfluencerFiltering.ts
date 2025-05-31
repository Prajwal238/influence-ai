
import { useMemo } from "react";

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

interface UseInfluencerFilteringProps {
  influencers: Influencer[];
  searchQuery: string;
  showCampaignInfluencers: boolean;
}

export const useInfluencerFiltering = ({
  influencers,
  searchQuery,
  showCampaignInfluencers
}: UseInfluencerFilteringProps) => {
  const filteredInfluencers = useMemo(() => {
    return influencers.filter((influencer) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          influencer.name.toLowerCase().includes(query) ||
          influencer.niches.some(niche => niche.toLowerCase().includes(query)) ||
          influencer.platforms.some(platform => platform.handle.toLowerCase().includes(query));
        
        if (!matchesSearch) return false;
      }

      // Campaign toggle filter
      if (showCampaignInfluencers && !influencer.campaignName) {
        return false;
      }

      return true;
    });
  }, [influencers, searchQuery, showCampaignInfluencers]);

  return filteredInfluencers;
};
