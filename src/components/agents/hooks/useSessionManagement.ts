
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getCurrentSessionId, startNewSession } from '../sessionUtils';

interface SessionMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface SessionData {
  sessionId: string;
  agentName: string;
  messages: SessionMessage[];
}

export const useSessionManagement = (agentType: string) => {
  const [currentSessionId, setCurrentSessionId] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    const sessionId = getCurrentSessionId(agentType);
    setCurrentSessionId(sessionId);
  }, [agentType]);

  const loadSessionData = async (sessionId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/campaigns/user_123/sessions/${sessionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch session data');
      }
      
      const sessionDataArray: SessionData[] = await response.json();
      
      if (sessionDataArray.length === 0) {
        throw new Error('No session data found');
      }
      
      const sessionData = sessionDataArray[0];
      console.log('Loaded session data:', sessionData);
      
      return sessionData;
    } catch (error) {
      console.error('Error loading session data:', error);
      
      toast({
        title: "Load Error",
        description: "Failed to load session conversation. Please try again.",
        variant: "destructive",
      });
      
      return null;
    }
  };

  const handleNewSession = () => {
    const newSessionId = startNewSession(agentType);
    setCurrentSessionId(newSessionId);
    
    toast({
      title: "New Chat Started",
      description: "Starting a fresh conversation with a new session.",
    });

    return newSessionId;
  };

  const handleSessionChange = async (sessionId: string) => {
    setCurrentSessionId(sessionId);
    localStorage.setItem(`current-session-${agentType}`, sessionId);
    
    const sessionData = await loadSessionData(sessionId);
    
    if (sessionData) {
      toast({
        title: "Session Loaded",
        description: "Previous conversation loaded successfully.",
      });
    }

    return sessionData;
  };

  return {
    currentSessionId,
    setCurrentSessionId,
    handleNewSession,
    handleSessionChange,
    loadSessionData
  };
};
