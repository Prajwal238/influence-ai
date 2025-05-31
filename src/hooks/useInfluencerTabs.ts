
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Influencer } from '@/types/influencer';
import { transformApiDataToInfluencer } from '@/utils/influencerTransforms';
import { useInfluencerAPI } from '@/hooks/useInfluencerAPI';

export const useInfluencerTabs = () => {
  const [allInfluencers, setAllInfluencers] = useState<Influencer[]>([]);
  const [campaignInfluencers, setCampaignInfluencers] = useState<Influencer[]>([]);
  const [campaignInfluencerIds, setCampaignInfluencerIds] = useState<Set<string>>(new Set());
  const { id: campaignId } = useParams();
  const { fetchInfluencers, loading, error } = useInfluencerAPI();

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const { allInfluencersData, campaignInfluencersData } = await fetchInfluencers(campaignId);

        // Create set of campaign influencer IDs for quick lookup
        const campaignIds = new Set(campaignInfluencersData.map(inf => inf._id));
        setCampaignInfluencerIds(campaignIds);

        // Transform all influencers and mark those in campaign
        const transformedAllInfluencers = allInfluencersData.map(data => {
          const isInCampaign = campaignIds.has(data._id);
          return transformApiDataToInfluencer(data, isInCampaign);
        });

        // Transform campaign influencers - ensure no duplicates
        const transformedCampaignInfluencers = campaignInfluencersData.map(data => 
          transformApiDataToInfluencer(data, true)
        );

        console.log('Loaded influencer data:', {
          allInfluencers: transformedAllInfluencers.length,
          campaignInfluencers: transformedCampaignInfluencers.length,
          campaignIds: Array.from(campaignIds)
        });

        setAllInfluencers(transformedAllInfluencers);
        setCampaignInfluencers(transformedCampaignInfluencers);
      } catch (err) {
        console.error('Failed to load influencer data:', err);
      }
    };

    loadData();
  }, [campaignId, fetchInfluencers]);

  // Add influencer to campaign
  const addToCampaign = async (influencer: Influencer) => {
    if (!campaignId) return false;

    try {
      const response = await fetch(`http://localhost:5000/api/user_123/campaigns/${campaignId}/influencers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ influencerId: influencer.apiId })
      });

      if (!response.ok) throw new Error('Failed to add influencer');

      // Update local state - prevent duplicates with strict checking
      const updatedInfluencer = { ...influencer, campaignName: 'campaign' };
      
      // Add to campaign IDs set
      setCampaignInfluencerIds(prev => new Set(prev).add(influencer.apiId));
      
      // Update all influencers list - ensure no duplicates
      setAllInfluencers(prev => prev.map(inf => 
        inf.apiId === influencer.apiId ? updatedInfluencer : inf
      ));
      
      // Add to campaign influencers list only if not already present
      setCampaignInfluencers(prev => {
        const exists = prev.some(inf => inf.apiId === influencer.apiId);
        if (exists) {
          console.log('Influencer already in campaign, updating existing entry');
          return prev.map(inf => 
            inf.apiId === influencer.apiId ? updatedInfluencer : inf
          );
        }
        console.log('Adding new influencer to campaign list');
        return [...prev, updatedInfluencer];
      });

      console.log('Successfully added influencer to campaign:', influencer.name);
      return true;
    } catch (error) {
      console.error('Error adding influencer to campaign:', error);
      return false;
    }
  };

  // Remove influencer from campaign
  const removeFromCampaign = async (influencer: Influencer) => {
    if (!campaignId) return false;

    try {
      const response = await fetch(`http://localhost:5000/api/user_123/campaigns/${campaignId}/influencers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ removeInfluencerId: influencer.apiId })
      });

      if (!response.ok) throw new Error('Failed to remove influencer');

      // Update local state - clean removal
      const updatedInfluencer = { ...influencer, campaignName: undefined };
      
      // Remove from campaign IDs set
      setCampaignInfluencerIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(influencer.apiId);
        return newSet;
      });
      
      // Update all influencers list
      setAllInfluencers(prev => prev.map(inf => 
        inf.apiId === influencer.apiId ? updatedInfluencer : inf
      ));
      
      // Remove from campaign influencers list - strict removal
      setCampaignInfluencers(prev => prev.filter(inf => inf.apiId !== influencer.apiId));

      console.log('Successfully removed influencer from campaign:', influencer.name);
      return true;
    } catch (error) {
      console.error('Error removing influencer from campaign:', error);
      return false;
    }
  };

  // Check if influencer is in campaign
  const isInCampaign = (influencer: Influencer) => {
    return campaignInfluencerIds.has(influencer.apiId);
  };

  return {
    allInfluencers,
    campaignInfluencers,
    loading,
    error,
    addToCampaign,
    removeFromCampaign,
    isInCampaign
  };
};
