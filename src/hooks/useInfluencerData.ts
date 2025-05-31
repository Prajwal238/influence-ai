
import { useState, useEffect, useMemo } from 'react';
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

const transformApiDataToInfluencer = (apiData: ApiInfluencer, isCampaignInfluencer: boolean = false): Influencer => {
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
    influencer.campaignName = 'campaign'; // Mark this as a campaign influencer
  }

  return influencer;
};

export const useInfluencerData = () => {
  const [allInfluencers, setAllInfluencers] = useState<Influencer[]>([]);
  const [campaignInfluencers, setCampaignInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id: campaignId } = useParams();

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        setLoading(true);
        console.log('Current campaign ID from params:', campaignId);
        
        // Always fetch all influencers
        console.log('Fetching all influencers...');
        const allInfluencersResponse = await fetch('http://localhost:5000/api/user_123/influencers');
        if (!allInfluencersResponse.ok) {
          throw new Error('Failed to fetch all influencers');
        }
        const allInfluencersData: ApiInfluencer[] = await allInfluencersResponse.json();
        const transformedAllInfluencers = allInfluencersData.map(data => transformApiDataToInfluencer(data, false));
        setAllInfluencers(transformedAllInfluencers);
        console.log('All influencers fetched:', transformedAllInfluencers.length);

        // If we're in a campaign context, also fetch campaign-specific influencers
        if (campaignId) {
          const campaignUrl = `http://localhost:5000/api/user_123/campaigns/${campaignId}/influencers`;
          console.log('Fetching campaign influencers from:', campaignUrl);
          
          const campaignResponse = await fetch(campaignUrl);
          
          if (campaignResponse.ok) {
            const campaignData: ApiInfluencer[] = await campaignResponse.json();
            const transformedCampaignInfluencers = campaignData.map(data => transformApiDataToInfluencer(data, true));
            setCampaignInfluencers(transformedCampaignInfluencers);
            console.log('Campaign influencers fetched:', transformedCampaignInfluencers.length);
          } else {
            console.log('Campaign influencers API response status:', campaignResponse.status);
            console.log('No campaign influencers found or error fetching them');
            setCampaignInfluencers([]);
          }
        } else {
          console.log('No campaign ID found, skipping campaign influencers fetch');
          setCampaignInfluencers([]);
        }
        
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

  // Combine all influencers with campaign influencers, avoiding duplicates
  const combinedInfluencers = useMemo(() => {
    const combined = [...allInfluencers];
    
    // Add campaign influencers that aren't already in the all influencers list
    campaignInfluencers.forEach(campaignInfluencer => {
      const existingIndex = combined.findIndex(inf => inf.id === campaignInfluencer.id);
      if (existingIndex >= 0) {
        // Update existing influencer to mark it as campaign influencer
        combined[existingIndex] = { ...combined[existingIndex], campaignName: 'campaign' };
      } else {
        // Add new campaign influencer
        combined.push(campaignInfluencer);
      }
    });

    console.log('Combined influencers result:', {
      allInfluencers: allInfluencers.length,
      campaignInfluencers: campaignInfluencers.length,
      combined: combined.length
    });

    return combined;
  }, [allInfluencers, campaignInfluencers]);

  return { 
    influencers: combinedInfluencers, 
    campaignInfluencers,
    loading, 
    error 
  };
};
