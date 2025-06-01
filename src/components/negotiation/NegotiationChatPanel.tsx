
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";
import { NegotiationThread, AgentStatus } from "@/types/outreach";
import NegotiationChatHeader from "./NegotiationChatHeader";
import NegotiationMessagesList from "./NegotiationMessagesList";
import NegotiationActionBar from "./NegotiationActionBar";

interface NegotiationChatPanelProps {
  selectedThread?: NegotiationThread;
  onSendMessage: (content: string, platform: string) => void;
  onStatusChange: (status: AgentStatus) => void;
  onAIResponse?: () => void;
  onPoll?: () => void;
}

const NegotiationChatPanel = ({ 
  selectedThread, 
  onSendMessage, 
  onStatusChange,
  onAIResponse,
  onPoll
}: NegotiationChatPanelProps) => {
  if (!selectedThread) {
    return (
      <Card className="h-full bg-white shadow-apple rounded-2xl border-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#F2F2F7] rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-[#6E6E73]" />
          </div>
          <h3 className="text-xl font-semibold text-[#1D1D1F] font-sans tracking-tight mb-2">
            Select a negotiation
          </h3>
          <p className="text-[#6E6E73] font-sans">
            Choose a creator from the list to view the conversation
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full bg-white shadow-apple rounded-2xl border-0 flex flex-col">
      <NegotiationChatHeader selectedThread={selectedThread} />
      
      <NegotiationMessagesList messages={selectedThread.messages} />
      
      <NegotiationActionBar
        selectedThread={selectedThread}
        onSendMessage={onSendMessage}
        onStatusChange={onStatusChange}
        onAIResponse={onAIResponse}
        onPoll={onPoll}
      />
    </Card>
  );
};

export default NegotiationChatPanel;
