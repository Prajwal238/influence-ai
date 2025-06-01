
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { NegotiationThread } from "@/types/outreach";

interface NegotiationOverviewTabProps {
  selectedThread: NegotiationThread;
}

const NegotiationOverviewTab = ({ selectedThread }: NegotiationOverviewTabProps) => {
  const getStatusBadge = (status: string) => {
    const configs = {
      polling: { bg: 'bg-[#F2F2F7]', text: 'text-[#6E6E73]', label: 'Polling' },
      chatting: { bg: 'bg-[#E0F3FF]', text: 'text-[#0071E3]', label: 'Chatting' },
      waitingPhone: { bg: 'bg-[#FFF4E6]', text: 'text-[#FF9500]', label: 'Waiting Phone' },
      calling: { bg: 'bg-[#F0E6FF]', text: 'text-[#7B68EE]', label: 'Calling' },
      complete: { bg: 'bg-[#E6F7ED]', text: 'text-[#34C759]', label: 'Complete' }
    };

    const config = configs[status as keyof typeof configs] || configs.polling;
    return (
      <Badge className={`${config.bg} ${config.text} rounded-full px-3 py-1 text-xs font-medium border-0 font-['SF_Pro_Text']`}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="px-6 h-full overflow-y-auto">
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
            Current Status
          </h4>
          {getStatusBadge(selectedThread.agentStatus)}
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
            Control Mode
          </h4>
          <Badge className={`${
            selectedThread.controlMode === 'agent' 
              ? 'bg-[#E0F3FF] text-[#0071E3]' 
              : 'bg-[#E6F7ED] text-[#34C759]'
          } rounded-full px-3 py-1 text-xs font-medium border-0 font-sans`}>
            {selectedThread.controlMode === 'agent' ? 'AI Agent' : 'Manual'}
          </Badge>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
            Platform
          </h4>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#1D1D1F] font-sans">
              In<span className="text-[#0071E3] font-medium">flow</span>encer.ai
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
            Last Activity
          </h4>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-[#6E6E73]" />
            <span className="text-sm text-[#6E6E73] font-sans">
              {new Date(selectedThread.lastActivity).toLocaleString()}
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
            Messages
          </h4>
          <p className="text-sm text-[#6E6E73] font-sans">
            {selectedThread.messages.length} total messages
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
            Next Steps
          </h4>
          <p className="text-sm text-[#6E6E73] font-sans leading-relaxed">
            {selectedThread.agentStatus === 'polling' && 'Waiting for creator response'}
            {selectedThread.agentStatus === 'chatting' && 'Actively negotiating terms'}
            {selectedThread.agentStatus === 'waitingPhone' && 'Requesting phone number for call'}
            {selectedThread.agentStatus === 'calling' && 'On active voice call'}
            {selectedThread.agentStatus === 'complete' && 'Negotiation finished'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NegotiationOverviewTab;
