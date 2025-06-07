import { useState, useCallback } from 'react';
import { NegotiationThread, NegotiationMessage } from '@/types/outreach';
import { 
  fetchAllInfluencerConversationsAPI,
  pollConversationAPI,
  sendMessageAPI,
  getAIResponseAPI,
  makeOutboundCallAPI
} from '@/services/negotiationAPI';
import { transformApiResponseToThread, transformMessagesToApiFormat } from '@/utils/negotiationTransforms';

export const useNegotiationAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllInfluencerConversations = useCallback(async (): Promise<NegotiationThread[]> => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchAllInfluencerConversationsAPI();
      
      // Transform API data to NegotiationThread format
      const threads: NegotiationThread[] = data.map(transformApiResponseToThread);
      
      return threads;
    } catch (err) {
      console.error('Error fetching influencer conversations:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const pollConversation = useCallback(async (campaignId: string, platform: string, influencerName: string) => {
    try {
      const data = await pollConversationAPI(campaignId, platform, influencerName);
      return data;
    } catch (err) {
      console.error('Error polling conversation:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to poll conversation';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const sendMessage = useCallback(async (campaignId: string, platform: string, influencerName: string, message: string): Promise<void> => {
    try {
      await sendMessageAPI(campaignId, platform, influencerName, message);
    } catch (err) {
      console.error('Error sending message:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const getAIResponse = useCallback(async (messages: NegotiationMessage[]): Promise<string> => {
    try {
      // Transform messages to API format
      const apiMessages = transformMessagesToApiFormat(messages);
      const response = await getAIResponseAPI(apiMessages);
      return response;
    } catch (err) {
      console.error('Error getting AI response:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to get AI response';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const makeCall = useCallback(async (campaignId: string, phoneNumber: string, influencerName: string) => {
    try {
      const response = await makeOutboundCallAPI(campaignId, phoneNumber, influencerName);
      return response;
    } catch (err) {
      console.error('Error making call:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to make call';
      setError(errorMessage);
      throw err;
    }
  }, []);

  return {
    fetchAllInfluencerConversations,
    pollConversation,
    sendMessage,
    getAIResponse,
    makeCall,
    loading,
    error
  };
};
