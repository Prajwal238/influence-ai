
export interface OutreachInfluencer {
  id: number;
  name: string;
  handle: string;
  followers: string;
  niche: string;
  platforms?: string[]; // Add platforms support
}

export interface InfluencerSelection {
  influencerId: number;
  platform: string;
}

export interface OutreachEntry {
  id: number;
  influencer: string;
  handle: string;
  status: 'sent' | 'pending' | 'replied' | 'declined';
  sentAt: string;
  template: string;
  platform: 'instagram' | 'email' | 'whatsapp';
  influencerId: number;
}

export type AgentStatus = 'polling' | 'chatting' | 'waitingPhone' | 'calling' | 'complete';
export type ControlMode = 'agent' | 'user';

export interface NegotiationMessage {
  id: string;
  from: 'agent' | 'creator' | 'user';
  content: string;
  timestamp: string;
  platform: 'instagram' | 'email' | 'voice';
}

export interface NegotiationThread {
  creatorId: string;
  name: string;
  handle: string;
  platform: 'instagram' | 'email' | 'voice';
  messages: NegotiationMessage[];
  avatar?: string;
  influencerId: number;
  status: 'sent' | 'pending' | 'replied' | 'declined';
  agentStatus: AgentStatus;
  controlMode: ControlMode;
  contact?: {
    email?: string;
    phone?: string;
  };
  lastActivity: string;
}
