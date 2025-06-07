
import { NegotiationThread, NegotiationMessage } from "@/types/outreach";
import { ApiNegotiationResponse } from "@/types/negotiationAPI";

export const transformApiResponseToThread = (conv: ApiNegotiationResponse, index: number): NegotiationThread => {
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
      // Start with undefined contact info - will be extracted from messages
    },
    lastActivity: conv.updatedAt,
    messages: messages
  };
};

export const transformMessagesToApiFormat = (messages: NegotiationMessage[]) => {
  return messages.map(msg => ({
    role: msg.from === 'agent' ? 'negotiator' : 'Influencor',
    message: msg.content
  }));
};
