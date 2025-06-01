
import { Badge } from "@/components/ui/badge";
import { Instagram, Mail, Mic, Bot, User } from "lucide-react";
import { NegotiationThread, AgentStatus } from "@/types/outreach";

interface NegotiationChatHeaderProps {
  selectedThread: NegotiationThread;
}

const NegotiationChatHeader = ({ selectedThread }: NegotiationChatHeaderProps) => {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-3 w-3" />;
      case 'email':
        return <Mail className="h-3 w-3" />;
      case 'voice':
        return <Mic className="h-3 w-3" />;
      default:
        return <Mail className="h-3 w-3" />;
    }
  };

  const getStatusIndicator = (status: AgentStatus) => {
    const configs = {
      polling: { dot: 'bg-[#8E8E93]', text: 'Polling for replies...' },
      chatting: { dot: 'bg-[#0071E3]', text: 'Actively chatting' },
      waitingPhone: { dot: 'bg-[#FF9500]', text: 'Waiting for phone number' },
      calling: { dot: 'bg-[#7B68EE]', text: 'On call' },
      complete: { dot: 'bg-[#34C759]', text: 'Negotiation complete' }
    };

    const config = configs[status];
    return (
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
        <span className="text-sm text-[#6E6E73] font-sans">{config.text}</span>
      </div>
    );
  };

  return (
    <div className="p-6 border-b border-[#F2F2F7]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div>
            <h3 className="text-xl font-semibold text-[#1D1D1F] font-sans tracking-tight">
              {selectedThread.name}
            </h3>
            <p className="text-sm text-[#6E6E73] font-sans">
              {selectedThread.handle}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Badge className="bg-[#E0F3FF] text-[#0071E3] rounded-full px-3 py-1 text-xs font-medium border-0 flex items-center gap-2 font-sans">
            {getPlatformIcon(selectedThread.platform)}
            {selectedThread.platform.charAt(0).toUpperCase() + selectedThread.platform.slice(1)}
          </Badge>
          <div className="text-sm text-[#6E6E73] font-sans">
            via In<span className="text-[#0071E3] font-medium">flow</span>encer.ai
          </div>
        </div>
      </div>
      
      {getStatusIndicator(selectedThread.agentStatus)}
    </div>
  );
};

export default NegotiationChatHeader;
