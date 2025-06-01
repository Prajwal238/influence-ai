
import { useState, useCallback } from 'react';
import { buildApiUrl } from '@/config/api';
import { NegotiationThread, NegotiationMessage } from '@/types/outreach';

interface ApiNegotiationResponse {
  _id: string;
  campaignId: string;
  influencerName: string;
  platform: string;
  __v: number;
  createdAt: string;
  messages: Array<{
    role: string;
    message: string;
  }>;
  updatedAt: string;
}

interface PollMessageResponse {
  role: string;
  message: string;
}

interface SendMessageRequest {
  role: string;
  message: string;
}

export const useNegotiationAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllInfluencerConversations = useCallback(async (): Promise<NegotiationThread[]> => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching all influencer conversations...');
      const response = await fetch(buildApiUrl('/api/user_123/getAllInfluencerConversations'));
      
      if (!response.ok) {
        throw new Error('Failed to fetch influencer conversations');
      }
      
      const data: ApiNegotiationResponse[] = await response.json();
      console.log('Fetched conversations:', data);
      
      // Transform API data to NegotiationThread format
      const threads: NegotiationThread[] = data.map((conv, index) => {
        // Transform messages from API format
        const messages: NegotiationMessage[] = conv.messages.map((msg, msgIndex) => ({
          id: `${conv._id}_${msgIndex}`,
          from: msg.role === 'negotiator' ? 'agent' : 'creator',
          content: msg.message,
          timestamp: conv.createdAt,
          platform: conv.platform as 'instagram' | 'email' | 'voice'
        }));

        // Determine agent status - if no messages or last message is from creator, show polling
        let agentStatus;
        if (messages.length === 0) {
          agentStatus = 'polling';
        } else {
          const lastMessage = messages[messages.length - 1];
          // If last message is from creator, agent should be polling for next action
          agentStatus = lastMessage.from === 'creator' ? 'polling' : 'chatting';
        }
        
        return {
          creatorId: conv._id,
          name: conv.influencerName,
          handle: `@${conv.influencerName.toLowerCase().replace(/\s+/g, '')}`,
          platform: conv.platform as 'instagram' | 'email' | 'voice',
          avatar: "/api/placeholder/40/40", // Default avatar
          influencerId: index + 1, // Use index as fallback ID
          status: messages.length > 0 ? 'replied' : 'sent',
          agentStatus: agentStatus as any,
          controlMode: 'agent' as const,
          contact: {
            email: `${conv.influencerName.toLowerCase().replace(/\s+/g, '.')}@email.com`,
            phone: Math.random() > 0.3 ? `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}` : undefined
          },
          lastActivity: conv.updatedAt,
          messages: messages
        };
      });
      
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

  const pollConversation = useCallback(async (campaignId: string, platform: string, influencerName: string): Promise<PollMessageResponse[]> => {
    try {
      console.log('Polling conversation for:', { campaignId, platform, influencerName });
      
      const response = await fetch(
        buildApiUrl(`/api/campaigns/${campaignId}/platform/${platform}/getConversation/${encodeURIComponent(influencerName)}`)
      );
      
      if (!response.ok) {
        throw new Error('Failed to poll conversation');
      }
      
      const data: PollMessageResponse[] = await response.json();
      console.log('Polled conversation data:', data);
      
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
          },
          body: JSON.stringify(requestBody)
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      console.log('Message sent successfully');
    } catch (err) {
      console.error('Error sending message:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      throw err;
    }
  }, []);

  return {
    fetchAllInfluencerConversations,
    pollConversation,
    sendMessage,
    loading,
    error
  };
};
