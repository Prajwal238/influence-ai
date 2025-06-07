
import { NegotiationThread, NegotiationMessage } from "@/types/outreach";
import { useNegotiationAPI } from "@/hooks/useNegotiationAPI";

export const useMessageHandling = () => {
  const { sendMessage } = useNegotiationAPI();

  const handleSendMessage = async (
    selectedThread: NegotiationThread | undefined,
    campaignId: string | undefined,
    content: string,
    platform: string,
    updateThread: (updatedThread: NegotiationThread) => void
  ) => {
    if (!selectedThread || !campaignId) return;

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
    
    updateThread(updatedThread);

    // Call API to send message using the actual campaign ID
    try {
      await sendMessage(campaignId, selectedThread.platform, selectedThread.name, content);
      console.log('Message sent to API successfully');
    } catch (err) {
      console.error('Failed to send message to API:', err);
      // Optionally show error to user or revert UI changes
    }
  };

  return {
    handleSendMessage
  };
};
