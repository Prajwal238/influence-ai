
import { Card, CardContent } from "@/components/ui/card";
import { AgentChatProps, Message } from './types';
import { useVoiceRecording } from '@/hooks/useVoiceRecording';
import ChatHeader from './ChatHeader';
import MessagesList from './MessagesList';
import ChatInput from './ChatInput';

interface DefaultChatInterfaceProps extends AgentChatProps {
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  isTyping: boolean;
  isApiLoading: boolean;
  currentSessionId: string;
  onSessionChange: (sessionId: string) => void;
  onNewSession: () => void;
}

const DefaultChatInterface = ({
  agentName,
  agentType,
  onClose,
  className,
  messages,
  inputValue,
  setInputValue,
  handleSendMessage,
  handleKeyPress,
  isTyping,
  isApiLoading,
  currentSessionId,
  onSessionChange,
  onNewSession
}: DefaultChatInterfaceProps) => {
  const { isRecording, isProcessing, toggleRecording } = useVoiceRecording({ 
    sessionId: currentSessionId,
    agentType: agentType
  });

  return (
    <div className="h-full w-full relative">
      <Card className={`h-full flex flex-col border-0 shadow-none bg-transparent ${className}`}>
        <ChatHeader
          agentName={agentName}
          agentType={agentType}
          onClose={onClose}
          currentSessionId={currentSessionId}
          onSessionChange={onSessionChange}
          onNewSession={onNewSession}
        />
        
        <CardContent className="flex-1 flex flex-col p-0 min-h-0 bg-transparent">
          <MessagesList
            messages={messages}
            isTyping={isTyping}
            isApiLoading={isApiLoading}
            isRecording={isRecording}
            isProcessing={isProcessing}
          />

          <ChatInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSendMessage={handleSendMessage}
            handleKeyPress={handleKeyPress}
            isRecording={isRecording}
            isProcessing={isProcessing}
            isApiLoading={isApiLoading}
            toggleRecording={toggleRecording}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DefaultChatInterface;
