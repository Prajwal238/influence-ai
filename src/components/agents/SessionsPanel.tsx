
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { History, Plus } from "lucide-react";
import { startNewSession } from './sessionUtils';
import SessionsPanelHeader from './SessionsPanelHeader';
import SessionsList from './SessionsList';

interface SessionsPanelProps {
  agentType: string;
  currentSessionId: string;
  onSessionChange: (sessionId: string) => void;
  onNewSession: () => void;
}

interface SessionsResponse {
  sessions: string[];
}

const SessionsPanel = ({ agentType, currentSessionId, onSessionChange, onNewSession }: SessionsPanelProps) => {
  const [sessions, setSessions] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadPastSessions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/campaigns/user_123/sessions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch sessions');
      }
      
      const data: SessionsResponse = await response.json();
      setSessions(data.sessions || []);
      console.log('Loaded sessions:', data.sessions);
    } catch (error) {
      console.error('Error loading sessions:', error);
      setSessions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSession = () => {
    const newSessionId = startNewSession(agentType);
    onNewSession();
    setIsSidebarOpen(false);
  };

  const handleSessionSelect = (sessionId: string) => {
    onSessionChange(sessionId);
    setIsSidebarOpen(false);
  };

  const handleHistoryClick = async () => {
    if (!isSidebarOpen) {
      await loadPastSessions();
    }
    setIsSidebarOpen(!isSidebarOpen);
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

      <Button variant="outline" size="sm" onClick={handleHistoryClick}>
        <History className="h-4 w-4" />
        <span className="hidden sm:inline ml-1">History</span>
      </Button>

      {/* Sidebar for chat history */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Sidebar */}
          <div className="w-80 bg-white border-r border-gray-200 shadow-xl flex flex-col">
            <SessionsPanelHeader 
              onClose={() => setIsSidebarOpen(false)}
              onNewSession={handleNewSession}
            />
            
            <SessionsList
              sessions={sessions}
              isLoading={isLoading}
              currentSessionId={currentSessionId}
              onSessionSelect={handleSessionSelect}
            />
          </div>
          
          {/* Overlay */}
          <div 
            className="flex-1 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default SessionsPanel;
