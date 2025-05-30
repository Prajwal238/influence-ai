
export interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  apiResponse?: any;
}

export interface AgentChatProps {
  agentName: string;
  agentType: 'campaign' | 'discovery' | 'outreach' | 'negotiation';
  onClose?: () => void;
  className?: string;
}
