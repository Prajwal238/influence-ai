
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

// Unified mock data - single source of truth
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

// Create initial outreach entries with proper synchronization
const createInitialOutreachLog = (): OutreachEntry[] => [
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
    status: "sent",
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

// Create initial threads based on outreach entries
const createInitialThreads = (outreachLog: OutreachEntry[]): NegotiationThread[] => {
  return outreachLog
    .filter(entry => entry.status === 'replied')
    .map(entry => {
      const influencer = mockInfluencers.find(inf => inf.id === entry.influencerId);
      if (!influencer) return null;

      const baseMessages: NegotiationMessage[] = [
        {
          id: `${entry.influencerId}_1`,
          from: "agent",
          content: `Hi ${influencer.name}! We'd love to collaborate with you on our upcoming ${influencer.niche.toLowerCase()} campaign. Would you be interested in discussing rates?`,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          platform: entry.platform as 'instagram' | 'email' | 'voice'
        },
        {
          id: `${entry.influencerId}_2`,
          from: "creator",
          content: "Hi! Yes, I'm definitely interested. What did you have in mind for the collaboration?",
          timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
          platform: entry.platform as 'instagram' | 'email' | 'voice'
        }
      ];

      // Add more messages for some threads
      if (entry.influencerId === 1) {
        baseMessages.push(
          {
            id: `${entry.influencerId}_3`,
            from: "agent",
            content: "We're looking at $500 for 3 posts and 5 stories. Would that work for you?",
            timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
            platform: entry.platform as 'instagram' | 'email' | 'voice'
          },
          {
            id: `${entry.influencerId}_4`,
            from: "creator",
            content: "That sounds fair! Can we discuss the content requirements in more detail?",
            timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
            platform: entry.platform as 'instagram' | 'email' | 'voice'
          }
        );
      }

      return {
        creatorId: entry.influencerId.toString(),
        name: influencer.name,
        handle: influencer.handle,
        platform: entry.platform as 'instagram' | 'email' | 'voice',
        avatar: "/api/placeholder/40/40",
        influencerId: entry.influencerId,
        status: entry.status,
        messages: baseMessages
      };
    })
    .filter(Boolean) as NegotiationThread[];
};

export const useOutreachData = () => {
  // Initialize data with proper synchronization
  const initialOutreachLog = createInitialOutreachLog();
  const [influencers] = useState<OutreachInfluencer[]>(mockInfluencers);
  const [outreachLog, setOutreachLog] = useState<OutreachEntry[]>(initialOutreachLog);
  const [threads, setThreads] = useState<NegotiationThread[]>(() => createInitialThreads(initialOutreachLog));

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
              messages: [
                {
                  id: `${entry.influencerId}_initial`,
                  from: "agent",
                  content: `Hi ${influencer.name}! Thank you for your interest in collaborating with us.`,
                  timestamp: new Date().toISOString(),
                  platform: entry.platform as 'instagram' | 'email' | 'voice'
                }
              ]
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
