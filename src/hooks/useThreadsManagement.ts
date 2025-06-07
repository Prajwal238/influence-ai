
import { useState, useEffect } from "react";
import { NegotiationThread } from "@/types/outreach";
import { useNegotiationAPI } from "@/hooks/useNegotiationAPI";
import { useContactExtraction } from "@/hooks/useContactExtraction";

export const useThreadsManagement = (
  selectedThread: NegotiationThread | undefined,
  setSelectedThread: (thread: NegotiationThread) => void
) => {
  const [negotiationThreads, setNegotiationThreads] = useState<NegotiationThread[]>([]);
  const { fetchAllInfluencerConversations, loading, error } = useNegotiationAPI();

  // Extract contact info from selected thread messages
  const extractedContact = useContactExtraction(selectedThread?.messages || []);

  // Update selected thread with extracted contact information
  useEffect(() => {
    if (selectedThread && (extractedContact.email || extractedContact.phone)) {
      const updatedThread: NegotiationThread = {
        ...selectedThread,
        contact: {
          ...selectedThread.contact,
          ...(extractedContact.email && { email: extractedContact.email }),
          ...(extractedContact.phone && { phone: extractedContact.phone })
        }
      };
      
      // Only update if there's actually a change
      if (
        updatedThread.contact?.email !== selectedThread.contact?.email ||
        updatedThread.contact?.phone !== selectedThread.contact?.phone
      ) {
        setSelectedThread(updatedThread);
        
        // Update the thread in the list as well
        setNegotiationThreads(prev => 
          prev.map(thread => 
            thread.creatorId === selectedThread.creatorId ? updatedThread : thread
          )
        );
      }
    }
  }, [extractedContact, selectedThread, setSelectedThread]);

  // Fetch conversations when component mounts
  useEffect(() => {
    const loadConversations = async () => {
      try {
        const threads = await fetchAllInfluencerConversations();
        setNegotiationThreads(threads);
        
        // Auto-select first non-complete thread
        if (threads.length > 0) {
          const firstActiveThread = threads.find(t => t.agentStatus !== 'complete') || threads[0];
          setSelectedThread(firstActiveThread);
        }
      } catch (err) {
        console.error('Failed to load conversations:', err);
      }
    };

    loadConversations();
  }, [fetchAllInfluencerConversations, setSelectedThread]);

  const updateThread = (updatedThread: NegotiationThread) => {
    setSelectedThread(updatedThread);

    // Update threads list
    setNegotiationThreads(prev => 
      prev.map(thread => 
        thread.creatorId === updatedThread.creatorId ? updatedThread : thread
      )
    );
  };

  return {
    negotiationThreads,
    setNegotiationThreads,
    updateThread,
    loading,
    error
  };
};
