
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Message } from '../types';
import { getInitialGreeting, callCampaignAPI, generateAgentResponse } from '../utils';

interface SessionMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

interface SessionData {
  sessionId: string;
  agentName: string;
  messages: SessionMessage[];
}

export const useMessageHandling = (agentType: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load conversation history from localStorage
    const savedMessages = localStorage.getItem(`agent-chat-${agentType}`);
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert timestamp strings back to Date objects with validation
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date()
        }));
        setMessages(messagesWithDates);
      } catch (error) {
        console.error('Error parsing saved messages:', error);
        // If parsing fails, start with greeting
        const greeting = getInitialGreeting(agentType);
        setMessages([{
          id: '1',
          type: 'agent',
          content: greeting,
          timestamp: new Date()
        }]);
      }
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
      try {
        localStorage.setItem(`agent-chat-${agentType}`, JSON.stringify(messages));
      } catch (error) {
        console.error('Error saving messages to localStorage:', error);
      }
    }
  }, [messages, agentType]);

  const loadSessionMessages = (sessionData: SessionData) => {
    try {
      // Validate sessionData structure
      if (!sessionData || !sessionData.messages || !Array.isArray(sessionData.messages)) {
        console.error('Invalid session data structure:', sessionData);
        toast({
          title: "Load Error",
          description: "Invalid session data format. Starting fresh conversation.",
          variant: "destructive",
        });
        return;
      }

      // Convert API messages to our Message format with proper validation
      const convertedMessages: Message[] = sessionData.messages
        .filter((msg) => msg && typeof msg.content === 'string' && msg.content.trim()) // Filter out invalid messages
        .map((msg, index) => {
          // Validate message structure
          if (!msg.role || !msg.content) {
            console.warn('Skipping invalid message:', msg);
            return null;
          }

          return {
            id: `${sessionData.sessionId}-${index}`,
            type: msg.role === 'user' ? 'user' : 'agent',
            content: msg.content.trim(),
            timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date()
          };
        })
        .filter((msg): msg is Message => msg !== null); // Remove null entries

      // Ensure we have at least one message
      if (convertedMessages.length === 0) {
        console.warn('No valid messages found in session data');
        const greeting = getInitialGreeting(agentType);
        setMessages([{
          id: '1',
          type: 'agent',
          content: greeting,
          timestamp: new Date()
        }]);
      } else {
        setMessages(convertedMessages);
      }
    } catch (error) {
      console.error('Error loading session messages:', error);
      toast({
        title: "Load Error",
        description: "Failed to load session messages. Starting fresh conversation.",
        variant: "destructive",
      });
      
      // Fallback to greeting message
      const greeting = getInitialGreeting(agentType);
      setMessages([{
        id: '1',
        type: 'agent',
        content: greeting,
        timestamp: new Date()
      }]);
    }
  };

  const resetMessagesWithGreeting = () => {
    const greeting = getInitialGreeting(agentType);
    const newMessages = [{
      id: '1',
      type: 'agent' as const,
      content: greeting,
      timestamp: new Date()
    }];
    setMessages(newMessages);
  };

  const handleSendMessage = async (inputValue: string, currentSessionId: string) => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // For campaign agent, call the API
    if (agentType === 'campaign') {
      setIsApiLoading(true);
      
      try {
        const apiResponse = await callCampaignAPI(inputValue, currentSessionId);
        
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
          content: generateAgentResponse(inputValue, agentType),
          timestamp: new Date()
        };
        setMessages(prev => [...prev, agentResponse]);
        setIsTyping(false);
      }, 1000 + Math.random() * 2000);
    }
  };

  return {
    messages,
    isTyping,
    isApiLoading,
    handleSendMessage,
    loadSessionMessages,
    resetMessagesWithGreeting
  };
};
