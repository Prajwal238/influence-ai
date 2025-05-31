
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Message, AgentChatProps } from './types';
import { getInitialGreeting, callCampaignAPI, generateAgentResponse } from './utils';
import { getCurrentSessionId, startNewSession } from './sessionUtils';
import NegotiationInterface from './NegotiationInterface';
import DefaultChatInterface from './DefaultChatInterface';

interface SessionMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface SessionData {
  sessionId: string;
  agentName: string;
  messages: SessionMessage[];
}

const AgentChat = ({ agentName, agentType, onClose, className }: AgentChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    // Initialize session
    const sessionId = getCurrentSessionId(agentType);
    setCurrentSessionId(sessionId);
    
    // Load conversation history from localStorage
    const savedMessages = localStorage.getItem(`agent-chat-${agentType}`);
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);
      // Convert timestamp strings back to Date objects
      const messagesWithDates = parsedMessages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      setMessages(messagesWithDates);
    } else {
      // Initial greeting message
      const greeting = getInitialGreeting(agentType);
      setMessages([{
        id: '1',
        type: 'agent',
        content: greeting,
        timestamp: new Date()
      }]);
    }
  }, [agentType]);

  useEffect(() => {
    // Save conversation history to localStorage
    if (messages.length > 0) {
      localStorage.setItem(`agent-chat-${agentType}`, JSON.stringify(messages));
    }
  }, [messages, agentType]);

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
      
      // Convert API messages to our Message format
      const convertedMessages: Message[] = sessionData.messages.map((msg, index) => ({
        id: `${sessionId}-${index}`,
        type: msg.role === 'user' ? 'user' : 'agent',
        content: msg.content,
        timestamp: new Date() // We don't have timestamps from API, using current time
      }));
      
      setMessages(convertedMessages);
      console.log('Loaded session data:', sessionData);
      
      return true;
    } catch (error) {
      console.error('Error loading session data:', error);
      
      toast({
        title: "Load Error",
        description: "Failed to load session conversation. Please try again.",
        variant: "destructive",
      });
      
      return false;
    }
  };

  const handleNewSession = () => {
    const newSessionId = startNewSession(agentType);
    setCurrentSessionId(newSessionId);
    
    // Reset messages with initial greeting
    const greeting = getInitialGreeting(agentType);
    const newMessages = [{
      id: '1',
      type: 'agent' as const,
      content: greeting,
      timestamp: new Date()
    }];
    setMessages(newMessages);
    
    toast({
      title: "New Chat Started",
      description: "Starting a fresh conversation with a new session.",
    });
  };

  const handleSessionChange = async (sessionId: string) => {
    setCurrentSessionId(sessionId);
    localStorage.setItem(`current-session-${agentType}`, sessionId);
    
    // Load the session data
    const success = await loadSessionData(sessionId);
    
    if (success) {
      toast({
        title: "Session Loaded",
        description: "Previous conversation loaded successfully.",
      });
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");

    // For campaign agent, call the API
    if (agentType === 'campaign') {
      setIsApiLoading(true);
      
      try {
        const apiResponse = await callCampaignAPI(currentInput, currentSessionId);
        
        const agentResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'agent',
          content: apiResponse.message || "I received your campaign request and I'm processing it.",
          timestamp: new Date(),
          apiResponse: apiResponse
        };
        
        setMessages(prev => [...prev, agentResponse]);
        
      } catch (error) {
        const errorResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'agent',
          content: "I apologize, but I encountered an error while processing your campaign request. Please make sure the campaign service is running and try again. You can also try rephrasing your request with more specific details.",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, errorResponse]);
        
        toast({
          title: "API Error",
          description: "Failed to process campaign request. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsApiLoading(false);
      }
    } else {
      // For other agent types, use the existing simulation
      setIsTyping(true);
      setTimeout(() => {
        const agentResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'agent',
          content: generateAgentResponse(currentInput, agentType),
          timestamp: new Date()
        };
        setMessages(prev => [...prev, agentResponse]);
        setIsTyping(false);
      }, 1000 + Math.random() * 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Render negotiation-specific interface
  if (agentType === 'negotiation') {
    return (
      <NegotiationInterface
        agentName={agentName}
        agentType={agentType}
        onClose={onClose}
        className={className}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSendMessage={handleSendMessage}
        handleKeyPress={handleKeyPress}
      />
    );
  }

  // Default chat interface for other agent types
  return (
    <DefaultChatInterface
      agentName={agentName}
      agentType={agentType}
      onClose={onClose}
      className={className}
      messages={messages}
      inputValue={inputValue}
      setInputValue={setInputValue}
      handleSendMessage={handleSendMessage}
      handleKeyPress={handleKeyPress}
      isTyping={isTyping}
      isApiLoading={isApiLoading}
      currentSessionId={currentSessionId}
      onSessionChange={handleSessionChange}
      onNewSession={handleNewSession}
    />
  );
};

export default AgentChat;
