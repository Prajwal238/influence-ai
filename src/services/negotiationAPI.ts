
import { buildApiUrl } from '@/config/api';
import { 
  ApiNegotiationResponse, 
  PollMessageResponse, 
  SendMessageRequest, 
  AIResponseRequest, 
  AIResponseResponse 
} from '@/types/negotiationAPI';

// Utility to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('jwt_token') || '';
};

export const fetchAllInfluencerConversationsAPI = async (campaignId?: string): Promise<ApiNegotiationResponse[]> => {
  console.log('Fetching all influencer conversations...');
  
  const url = campaignId 
    ? `${buildApiUrl('/api/getAllInfluencerConversations')}?campaignId=${encodeURIComponent(campaignId)}`
    : buildApiUrl('/api/getAllInfluencerConversations');
    
  const response = await fetch(url, {
    headers: {
      'Authorization': `${getAuthToken()}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch influencer conversations');
  }
  
  const data: ApiNegotiationResponse[] = await response.json();
  console.log('Fetched conversations:', data);
  return data;
};

export const pollConversationAPI = async (
  campaignId: string, 
  platform: string, 
  influencerName: string
): Promise<PollMessageResponse[]> => {
  console.log('Polling conversation for:', { campaignId, platform, influencerName });
  
  const response = await fetch(
    buildApiUrl(`/api/campaigns/${campaignId}/platform/${platform}/getConversation/${encodeURIComponent(influencerName)}`),
    {
      headers: {
        'Authorization': `${getAuthToken()}`,
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to poll conversation');
  }
  
  const data: PollMessageResponse[] = await response.json();
  console.log('Polled conversation data:', data);
  
  return data;
};

export const sendMessageAPI = async (
  campaignId: string, 
  platform: string, 
  influencerName: string, 
  message: string
): Promise<void> => {
  console.log('Sending message:', { campaignId, platform, influencerName, message });
  
  const requestBody: SendMessageRequest = {
    role: 'negotiator',
    message: message
  };

  const response = await fetch(
    buildApiUrl(`/api/campaigns/${campaignId}/platform/${platform}/updateConversation/${encodeURIComponent(influencerName)}`),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${getAuthToken()}`,
      },
      body: JSON.stringify(requestBody)
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to send message');
  }
  
  console.log('Message sent successfully');
};

export const getAIResponseAPI = async (apiMessages: Array<{ role: string; message: string }>): Promise<string> => {
  console.log('Getting AI response for messages:', apiMessages);
  
  const requestBody: AIResponseRequest = {
    messages: apiMessages
  };

  const response = await fetch(
    buildApiUrl('/api/getAIResponse'),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${getAuthToken()}`,
      },
      body: JSON.stringify(requestBody)
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to get AI response');
  }
  
  const data: AIResponseResponse = await response.json();
  console.log('AI response received:', data);
  
  return data.message;
};

export const makeOutboundCallAPI = async (
  campaignId: string,
  phoneNumber: string,
  influencerName: string
): Promise<{
  success: boolean;
  message: string;
  conversation_id: string;
  callSid: string;
}> => {
  console.log('Making outbound call:', { campaignId, phoneNumber, influencerName });
  
  const response = await fetch(
    buildApiUrl(`/api/campaigns/${campaignId}/makeOutBoundCall`),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${getAuthToken()}`,
      },
      body: JSON.stringify({
        phoneNumber,
        influencerName
      })
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to make outbound call');
  }
  
  const data = await response.json();
  console.log('Outbound call response:', data);
  
  return data;
};
