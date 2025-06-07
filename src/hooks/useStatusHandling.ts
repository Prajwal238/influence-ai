
import { NegotiationThread, AgentStatus } from "@/types/outreach";

export const useStatusHandling = () => {
  const handleStatusChange = (
    selectedThread: NegotiationThread | undefined,
    newStatus: AgentStatus,
    updateThread: (updatedThread: NegotiationThread) => void
  ) => {
    if (!selectedThread) return;

    const updatedThread: NegotiationThread = {
      ...selectedThread,
      agentStatus: newStatus
    };
    updateThread(updatedThread);
  };

  return {
    handleStatusChange
  };
};
