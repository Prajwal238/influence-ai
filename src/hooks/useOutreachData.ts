
import { useState } from 'react';
import { OutreachInfluencer, OutreachEntry, NegotiationThread, NegotiationMessage } from '@/types/outreach';
import { mockInfluencers, createInitialOutreachLog, createInitialThreads } from '@/data/outreachMockData';

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

// Re-export types for compatibility with existing components
export type { OutreachInfluencer, OutreachEntry, NegotiationMessage, NegotiationThread } from '@/types/outreach';
