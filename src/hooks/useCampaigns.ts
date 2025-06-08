import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Campaign } from '@/types/campaign';
import { apiConfig } from '@/config/api';

// Utility to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('jwt_token') || '';
};

const fetchCampaigns = async (): Promise<Campaign[]> => {
  const response = await fetch(apiConfig.endpoints.campaigns, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${getAuthToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch campaigns');
  }

  return response.json();
};

export const useCampaigns = () => {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: fetchCampaigns,
  });
};

export const useRefreshCampaigns = () => {
  const queryClient = useQueryClient();
  
  return () => {
    queryClient.invalidateQueries({ queryKey: ['campaigns'] });
  };
};
