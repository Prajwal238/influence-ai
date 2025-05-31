
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { History, Plus, MessageSquare } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);

  // TODO: This will be replaced with actual API call later
  const loadPastSessions = async () => {
    // Placeholder for now - will be implemented when user provides API details
    console.log('Loading past sessions for:', agentType);
  };

  const handleNewSession = () => {
    const newSessionId = startNewSession(agentType);
    onNewSession();
    setIsOpen(false);
  };

  const handleSessionSelect = (sessionId: string) => {
    onSessionChange(sessionId);
    setIsOpen(false);
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

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" onClick={loadPastSessions}>
            <History className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">History</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Chat History</span>
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-4">
            <Button
              onClick={handleNewSession}
              className="w-full mb-4"
              variant="default"
            >
              <Plus className="h-4 w-4 mr-2" />
              Start New Chat
            </Button>
            
            <ScrollArea className="h-[calc(100vh-200px)]">
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SessionsPanel;
