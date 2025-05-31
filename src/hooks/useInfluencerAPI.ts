
import { useState } from 'react';
import { ApiInfluencer } from '@/types/influencer';

export const useInfluencerAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllInfluencers = async (): Promise<ApiInfluencer[]> => {
    console.log('Fetching all influencers...');
    const response = await fetch('http://localhost:5000/api/user_123/influencers');
    if (!response.ok) {
      throw new Error('Failed to fetch all influencers');
    }
    const data: ApiInfluencer[] = await response.json();
    console.log('All influencers fetched:', data.length);
    return data;
  };

  const fetchCampaignInfluencers = async (campaignId: string): Promise<ApiInfluencer[]> => {
    const campaignUrl = `http://localhost:5000/api/user_123/campaigns/${campaignId}/influencers`;
    console.log('Fetching campaign influencers from:', campaignUrl);
    
    const response = await fetch(campaignUrl);
    
    if (response.ok) {
      const data: ApiInfluencer[] = await response.json();
      console.log('Campaign influencers fetched:', data.length);
      return data;
    } else {
      console.log('Campaign influencers API response status:', response.status);
      console.log('No campaign influencers found or error fetching them');
      return [];
    }
  };

  const fetchInfluencers = async (campaignId?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Current campaign ID from params:', campaignId);
      
      // Always fetch all influencers first
      const allInfluencersData = await fetchAllInfluencers();

      // If we're in a campaign context, also fetch campaign-specific influencers
      let campaignInfluencersData: ApiInfluencer[] = [];
      if (campaignId) {
        campaignInfluencersData = await fetchCampaignInfluencers(campaignId);
      } else {
        console.log('No campaign ID found, skipping campaign influencers fetch');
      }

      return { allInfluencersData, campaignInfluencersData };
    } catch (err) {
      console.error('Error fetching influencers:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchInfluencers,
    loading,
    error
  };
};
