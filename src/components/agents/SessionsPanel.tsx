
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { 
  History, 
  Plus, 
  MessageSquare, 
  X, 
  ChevronLeft, 
  Loader2 
} from "lucide-react";
import { ChatSession } from './types';
import { startNewSession } from './sessionUtils';

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

  const formatSessionTitle = (sessionId: string) => {
    // Extract the last part of the session ID for display
    const shortId = sessionId.split('_')[1] || sessionId;
    return `Chat ${shortId.slice(-6)}`;
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
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 text-sm">Chat History</h2>
                  <p className="text-xs text-gray-500">Your conversation sessions</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(false)}
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* New Chat Button */}
            <div className="p-3 border-b border-gray-100">
              <Button
                onClick={handleNewSession}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Start New Chat
              </Button>
            </div>
            
            {/* Sessions List */}
            <div className="flex-1 overflow-hidden">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Loading sessions...</span>
                  </div>
                </div>
              ) : (
                <ScrollArea className="h-full">
                  <div className="p-3 space-y-1">
                    {sessions.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <MessageSquare className="h-6 w-6 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-600 mb-1">No chat history</p>
                        <p className="text-xs text-gray-400">Start a new conversation to see it here</p>
                      </div>
                    ) : (
                      sessions.map((sessionId) => (
                        <div
                          key={sessionId}
                          className={`group relative rounded-lg p-3 cursor-pointer transition-all duration-150 hover:bg-gray-50 ${
                            sessionId === currentSessionId 
                              ? 'bg-blue-50 border border-blue-200' 
                              : 'hover:bg-gray-50 border border-transparent'
                          }`}
                          onClick={() => handleSessionSelect(sessionId)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              sessionId === currentSessionId
                                ? 'bg-blue-100'
                                : 'bg-gray-100 group-hover:bg-gray-200'
                            }`}>
                              <MessageSquare className={`h-3 w-3 ${
                                sessionId === currentSessionId
                                  ? 'text-blue-600'
                                  : 'text-gray-500'
                              }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className={`text-sm font-medium truncate ${
                                  sessionId === currentSessionId
                                    ? 'text-blue-900'
                                    : 'text-gray-900'
                                }`}>
                                  {formatSessionTitle(sessionId)}
                                </h3>
                              </div>
                              <p className="text-xs text-gray-500 mt-1 truncate">
                                Session ID: {sessionId.split('_')[1]?.slice(-8) || sessionId.slice(-8)}
                              </p>
                            </div>
                          </div>
                          
                          {sessionId === currentSessionId && (
                            <div className="absolute right-2 top-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              )}
            </div>
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
