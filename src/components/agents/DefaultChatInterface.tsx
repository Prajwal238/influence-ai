
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, X, Loader2 } from "lucide-react";
import { Message, AgentChatProps } from './types';
import { useVoiceRecording } from '@/hooks/useVoiceRecording';
import VoiceButton from './VoiceButton';
import SessionsPanel from './SessionsPanel';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isRecording, isProcessing, toggleRecording } = useVoiceRecording({ 
    sessionId: currentSessionId,
    agentType: agentType
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const isInputDisabled = isApiLoading || isRecording || isProcessing;

  return (
    <div className="h-full w-full relative">
      <Card className={`h-full flex flex-col ${className}`}>
        <CardHeader className="border-b border-gray-100 pb-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {agentName}
                </CardTitle>
                <p className="text-sm text-gray-600">AI Assistant</p>
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
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0 min-h-0">
          {/* Messages */}
          <ScrollArea className="flex-1 min-h-0">
            <div className="p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === 'agent' && (
                          <Bot className="h-4 w-4 mt-0.5 text-blue-600" />
                        )}
                        {message.type === 'user' && (
                          <User className="h-4 w-4 mt-0.5 text-white" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {(isTyping || isApiLoading) && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4 text-blue-600" />
                        {isApiLoading ? (
                          <div className="flex items-center space-x-2">
                            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                            <span className="text-sm text-gray-600">Processing campaign...</span>
                          </div>
                        ) : (
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {isRecording && (
                  <div className="flex justify-center">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2 text-red-600">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">Recording... Click to stop</span>
                      </div>
                    </div>
                  </div>
                )}

                {isProcessing && (
                  <div className="flex justify-center">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2 text-blue-600">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm font-medium">Processing voice message...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t border-gray-100 p-4 flex-shrink-0">
            <div className="flex space-x-2 items-end">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onEnterPress={handleSendMessage}
                placeholder={
                  isRecording 
                    ? "Recording... Click voice button to stop" 
                    : isProcessing 
                    ? "Processing voice message..." 
                    : "Type your message... (Shift+Enter for new line)"
                }
                className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                disabled={isInputDisabled}
                rows={1}
              />
              
              <VoiceButton
                isRecording={isRecording}
                isProcessing={isProcessing}
                onToggleRecording={toggleRecording}
                disabled={isApiLoading}
              />
              
              <Button 
                onClick={handleSendMessage} 
                className="bg-blue-600 hover:bg-blue-700 shrink-0"
                disabled={!inputValue.trim() || isInputDisabled}
              >
                {isApiLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {isRecording 
                ? "Recording voice message (max 45 seconds)" 
                : "Press Enter to send, Shift+Enter for new line, or use voice button to record"
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DefaultChatInterface;
