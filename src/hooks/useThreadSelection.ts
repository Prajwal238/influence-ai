
import { useState } from "react";
import { NegotiationThread } from "@/types/outreach";

export const useThreadSelection = () => {
  const [selectedThread, setSelectedThread] = useState<NegotiationThread | undefined>();
  const [aiResponseInput, setAiResponseInput] = useState<string>('');

  const handleSelectThread = (thread: NegotiationThread) => {
    setSelectedThread(thread);
    setAiResponseInput(''); // Clear AI response input when switching threads
  };

  return {
    selectedThread,
    setSelectedThread,
    aiResponseInput,
    setAiResponseInput,
    handleSelectThread
  };
};
