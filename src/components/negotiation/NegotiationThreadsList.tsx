
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
      polling: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Polling' },
      chatting: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Active' },
      waitingPhone: { bg: 'bg-yellow-50', text: 'text-yellow-700', label: 'Waiting' },
      calling: { bg: 'bg-purple-50', text: 'text-purple-700', label: 'On Call' },
      complete: { bg: 'bg-green-50', text: 'text-green-700', label: 'Complete' }
    };

    const config = configs[status];
    return (
      <Badge className={`${config.bg} ${config.text} rounded-full px-3 py-1 text-xs font-medium border-0`}>
        {config.label}
      </Badge>
    );
  };

  // Filter threads that have messages or agent activity
  const activeThreads = threads.filter(thread => 
    thread.messages.length > 0 || thread.agentStatus !== 'polling'
  );

  return (
    <Card className="h-full bg-white shadow-apple rounded-2xl border-0">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-[#1D1D1F] font-sans tracking-tight">
          Active Negotiations
        </h2>
        <p className="text-sm text-[#6E6E73] font-sans mt-1">
          {activeThreads.length} creators in pipeline
        </p>
      </div>
      
      <div className="p-3 space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto">
        {activeThreads.map((thread) => (
          <div
            key={thread.creatorId}
            onClick={() => onSelectThread(thread)}
            className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
              selectedThreadId === thread.creatorId 
                ? 'bg-blue-50 border border-blue-200 shadow-sm transform scale-[1.02]' 
                : 'hover:bg-gray-50 hover:shadow-sm'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="relative">
                <Avatar className="h-12 w-12 ring-2 ring-white shadow-apple">
                  <AvatarImage src={thread.avatar} alt={thread.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium text-sm">
                    {thread.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                {/* Status indicator dot */}
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white shadow-sm ${
                  thread.agentStatus === 'chatting' ? 'bg-blue-500' :
                  thread.agentStatus === 'calling' ? 'bg-purple-500' :
                  thread.agentStatus === 'complete' ? 'bg-green-500' :
                  'bg-gray-400'
                }`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-[#1D1D1F] font-sans text-sm truncate">
                    {thread.name}
                  </h3>
                  <Badge className="bg-gray-100 text-[#6E6E73] rounded-full px-2 py-1 text-xs border-0 flex items-center gap-1 ml-2">
                    {getPlatformIcon(thread.platform)}
                  </Badge>
                </div>
                
                <p className="text-xs text-[#6E6E73] font-sans mb-3">
                  {thread.handle}
                </p>
                
                {getStatusBadge(thread.agentStatus)}
                
                {thread.messages.length > 0 && (
                  <p className="text-xs text-[#8E8E93] font-sans mt-3 truncate leading-relaxed">
                    {thread.messages[thread.messages.length - 1]?.content || 'No messages yet'}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {activeThreads.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail className="h-10 w-10 text-[#6E6E73]" />
            </div>
            <p className="text-[#6E6E73] font-sans text-lg">
              No active negotiations yet
            </p>
            <p className="text-[#8E8E93] font-sans text-sm mt-1">
              Start outreach to see conversations here
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default NegotiationThreadsList;
