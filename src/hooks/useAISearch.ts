
import { useState } from 'react';
import { Influencer, ApiInfluencer } from '@/types/influencer';
import { transformApiDataToInfluencer } from '@/utils/influencerTransforms';
import { apiClient } from '@/config/api';

export const useAISearch = () => {
  const [loading, setLoading] = useState(false);
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [error, setError] = useState<string | null>(null);

  const searchInfluencers = async (campaignId: string, prompt?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Calling AI search API for campaign:', campaignId, 'with prompt:', prompt);
      
      const endpoint = `/api/campaigns/${campaignId}/influencers/llm`;
      
      let response;
      
      if (prompt) {
        // Custom prompt search - use POST with prompt in body
        response = await apiClient.post(endpoint, {
          userPrompt: prompt
        });
      } else {
        // Default recommendations - use GET
        response = await apiClient.get(endpoint);
      }
      
      if (!response.ok) {
        throw new Error('Failed to fetch AI recommendations');
      }
      
      const apiInfluencers: ApiInfluencer[] = await response.json();
      console.log('AI search results:', apiInfluencers.length, 'influencers');
      
      // Transform API data to our influencer format
      const transformedInfluencers = apiInfluencers.map(data => 
        transformApiDataToInfluencer(data, false)
      );
      
      setInfluencers(transformedInfluencers);
      return transformedInfluencers;
    } catch (err) {
      console.error('Error fetching AI recommendations:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setInfluencers([]);
    setError(null);
  };

  return {
    loading,
    influencers,
    error,
    searchInfluencers,
    resetSearch
  };
};
