
import { useState, useEffect } from "react";
import { transformApiDataToOutreachInfluencer } from "@/utils/outreachTransforms";
import { InfluencerSelection } from "@/types/outreach";
import { buildApiUrl } from "@/config/api";

// Utility to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('jwt_token') || '';
};

export const useOutreachInfluencers = (campaignId: string | undefined) => {
  const [selectedInfluencers, setSelectedInfluencers] = useState<InfluencerSelection[]>([]);
  const [apiInfluencers, setApiInfluencers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch influencers from API
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        setLoading(true);
        const response = await fetch(buildApiUrl(`/api/campaigns/${campaignId}/outreach_seed`), {
          headers: {
            'Authorization': `${getAuthToken()}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch influencers');
        }
        
        const data = await response.json();
        console.log('Outreach API response:', data);
        setApiInfluencers(data.influencers || []);
      } catch (err) {
        console.error('Error fetching outreach influencers:', err);
        setError(err instanceof Error ? err.message : 'Failed to load influencers');
      } finally {
        setLoading(false);
      }
    };

    if (campaignId) {
      fetchInfluencers();
    }
  }, [campaignId]);

  // Transform API data to component format
  const transformedInfluencers = apiInfluencers.map((apiInfluencer, index) => 
    transformApiDataToOutreachInfluencer(apiInfluencer, index + 1)
  );

  const updateInfluencerSelection = (influencerId: number, platform: string) => {
    setSelectedInfluencers(prev => {
      const existingIndex = prev.findIndex(sel => sel.influencerId === influencerId);
      if (existingIndex >= 0) {
        // Update existing selection
        const updated = [...prev];
        updated[existingIndex] = { influencerId, platform };
        return updated;
      } else {
        // Add new selection
        return [...prev, { influencerId, platform }];
      }
    });
  };

  const removeInfluencerSelection = (influencerId: number) => {
    setSelectedInfluencers(prev => prev.filter(sel => sel.influencerId !== influencerId));
  };

  const clearSelectedInfluencers = () => {
    setSelectedInfluencers([]);
  };

  return {
    selectedInfluencers,
    transformedInfluencers,
    loading,
    error,
    updateInfluencerSelection,
    removeInfluencerSelection,
    clearSelectedInfluencers
  };
};
