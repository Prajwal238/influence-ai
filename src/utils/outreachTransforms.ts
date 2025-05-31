
import { ApiInfluencer } from '@/types/influencer';

export interface OutreachInfluencer {
  id: number;
  name: string;
  handle: string;
  followers: string;
  niche: string;
  platforms: string[];
}

const formatFollowers = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(0)}K`;
  }
  return count.toString();
};

export const transformApiDataToOutreachInfluencer = (apiData: ApiInfluencer, index: number): OutreachInfluencer => {
  // Get the primary platform (Instagram first, then others)
  const primaryPlatform = apiData.platforms.find(p => p.name === 'instagram') || apiData.platforms[0];
  
  // Get the primary niche from categories
  const primaryNiche = apiData.categories[0] || 'General';
  
  // Extract all available platforms
  const availablePlatforms = apiData.platforms.map(p => p.name);
  
  return {
    id: index,
    name: apiData.name,
    handle: primaryPlatform?.handle || `@${apiData.name.toLowerCase().replace(/\s+/g, '')}`,
    followers: formatFollowers(primaryPlatform?.followers || 0),
    niche: primaryNiche.charAt(0).toUpperCase() + primaryNiche.slice(1),
    platforms: availablePlatforms
  };
};
