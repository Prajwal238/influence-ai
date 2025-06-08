
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Influencer } from '@/types/influencer';
import { transformApiDataToInfluencer } from '@/utils/influencerTransforms';
import { useInfluencerAPI } from '@/hooks/useInfluencerAPI';
import { apiClient } from '@/config/api';

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

        // Debug: Check for duplicates in allInfluencers
        const allInfluencerNames = transformedAllInfluencers.map(inf => inf.name);
        const duplicateNames = allInfluencerNames.filter((name, index) => allInfluencerNames.indexOf(name) !== index);
        if (duplicateNames.length > 0) {
          console.error('DUPLICATE INFLUENCERS DETECTED IN ALL INFLUENCERS:', duplicateNames);
          console.log('Full allInfluencers data:', transformedAllInfluencers);
        }

        // Debug: Check for duplicates by apiId
        const allInfluencerApiIds = transformedAllInfluencers.map(inf => inf.apiId);
        const duplicateApiIds = allInfluencerApiIds.filter((id, index) => allInfluencerApiIds.indexOf(id) !== index);
        if (duplicateApiIds.length > 0) {
          console.error('DUPLICATE API IDS DETECTED:', duplicateApiIds);
        }

        console.log('Loaded influencer data:', {
          allInfluencers: transformedAllInfluencers.length,
          campaignInfluencers: transformedCampaignInfluencers.length,
          campaignIds: Array.from(campaignIds),
          duplicateNames,
          duplicateApiIds
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
      const response = await apiClient.post(`/api/campaigns/${campaignId}/influencers`, {
        influencerId: influencer.apiId
      });

      if (!response.ok) throw new Error('Failed to add influencer');

      // Update local state - prevent duplicates with strict checking
      const updatedInfluencer = { ...influencer, campaignName: 'campaign' };
      
      // Add to campaign IDs set
      setCampaignInfluencerIds(prev => new Set(prev).add(influencer.apiId));
      
      // Update all influencers list - ensure no duplicates
      setAllInfluencers(prev => {
        const updated = prev.map(inf => 
          inf.apiId === influencer.apiId ? updatedInfluencer : inf
        );
        
        // Debug: Check if we're creating duplicates
        const updatedNames = updated.map(inf => inf.name);
        const duplicates = updatedNames.filter((name, index) => updatedNames.indexOf(name) !== index);
        if (duplicates.length > 0) {
          console.error('DUPLICATES CREATED IN addToCampaign - allInfluencers:', duplicates);
        }
        
        return updated;
      });
      
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
      const response = await apiClient.post(`/api/campaigns/${campaignId}/influencers`, {
        removeInfluencerId: influencer.apiId
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
