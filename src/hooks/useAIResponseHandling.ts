
import { NegotiationThread } from "@/types/outreach";
import { useNegotiationAPI } from "@/hooks/useNegotiationAPI";

export const useAIResponseHandling = () => {
  const { getAIResponse } = useNegotiationAPI();

  const handleAIResponse = async (
    selectedThread: NegotiationThread | undefined,
    setAiResponseInput: (value: string) => void
  ) => {
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

  return {
    handleAIResponse
  };
};
