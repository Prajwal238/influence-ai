
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Influencer } from '@/types/influencer';
import { transformApiDataToInfluencer } from '@/utils/influencerTransforms';
import { useInfluencerAPI } from '@/hooks/useInfluencerAPI';

export const useInfluencerData = () => {
  const [allInfluencers, setAllInfluencers] = useState<Influencer[]>([]);
  const [campaignInfluencers, setCampaignInfluencers] = useState<Influencer[]>([]);
  const { id: campaignId } = useParams();
  const { fetchInfluencers, loading, error } = useInfluencerAPI();

  useEffect(() => {
    const loadInfluencers = async () => {
      try {
        const { allInfluencersData, campaignInfluencersData } = await fetchInfluencers(campaignId);

        // Create a Set of campaign influencer IDs for quick lookup
        const campaignInfluencerIds = new Set(campaignInfluencersData.map(inf => inf._id));

        // Transform all influencers, marking those that are in the campaign
        const transformedAllInfluencers = allInfluencersData.map(data => {
          const isInCampaign = campaignInfluencerIds.has(data._id);
          return transformApiDataToInfluencer(data, isInCampaign);
        });

        // Transform campaign influencers - these are the definitive campaign influencers
        const transformedCampaignInfluencers = campaignInfluencersData.map(data => transformApiDataToInfluencer(data, true));

        console.log('Setting influencer state:', {
          allInfluencers: transformedAllInfluencers.length,
          campaignInfluencers: transformedCampaignInfluencers.length
        });

        setAllInfluencers(transformedAllInfluencers);
        setCampaignInfluencers(transformedCampaignInfluencers);
      } catch (err) {
        // Error handling is done in useInfluencerAPI
        console.error('Failed to load influencers:', err);
      }
    };

    loadInfluencers();
  }, [campaignId, fetchInfluencers]);

  // Function to update an influencer's campaign status
  const updateInfluencerCampaignStatus = (influencerId: number, campaignName?: string) => {
    console.log('updateInfluencerCampaignStatus called with:', { influencerId, campaignName });
    
    // Update allInfluencers state
    setAllInfluencers(prev => {
      const updated = prev.map(inf => 
        inf.id === influencerId 
          ? { ...inf, campaignName }
          : inf
      );
      console.log('Updated allInfluencers:', {
        before: prev.find(inf => inf.id === influencerId)?.campaignName,
        after: updated.find(inf => inf.id === influencerId)?.campaignName
      });

      return updated;
    });

    // If adding to campaign, also add to campaign influencers list
    if (campaignName) {
      setAllInfluencers(prev => {
        const influencerToAdd = prev.find(inf => inf.id === influencerId);
        console.log('Found influencer to add to campaign list:', influencerToAdd?.name);
        
        if (influencerToAdd) {
          setCampaignInfluencers(prevCampaign => {
            // Check if already exists to avoid duplicates
            const exists = prevCampaign.some(inf => inf.id === influencerId);
            if (exists) {
              console.log('Influencer already exists in campaign list');
              return prevCampaign;
            }
            
            const newCampaignInfluencer = { ...influencerToAdd, campaignName };
            console.log('Adding to campaign influencers list:', newCampaignInfluencer.name);
            return [...prevCampaign, newCampaignInfluencer];
          });
        }
        
        // Return updated influencers with campaign status
        return prev.map(inf => 
          inf.id === influencerId 
            ? { ...inf, campaignName }
            : inf
        );
      });
    }
  };

  console.log('Hook state:', {
    allInfluencers: allInfluencers.length,
    campaignInfluencers: campaignInfluencers.length,
    loading,
    error
  });

  return { 
    influencers: allInfluencers, 
    campaignInfluencers,
    loading, 
    error,
    updateInfluencerCampaignStatus
  };
};
