
import { useState } from 'react';
import { OutreachEntry, NegotiationThread, NegotiationMessage } from '@/types/outreach';
import { createInitialOutreachLog, createInitialThreads } from '@/data/outreachMockData';

export const useOutreachData = () => {
  // Initialize data with mock data for now (will be replaced by API later)
  const initialOutreachLog = createInitialOutreachLog();
  const [outreachLog, setOutreachLog] = useState<OutreachEntry[]>(initialOutreachLog);
  const [threads, setThreads] = useState<NegotiationThread[]>(() => createInitialThreads(initialOutreachLog));

  // Function to add new outreach entry
  const addOutreachEntry = (entry: Omit<OutreachEntry, 'id'>) => {
    const newEntry = { ...entry, id: Date.now() };
    setOutreachLog(prev => [newEntry, ...prev]);

    // If the entry has a status of 'replied', ensure there's a corresponding thread
    if (entry.status === 'replied') {
      setThreads(prev => {
        const existingThread = prev.find(thread => thread.influencerId === entry.influencerId);
        if (!existingThread) {
          const newThread: NegotiationThread = {
            creatorId: entry.influencerId.toString(),
            name: entry.influencer,
            handle: entry.handle,
            platform: entry.platform as 'instagram' | 'email' | 'voice',
            avatar: "/api/placeholder/40/40",
            influencerId: entry.influencerId,
            status: entry.status,
            messages: [
              {
                id: `${entry.influencerId}_initial`,
                from: "agent",
                content: `Hi ${entry.influencer}! Thank you for your interest in collaborating with us.`,
                timestamp: new Date().toISOString(),
                platform: entry.platform as 'instagram' | 'email' | 'voice'
              }
            ]
          };
          return [...prev, newThread];
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
    outreachLog,
    threads,
    addOutreachEntry,
    updateOutreachStatus,
    addMessageToThread
  };
};

// Re-export types for compatibility with existing components
export type { OutreachEntry, NegotiationMessage, NegotiationThread } from '@/types/outreach';
