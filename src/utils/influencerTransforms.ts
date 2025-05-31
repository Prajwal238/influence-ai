
import { ApiInfluencer, Influencer, Platform } from '@/types/influencer';

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const transformApiDataToInfluencer = (apiData: ApiInfluencer, isCampaignInfluencer: boolean = false): Influencer => {
  // Calculate total followers
  const totalFollowers = apiData.platforms.reduce((sum, platform) => sum + platform.followers, 0);
  
  // Calculate average engagement
  const avgEngagement = apiData.platforms.reduce((sum, platform) => sum + platform.engagementRate, 0) / apiData.platforms.length;

  // Transform platforms
  const platforms: Platform[] = apiData.platforms.map(platform => ({
    name: platform.name,
    handle: platform.handle,
    followers: formatNumber(platform.followers),
    engagement: platform.engagementRate.toFixed(1) + '%',
    verified: Math.random() > 0.5, // Since API doesn't provide verified status
    topBrand: platform.pastCollaborations.length > 0 ? platform.pastCollaborations[0] : null
  }));

  const influencer: Influencer = {
    id: parseInt(apiData._id.slice(-6), 16), // Convert last 6 chars of _id to number
    apiId: apiData._id, // Store the original API _id
    name: apiData.name,
    bio: apiData.bio,
    location: apiData.location,
    image: apiData.profileImage,
    totalFollowers: formatNumber(totalFollowers),
    avgEngagement: avgEngagement.toFixed(1) + '%',
    languages: apiData.languages,
    rating: apiData.rating,
    niches: apiData.categories,
    platforms: platforms
  };

  // Mark as campaign influencer if fetched from campaign endpoint
  if (isCampaignInfluencer) {
    influencer.campaignName = 'campaign';
  }

  return influencer;
};
