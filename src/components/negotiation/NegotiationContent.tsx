
import NegotiationThreadsList from "./NegotiationThreadsList";
import NegotiationChatPanel from "./NegotiationChatPanel";
import NegotiationSidePanel from "./NegotiationSidePanel";
import { NegotiationThread, AgentStatus } from "@/types/outreach";

interface NegotiationContentProps {
  selectedThread?: NegotiationThread;
  negotiationThreads: NegotiationThread[];
  onSelectThread: (thread: NegotiationThread) => void;
  onSendMessage: (content: string, platform: string) => void;
  onStatusChange: (status: AgentStatus) => void;
  onAIResponse: () => void;
  onPoll: () => void;
  aiResponseInput?: string;
  onAiResponseInputChange?: (value: string) => void;
}

const NegotiationContent = ({
  selectedThread,
  negotiationThreads,
  onSelectThread,
  onSendMessage,
  onStatusChange,
  onAIResponse,
  onPoll,
  aiResponseInput,
  onAiResponseInputChange
}: NegotiationContentProps) => {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#1D1D1F] font-sans tracking-tight">
            Negotiation
          </h1>
          <p className="text-[#6E6E73] font-sans mt-2 text-lg">
            AI-powered negotiations with real-time agent control
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          {/* Threads List - 3 columns */}
          <div className="col-span-12 lg:col-span-3">
            <NegotiationThreadsList
              threads={negotiationThreads}
              selectedThreadId={selectedThread?.creatorId}
              onSelectThread={onSelectThread}
            />
          </div>

          {/* Chat & Control Panel - 5 columns */}
          <div className="col-span-12 lg:col-span-5">
            <NegotiationChatPanel
              selectedThread={selectedThread}
              onSendMessage={onSendMessage}
              onStatusChange={onStatusChange}
              onAIResponse={onAIResponse}
              onPoll={onPoll}
              aiResponseInput={aiResponseInput}
              onAiResponseInputChange={onAiResponseInputChange}
            />
          </div>

          {/* Side Panel - 4 columns */}
          <div className="col-span-12 lg:col-span-4">
            <NegotiationSidePanel
              selectedThread={selectedThread}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NegotiationContent;
