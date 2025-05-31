
import { useState, useEffect } from 'react';

export interface OutreachInfluencer {
  id: number;
  name: string;
  handle: string;
  followers: string;
  niche: string;
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

export interface NegotiationMessage {
  id: string;
  from: 'agent' | 'creator';
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
}

// Mock data that both components will share
const mockInfluencers: OutreachInfluencer[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    handle: "@sarahjfitness",
    followers: "125K",
    niche: "Fashion"
  },
  {
    id: 2,
    name: "Mike Chen",
    handle: "@mikechentech",
    followers: "89K",
    niche: "Tech"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    handle: "@emmalifestyle",
    followers: "200K",
    niche: "Lifestyle"
  },
];

const mockOutreachLog: OutreachEntry[] = [
  {
    id: 1,
    influencer: "Sarah Johnson",
    handle: "@sarahjfitness",
    status: "replied",
    sentAt: "2 hours ago",
    template: "Fashion Collaboration",
    platform: "instagram",
    influencerId: 1
  },
  {
    id: 2,
    influencer: "Mike Chen",
    handle: "@mikechentech",
    status: "pending",
    sentAt: "1 day ago",
    template: "Tech Partnership",
    platform: "email",
    influencerId: 2
  },
  {
    id: 3,
    influencer: "Emma Rodriguez",
    handle: "@emmalifestyle",
    status: "replied",
    sentAt: "3 hours ago",
    template: "Lifestyle Brand",
    platform: "whatsapp",
    influencerId: 3
  },
];

const mockThreads: NegotiationThread[] = [
  {
    creatorId: "1",
    name: "Sarah Johnson",
    handle: "@sarahjfitness",
    platform: "instagram",
    avatar: "/api/placeholder/40/40",
    influencerId: 1,
    status: "replied",
    messages: [
      {
        id: "1",
        from: "agent",
        content: "Hi Sarah! We'd love to collaborate with you on our upcoming fitness campaign. Would you be interested in discussing rates?",
        timestamp: "2024-01-15T10:00:00Z",
        platform: "instagram"
      },
      {
        id: "2",
        from: "creator",
        content: "Hi! Yes, I'm definitely interested. What did you have in mind for the collaboration?",
        timestamp: "2024-01-15T10:30:00Z",
        platform: "instagram"
      },
      {
        id: "3",
        from: "agent",
        content: "We're looking at $500 for 3 posts and 5 stories. Would that work for you?",
        timestamp: "2024-01-15T11:00:00Z",
        platform: "instagram"
      },
      {
        id: "4",
        from: "creator",
        content: "That sounds fair! Can we discuss the content requirements in more detail?",
        timestamp: "2024-01-15T11:15:00Z",
        platform: "instagram"
      }
    ]
  },
  {
    creatorId: "2",
    name: "Mike Chen",
    handle: "@mikechentech",
    platform: "email",
    avatar: "/api/placeholder/40/40",
    influencerId: 2,
    status: "pending",
    messages: [
      {
        id: "5",
        from: "agent",
        content: "Hello Mike, we've been following your tech content and would love to partner with you for our product launch.",
        timestamp: "2024-01-14T15:00:00Z",
        platform: "email"
      }
    ]
  },
  {
    creatorId: "3",
    name: "Emma Rodriguez",
    handle: "@emmalifestyle",
    platform: "voice",
    avatar: "/api/placeholder/40/40",
    influencerId: 3,
    status: "replied",
    messages: [
      {
        id: "7",
        from: "agent",
        content: "Hi Emma! We left you a voice message about our lifestyle brand collaboration. Please let us know your thoughts!",
        timestamp: "2024-01-13T09:00:00Z",
        platform: "voice"
      },
      {
        id: "8",
        from: "creator",
        content: "Thanks for the voice note! I'm interested and would like to schedule a call to discuss further.",
        timestamp: "2024-01-13T12:00:00Z",
        platform: "voice"
      }
    ]
  }
];

export const useOutreachData = () => {
  const [influencers] = useState<OutreachInfluencer[]>(mockInfluencers);
  const [outreachLog, setOutreachLog] = useState<OutreachEntry[]>(mockOutreachLog);
  const [threads, setThreads] = useState<NegotiationThread[]>(mockThreads);

  // Function to add new outreach entry and update negotiations if needed
  const addOutreachEntry = (entry: Omit<OutreachEntry, 'id'>) => {
    const newEntry = { ...entry, id: Date.now() };
    setOutreachLog(prev => [newEntry, ...prev]);

    // If the entry has a status of 'replied', ensure there's a corresponding thread
    if (entry.status === 'replied') {
      setThreads(prev => {
        const existingThread = prev.find(thread => thread.influencerId === entry.influencerId);
        if (!existingThread) {
          const influencer = influencers.find(inf => inf.id === entry.influencerId);
          if (influencer) {
            const newThread: NegotiationThread = {
              creatorId: entry.influencerId.toString(),
              name: influencer.name,
              handle: influencer.handle,
              platform: entry.platform as 'instagram' | 'email' | 'voice',
              avatar: "/api/placeholder/40/40",
              influencerId: entry.influencerId,
              status: entry.status,
              messages: []
            };
            return [...prev, newThread];
          }
        }
        return prev;
      });
    }
  };

  // Function to update outreach status (e.g., when someone replies in negotiations)
  const updateOutreachStatus = (influencerId: number, status: OutreachEntry['status']) => {
    setOutreachLog(prev => 
      prev.map(entry => 
        entry.influencerId === influencerId 
          ? { ...entry, status } 
          : entry
      )
    );

    setThreads(prev =>
      prev.map(thread =>
        thread.influencerId === influencerId
          ? { ...thread, status }
          : thread
      )
    );
  };

  // Function to add message to thread
  const addMessageToThread = (threadId: string, message: Omit<NegotiationMessage, 'id'>) => {
    const newMessage = { ...message, id: Date.now().toString() };
    
    setThreads(prev =>
      prev.map(thread =>
        thread.creatorId === threadId
          ? { ...thread, messages: [...thread.messages, newMessage] }
          : thread
      )
    );

    // If it's a creator message, update the outreach status to 'replied'
    if (message.from === 'creator') {
      const thread = threads.find(t => t.creatorId === threadId);
      if (thread) {
        updateOutreachStatus(thread.influencerId, 'replied');
      }
    }
  };

  return {
    influencers,
    outreachLog,
    threads,
    addOutreachEntry,
    updateOutreachStatus,
    addMessageToThread
  };
};
