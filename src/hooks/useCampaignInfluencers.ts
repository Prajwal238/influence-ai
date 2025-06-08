
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/config/api';

export const useCampaignInfluencers = () => {
  const [loading, setLoading] = useState(false);
  const { id: campaignId } = useParams();
  const { toast } = useToast();

  const addInfluencerToCampaign = async (influencerId: string) => {
    if (!campaignId) {
      toast({
        title: "Error",
        description: "No campaign selected",
        variant: "destructive",
      });
      return false;
    }

    setLoading(true);
    try {
      const response = await apiClient.post(`/api/campaigns/${campaignId}/influencers`, {
        influencerId: influencerId
      });

      if (!response.ok) {
        throw new Error('Failed to add influencer to campaign');
      }

      toast({
        title: "Success",
        description: "Influencer added to campaign successfully",
      });

      return true;
    } catch (error) {
      console.error('Error adding influencer to campaign:', error);
      toast({
        title: "Error",
        description: "Failed to add influencer to campaign",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    addInfluencerToCampaign,
    loading
  };
};
