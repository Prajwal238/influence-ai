
import { useQuery } from '@tanstack/react-query';
import { Campaign } from '@/types/campaign';

const fetchCampaigns = async (): Promise<Campaign[]> => {
  const response = await fetch('http://localhost:5000/api/user_123/campaigns', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
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
