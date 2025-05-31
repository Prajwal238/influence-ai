
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { History, Plus, MessageSquare, X } from "lucide-react";
import { ChatSession } from './types';
import { startNewSession } from './sessionUtils';

interface SessionsPanelProps {
  agentType: string;
  currentSessionId: string;
  onSessionChange: (sessionId: string) => void;
  onNewSession: () => void;
}

const SessionsPanel = ({ agentType, currentSessionId, onSessionChange, onNewSession }: SessionsPanelProps) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // TODO: This will be replaced with actual API call later
  const loadPastSessions = async () => {
    // Placeholder for now - will be implemented when user provides API details
    console.log('Loading past sessions for:', agentType);
  };

  const handleNewSession = () => {
    const newSessionId = startNewSession(agentType);
    onNewSession();
    setIsPanelOpen(false);
  };

  const handleSessionSelect = (sessionId: string) => {
    onSessionChange(sessionId);
    setIsPanelOpen(false);
  };

  const handleHistoryClick = () => {
    loadPastSessions();
    setIsPanelOpen(true);
  };

  const formatSessionTitle = (session: ChatSession) => {
    return session.title || `Session ${session.sessionId.slice(-8)}`;
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleNewSession}
          className="flex items-center space-x-1"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Chat</span>
        </Button>

        <Button variant="outline" size="sm" onClick={handleHistoryClick}>
          <History className="h-4 w-4" />
          <span className="hidden sm:inline ml-1">History</span>
        </Button>
      </div>

      {/* Side Panel */}
      {isPanelOpen && (
        <div className="absolute left-0 top-0 h-full w-80 bg-white border-r border-gray-200 z-10 shadow-lg">
          <div className="flex flex-col h-full">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span className="font-semibold">Chat History</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPanelOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Panel Content */}
            <div className="flex-1 flex flex-col p-4">
              <Button
                onClick={handleNewSession}
                className="w-full mb-4"
                variant="default"
              >
                <Plus className="h-4 w-4 mr-2" />
                Start New Chat
              </Button>
              
              <ScrollArea className="flex-1">
                <div className="space-y-2">
                  {sessions.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                      <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-30" />
                      <p>No past sessions</p>
                      <p className="text-sm">Start a new chat to begin</p>
                    </div>
                  ) : (
                    sessions.map((session) => (
                      <Card
                        key={session.sessionId}
                        className={`cursor-pointer transition-colors hover:bg-gray-50 ${
                          session.sessionId === currentSessionId ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => handleSessionSelect(session.sessionId)}
                      >
                        <CardContent className="p-3">
                          <div className="flex flex-col space-y-1">
                            <div className="font-medium text-sm truncate">
                              {formatSessionTitle(session)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatDate(session.lastMessageAt)}
                            </div>
                            <div className="text-xs text-gray-400 truncate">
                              {session.messages.length} messages
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SessionsPanel;
