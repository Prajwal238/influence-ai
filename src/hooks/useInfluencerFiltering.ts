
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
  campaignInfluencers: Influencer[];
  searchQuery: string;
  showCampaignInfluencers: boolean;
  activeFilters: string[];
}

const parseFollowerCount = (followerString: string): number => {
  const num = parseFloat(followerString);
  if (followerString.includes('M')) {
    return num * 1000000;
  } else if (followerString.includes('K')) {
    return num * 1000;
  }
  return num;
};

const parseEngagementRate = (engagementString: string): number => {
  return parseFloat(engagementString.replace('%', ''));
};

export const useInfluencerFiltering = ({
  influencers,
  campaignInfluencers,
  searchQuery,
  showCampaignInfluencers,
  activeFilters
}: UseInfluencerFilteringProps) => {
  const filteredInfluencers = useMemo(() => {
    console.log('Filtering influencers:', {
      totalInfluencers: influencers.length,
      campaignInfluencers: campaignInfluencers.length,
      showCampaignInfluencers,
      searchQuery,
      activeFilters
    });

    // Choose the base set of influencers based on the toggle
    const baseInfluencers = showCampaignInfluencers ? campaignInfluencers : influencers;
    
    console.log('Using base influencers:', baseInfluencers.length);

    return baseInfluencers.filter((influencer) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          influencer.name.toLowerCase().includes(query) ||
          influencer.niches.some(niche => niche.toLowerCase().includes(query)) ||
          influencer.platforms.some(platform => platform.handle.toLowerCase().includes(query));
        
        if (!matchesSearch) return false;
      }

      // Active filters
      for (const filter of activeFilters) {
        if (filter === "Fashion") {
          const hasFashion = influencer.niches.some(niche => 
            niche.toLowerCase().includes('fashion') || 
            niche.toLowerCase().includes('style') ||
            niche.toLowerCase().includes('beauty')
          );
          if (!hasFashion) return false;
        }
        
        if (filter === "100K+ followers") {
          const totalFollowers = parseFollowerCount(influencer.totalFollowers);
          if (totalFollowers < 100000) return false;
        }
        
        if (filter === "High engagement") {
          const avgEngagement = parseEngagementRate(influencer.avgEngagement);
          if (avgEngagement < 5.0) return false; // Consider 5%+ as high engagement
        }
      }

      return true;
    });
  }, [influencers, campaignInfluencers, searchQuery, showCampaignInfluencers, activeFilters]);

  console.log('Filtered results:', {
    baseCount: showCampaignInfluencers ? campaignInfluencers.length : influencers.length,
    filteredCount: filteredInfluencers.length,
    showCampaignInfluencers
  });

  return filteredInfluencers;
};
