
import { NegotiationThread, NegotiationMessage } from "@/types/outreach";
import { useNegotiationAPI } from "@/hooks/useNegotiationAPI";

export const usePollingHandling = () => {
  const { pollConversation } = useNegotiationAPI();

  const handlePoll = async (
    selectedThread: NegotiationThread | undefined,
    campaignId: string | undefined,
    updateThread: (updatedThread: NegotiationThread) => void
  ) => {
    if (!selectedThread || !campaignId) return;

    try {
      console.log('Polling for latest conversation updates...');
      
      const pollResults = await pollConversation(
        campaignId, // Use the actual campaign ID instead of hardcoded value
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
        updateThread(updatedThread);
      } else {
        console.log('No new messages found in poll');
      }
    } catch (err) {
      console.error('Failed to poll conversation:', err);
    }
  };

  return {
    handlePoll
  };
};
