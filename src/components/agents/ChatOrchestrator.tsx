
import { useState } from "react";
import { AgentChatProps } from './types';
import { useSessionManagement } from './hooks/useSessionManagement';
import { useMessageHandling } from './hooks/useMessageHandling';
import NegotiationInterface from './NegotiationInterface';
import DefaultChatInterface from './DefaultChatInterface';

const ChatOrchestrator = ({ agentName, agentType, onClose, className }: AgentChatProps) => {
  const [inputValue, setInputValue] = useState("");
  
  const {
    currentSessionId,
    handleNewSession,
    handleSessionChange
  } = useSessionManagement(agentType);
  
  const {
    messages,
    isTyping,
    isApiLoading,
    handleSendMessage,
    loadSessionMessages,
    resetMessagesWithGreeting
  } = useMessageHandling(agentType);

  const handleNewSessionClick = () => {
    handleNewSession();
    resetMessagesWithGreeting();
  };

  const handleSessionChangeClick = async (sessionId: string) => {
    const sessionData = await handleSessionChange(sessionId);
    if (sessionData) {
      loadSessionMessages(sessionData);
    }
  };

  const handleSendMessageClick = async () => {
    await handleSendMessage(inputValue, currentSessionId);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessageClick();
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
        handleSendMessage={handleSendMessageClick}
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
      handleSendMessage={handleSendMessageClick}
      handleKeyPress={handleKeyPress}
      isTyping={isTyping}
      isApiLoading={isApiLoading}
      currentSessionId={currentSessionId}
      onSessionChange={handleSessionChangeClick}
      onNewSession={handleNewSessionClick}
    />
  );
};

export default ChatOrchestrator;
