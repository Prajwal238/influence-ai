
import { useState, useEffect, useCallback } from 'react';
import { NegotiationThread } from '@/types/outreach';
import { useNegotiationAPI } from '@/hooks/useNegotiationAPI';
import { useContactExtraction } from '@/hooks/useContactExtraction';

export const useThreadsManagement = (
  selectedThread: NegotiationThread | undefined,
  setSelectedThread: (thread: NegotiationThread | undefined) => void,
  campaignId?: string
) => {
  const [negotiationThreads, setNegotiationThreads] = useState<NegotiationThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { fetchAllInfluencerConversations } = useNegotiationAPI();

  const loadThreads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const threads = await fetchAllInfluencerConversations(campaignId);
      setNegotiationThreads(threads);
      
      // If no thread is selected and we have threads, select the first one
      if (!selectedThread && threads.length > 0) {
        setSelectedThread(threads[0]);
      }
    } catch (err) {
      console.error('Failed to load threads:', err);
      setError(err instanceof Error ? err.message : 'Failed to load conversations');
    } finally {
      setLoading(false);
    }
  }, [fetchAllInfluencerConversations, campaignId, selectedThread, setSelectedThread]);

  useEffect(() => {
    loadThreads();
  }, [loadThreads]);

  const updateThread = useCallback((updatedThread: NegotiationThread) => {
    setNegotiationThreads(prev => 
      prev.map(thread => 
        thread.creatorId === updatedThread.creatorId ? updatedThread : thread
      )
    );
    
    // Update selected thread if it's the one being updated
    if (selectedThread?.creatorId === updatedThread.creatorId) {
      setSelectedThread(updatedThread);
    }
  }, [selectedThread, setSelectedThread]);

  return {
    negotiationThreads,
    updateThread,
    loading,
    error
  };
};
