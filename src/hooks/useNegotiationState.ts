import { AgentStatus } from "@/types/outreach";
import { useThreadSelection } from "@/hooks/useThreadSelection";
import { useThreadsManagement } from "@/hooks/useThreadsManagement";
import { useMessageHandling } from "@/hooks/useMessageHandling";
import { useAIResponseHandling } from "@/hooks/useAIResponseHandling";
import { usePollingHandling } from "@/hooks/usePollingHandling";
import { useStatusHandling } from "@/hooks/useStatusHandling";
import { useCallHandling } from "@/hooks/useCallHandling";

export const useNegotiationState = (campaignId?: string) => {
  const {
    selectedThread,
    setSelectedThread,
    aiResponseInput,
    setAiResponseInput,
    handleSelectThread
  } = useThreadSelection();

  const {
    negotiationThreads,
    updateThread,
    loading,
    error
  } = useThreadsManagement(selectedThread, setSelectedThread);

  const { handleSendMessage } = useMessageHandling();
  const { handleAIResponse } = useAIResponseHandling();
  const { handlePoll } = usePollingHandling();
  const { handleStatusChange } = useStatusHandling();
  const { handleCall } = useCallHandling();

  // Wrapper functions to maintain the same API
  const wrappedHandleSendMessage = async (content: string, platform: string) => {
    await handleSendMessage(selectedThread, campaignId, content, platform, updateThread);
  };

  const wrappedHandleStatusChange = (newStatus: AgentStatus) => {
    handleStatusChange(selectedThread, newStatus, updateThread);
  };

  const wrappedHandleAIResponse = async () => {
    await handleAIResponse(selectedThread, setAiResponseInput);
  };

  const wrappedHandlePoll = async () => {
    await handlePoll(selectedThread, campaignId, updateThread);
  };

  const wrappedHandleCall = async () => {
    await handleCall(selectedThread, campaignId);
  };

  return {
    selectedThread,
    negotiationThreads,
    aiResponseInput,
    setAiResponseInput,
    loading,
    error,
    handleSelectThread,
    handleSendMessage: wrappedHandleSendMessage,
    handleStatusChange: wrappedHandleStatusChange,
    handleAIResponse: wrappedHandleAIResponse,
    handlePoll: wrappedHandlePoll,
    handleCall: wrappedHandleCall
  };
};
