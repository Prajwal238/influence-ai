
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Instagram, Mail, Mic } from "lucide-react";

interface Message {
  id: string;
  from: 'agent' | 'creator';
  content: string;
  timestamp: string;
  platform: 'instagram' | 'email' | 'voice';
}

interface Thread {
  creatorId: string;
  name: string;
  handle: string;
  platform: 'instagram' | 'email' | 'voice';
  messages: Message[];
  avatar?: string;
}

interface ThreadsListProps {
  threads: Thread[];
  selectedThreadId?: string;
  onSelectThread: (thread: Thread) => void;
}

const ThreadsList = ({ threads, selectedThreadId, onSelectThread }: ThreadsListProps) => {
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

  const getPlatformLabel = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return 'Instagram';
      case 'email':
        return 'Email';
      case 'voice':
        return 'Voice';
      default:
        return 'Email';
    }
  };

  // Filter threads that have at least one creator message
  const activeThreads = threads.filter(thread => 
    thread.messages.some(message => message.from === 'creator')
  );

  return (
    <Card className="h-full bg-white shadow-sm border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Active Negotiations
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {activeThreads.length} creators responded
        </p>
      </div>
      
      <div className="p-2 space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
        {activeThreads.map((thread) => (
          <div
            key={thread.creatorId}
            onClick={() => onSelectThread(thread)}
            className={`p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
              selectedThreadId === thread.creatorId 
                ? 'bg-blue-50 border border-blue-200' 
                : 'hover:shadow-sm'
            }`}
          >
            <div className="flex items-start space-x-3">
              <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                <AvatarImage src={thread.avatar} alt={thread.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
                  {thread.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 truncate">
                    {thread.name}
                  </h3>
                  <Badge className="bg-blue-100 text-blue-800 rounded-full px-2 text-xs border-0 ml-2 flex items-center gap-1">
                    {getPlatformIcon(thread.platform)}
                    {getPlatformLabel(thread.platform)}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 mt-1">
                  {thread.handle}
                </p>
                
                <p className="text-xs text-gray-500 mt-2 truncate">
                  {thread.messages[thread.messages.length - 1]?.content || 'No messages yet'}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {activeThreads.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">
              No active negotiations yet
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ThreadsList;
