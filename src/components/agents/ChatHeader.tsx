
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { X, Bot } from "lucide-react";
import SessionsPanel from './SessionsPanel';

interface ChatHeaderProps {
  agentName: string;
  agentType: 'campaign' | 'discovery' | 'outreach' | 'negotiation';
  onClose?: () => void;
  currentSessionId: string;
  onSessionChange: (sessionId: string) => void;
  onNewSession: () => void;
}

const ChatHeader = ({
  agentName,
  agentType,
  onClose,
  currentSessionId,
  onSessionChange,
  onNewSession
}: ChatHeaderProps) => {
  return (
    <CardHeader className="border-b border-gray-100/60 pb-5 pt-8 px-8 bg-transparent flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-sm">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900 tracking-tight">
              {agentName}
            </CardTitle>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
              <p className="text-xs text-gray-500 font-medium">Online</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <SessionsPanel
            agentType={agentType}
            currentSessionId={currentSessionId}
            onSessionChange={onSessionChange}
            onNewSession={onNewSession}
          />
          {onClose && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="h-8 w-8 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
    </CardHeader>
  );
};

export default ChatHeader;
