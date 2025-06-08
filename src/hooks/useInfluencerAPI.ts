
import { useState, useCallback } from 'react';
import { ApiInfluencer } from '@/types/influencer';
import { buildApiUrl } from '@/config/api';

export const useInfluencerAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllInfluencers = async (): Promise<ApiInfluencer[]> => {
    console.log('Fetching all influencers...');
    const response = await fetch(buildApiUrl('/api/influencers'));
    if (!response.ok) {
      throw new Error('Failed to fetch all influencers');
    }
    const data: ApiInfluencer[] = await response.json();
    console.log('All influencers fetched:', data.length);
    return data;
  };

  const fetchCampaignInfluencers = async (campaignId: string): Promise<ApiInfluencer[]> => {
    const campaignUrl = buildApiUrl(`/api/campaigns/${campaignId}/influencers`);
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

  const fetchInfluencers = useCallback(async (campaignId?: string) => {
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
  }, []); // Empty dependency array since the function doesn't depend on any external values

  return {
    fetchInfluencers,
    loading,
    error
  };
};
