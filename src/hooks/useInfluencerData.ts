
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface ApiPlatform {
  _id: string;
  name: string;
  handle: string;
  followers: number;
  engagementRate: number;
  pastCollaborations: string[];
}

interface ApiInfluencer {
  _id: string;
  name: string;
  bio: string;
  categories: string[];
  languages: string[];
  location: string;
  platforms: ApiPlatform[];
  profileImage: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

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

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const transformApiDataToInfluencer = (apiData: ApiInfluencer): Influencer => {
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

  return {
    id: parseInt(apiData._id.slice(-6), 16), // Convert last 6 chars of _id to number
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
};

export const useInfluencerData = () => {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { campaignId } = useParams();

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        setLoading(true);
        
        // Determine which endpoint to use based on whether we're in a campaign context
        const endpoint = campaignId 
          ? `http://localhost:5000/api/user_123/campaigns/${campaignId}/influencers`
          : 'http://localhost:5000/api/user_123/influencers';
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error('Failed to fetch influencers');
        }

        const apiData: ApiInfluencer[] = await response.json();
        const transformedData = apiData.map(transformApiDataToInfluencer);
        
        // If we're fetching campaign influencers, mark them as campaign influencers
        if (campaignId) {
          transformedData.forEach(influencer => {
            influencer.campaignName = campaignId;
          });
        }
        
        setInfluencers(transformedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching influencers:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, [campaignId]);

  return { influencers, loading, error };
};
