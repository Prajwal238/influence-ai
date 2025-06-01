
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Instagram, Mail, Mic } from "lucide-react";
import { NegotiationThread, AgentStatus } from "@/pages/campaigns/Negotiation";

interface NegotiationThreadsListProps {
  threads: NegotiationThread[];
  selectedThreadId?: string;
  onSelectThread: (thread: NegotiationThread) => void;
}

const NegotiationThreadsList = ({ threads, selectedThreadId, onSelectThread }: NegotiationThreadsListProps) => {
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

  const getStatusBadge = (status: AgentStatus) => {
    const configs = {
      polling: { bg: 'bg-gray-200', text: 'text-gray-600', label: 'Polling' },
      chatting: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Chatting' },
      waitingPhone: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Waiting Phone' },
      calling: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Calling' },
      complete: { bg: 'bg-green-100', text: 'text-green-700', label: 'Complete' }
    };

    const config = configs[status];
    return (
      <Badge className={`${config.bg} ${config.text} rounded-full px-2 py-1 text-xs border-0`}>
        {config.label}
      </Badge>
    );
  };

  // Filter threads that have messages or agent activity
  const activeThreads = threads.filter(thread => 
    thread.messages.length > 0 || thread.agentStatus !== 'polling'
  );

  return (
    <Card className="h-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.05)] rounded-2xl">
      <div className="p-4 border-b border-[#F2F2F7]">
        <h2 className="text-xl font-semibold text-[#1D1D1F] font-['SF_Pro_Display']">
          Active Negotiations
        </h2>
        <p className="text-sm text-[#6E6E73] font-['SF_Pro_Text'] mt-1">
          {activeThreads.length} creators in pipeline
        </p>
      </div>
      
      <div className="p-2 space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto">
        {activeThreads.map((thread) => (
          <div
            key={thread.creatorId}
            onClick={() => onSelectThread(thread)}
            className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${
              selectedThreadId === thread.creatorId 
                ? 'bg-[#E0F3FF] border border-[#0071E3]' 
                : 'hover:bg-[#F2F2F7] hover:shadow-sm'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="relative">
                <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                  <AvatarImage src={thread.avatar} alt={thread.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium text-sm">
                    {thread.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                {/* Status indicator dot */}
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                  thread.agentStatus === 'chatting' ? 'bg-blue-500' :
                  thread.agentStatus === 'calling' ? 'bg-purple-500' :
                  thread.agentStatus === 'complete' ? 'bg-green-500' :
                  'bg-gray-400'
                }`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-[#1D1D1F] font-['SF_Pro_Display'] text-sm truncate">
                    {thread.name}
                  </h3>
                  <Badge className="bg-[#F2F2F7] text-[#6E6E73] rounded-full px-2 py-1 text-xs border-0 flex items-center gap-1 ml-2">
                    {getPlatformIcon(thread.platform)}
                  </Badge>
                </div>
                
                <p className="text-xs text-[#6E6E73] font-['SF_Pro_Text'] mb-2">
                  {thread.handle}
                </p>
                
                {getStatusBadge(thread.agentStatus)}
                
                {thread.messages.length > 0 && (
                  <p className="text-xs text-[#8E8E93] font-['SF_Pro_Text'] mt-2 truncate">
                    {thread.messages[thread.messages.length - 1]?.content || 'No messages yet'}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {activeThreads.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#F2F2F7] rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-[#6E6E73]" />
            </div>
            <p className="text-[#6E6E73] font-['SF_Pro_Text']">
              No active negotiations yet
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default NegotiationThreadsList;
