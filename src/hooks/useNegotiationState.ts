import { useState, useEffect } from "react";
import { NegotiationThread, NegotiationMessage, AgentStatus } from "@/types/outreach";
import { useNegotiationAPI } from "@/hooks/useNegotiationAPI";

export const useNegotiationState = () => {
  const [selectedThread, setSelectedThread] = useState<NegotiationThread | undefined>();
  const [negotiationThreads, setNegotiationThreads] = useState<NegotiationThread[]>([]);
  const [aiResponseInput, setAiResponseInput] = useState<string>('');
  const { fetchAllInfluencerConversations, pollConversation, sendMessage, getAIResponse, loading, error } = useNegotiationAPI();

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
  }, [fetchAllInfluencerConversations]);

  const handleSelectThread = (thread: NegotiationThread) => {
    setSelectedThread(thread);
    setAiResponseInput(''); // Clear AI response input when switching threads
  };

  const handleSendMessage = async (content: string, platform: string) => {
    if (!selectedThread) return;

    const newMessage: NegotiationMessage = {
      id: `msg-${Date.now()}`,
      from: 'user',
      content,
      timestamp: new Date().toISOString(),
      platform: platform as 'instagram' | 'email' | 'voice'
    };

    // Update selected thread immediately for UI responsiveness
    const updatedThread: NegotiationThread = {
      ...selectedThread,
      messages: [...selectedThread.messages, newMessage],
      lastActivity: new Date().toISOString()
    };
    setSelectedThread(updatedThread);

    // Update threads list
    setNegotiationThreads(prev => 
      prev.map(thread => 
        thread.creatorId === selectedThread.creatorId ? updatedThread : thread
      )
    );

    // Call API to send message
    try {
      const campaignId = 'summer_fashion_2024'; // Extract from route if needed
      await sendMessage(campaignId, selectedThread.platform, selectedThread.name, content);
      console.log('Message sent to API successfully');
    } catch (err) {
      console.error('Failed to send message to API:', err);
      // Optionally show error to user or revert UI changes
    }
  };

  const handleStatusChange = (newStatus: AgentStatus) => {
    if (!selectedThread) return;

    const updatedThread: NegotiationThread = {
      ...selectedThread,
      agentStatus: newStatus
    };
    setSelectedThread(updatedThread);

    // Update threads list
    setNegotiationThreads(prev => 
      prev.map(thread => 
        thread.creatorId === selectedThread.creatorId ? updatedThread : thread
      )
    );
  };

  const handleAIResponse = async () => {
    if (!selectedThread) return;

    try {
      console.log('Getting AI response for conversation...');
      const aiMessage = await getAIResponse(selectedThread.messages);
      setAiResponseInput(aiMessage);
      console.log('AI response received and set in input:', aiMessage);
    } catch (err) {
      console.error('Failed to get AI response:', err);
    }
  };

  const handlePoll = async () => {
    if (!selectedThread) return;

    try {
      console.log('Polling for latest conversation updates...');
      
      // Extract campaign ID from URL or use default
      const campaignId = 'summer_fashion_2024'; // This could be extracted from the route
      
      const pollResults = await pollConversation(
        campaignId,
        selectedThread.platform,
        selectedThread.name
      );

      // Transform poll results to messages and check for duplicates
      const existingMessageContents = new Set(selectedThread.messages.map(msg => msg.content));
      
      const newMessages: NegotiationMessage[] = pollResults
        .filter(pollMsg => !existingMessageContents.has(pollMsg.message))
        .map((pollMsg, index) => ({
          id: `poll-${Date.now()}-${index}`,
          from: pollMsg.role === 'negotiator' ? 'agent' : 'creator',
          content: pollMsg.message,
          timestamp: new Date().toISOString(),
          platform: selectedThread.platform
        }));

      if (newMessages.length > 0) {
        console.log(`Adding ${newMessages.length} new messages from poll`);
        
        // Update selected thread with new messages
        const updatedThread: NegotiationThread = {
          ...selectedThread,
          messages: [...selectedThread.messages, ...newMessages],
          lastActivity: new Date().toISOString()
        };
        setSelectedThread(updatedThread);

        // Update threads list
        setNegotiationThreads(prev => 
          prev.map(thread => 
            thread.creatorId === selectedThread.creatorId ? updatedThread : thread
          )
        );
      } else {
        console.log('No new messages found in poll');
      }
    } catch (err) {
      console.error('Failed to poll conversation:', err);
    }
  };

  return {
    selectedThread,
    negotiationThreads,
    aiResponseInput,
    setAiResponseInput,
    loading,
    error,
    handleSelectThread,
    handleSendMessage,
    handleStatusChange,
    handleAIResponse,
    handlePoll
  };
};
