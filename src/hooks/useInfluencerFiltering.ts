
import { useMemo } from "react";
import { Influencer } from "@/types/influencer";

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
      // Search filter - make search more precise
      if (searchQuery) {
        const query = searchQuery.toLowerCase().trim();
        
        // Only match if the search term appears at the beginning of words or as complete words
        const matchesName = influencer.name.toLowerCase().includes(query);
        
        const matchesNiches = influencer.niches.some(niche => {
          const nicheWords = niche.toLowerCase().split(/\s+/);
          return nicheWords.some(word => word.startsWith(query)) || niche.toLowerCase().includes(query);
        });
        
        const matchesPlatforms = influencer.platforms.some(platform => {
          const handle = platform.handle.toLowerCase();
          // For handles, check if it starts with query or contains it as a word
          return handle.startsWith(query) || handle.includes(query);
        });
        
        console.log(`Checking influencer "${influencer.name}" against query "${query}":`, {
          matchesName,
          matchesNiches,
          matchesPlatforms,
          niches: influencer.niches,
          handles: influencer.platforms.map(p => p.handle)
        });
        
        const matchesSearch = matchesName || matchesNiches || matchesPlatforms;
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
