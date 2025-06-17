
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, X, Loader2, Sparkles } from "lucide-react";
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
      <Card className={`h-full flex flex-col border-0 shadow-none bg-transparent ${className}`}>
        {/* Refined Header */}
        <CardHeader className="border-b border-gray-100/60 pb-5 pt-8 px-8 bg-transparent flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-sm">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900 tracking-tight">
                  {agentName}
                </CardTitle>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  <p className="text-xs text-gray-500 font-medium">Online</p>
                </div>
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
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onClose}
                  className="h-8 w-8 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0 min-h-0 bg-transparent">
          {/* Messages */}
          <ScrollArea className="flex-1 min-h-0">
            <div className="p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'bg-gray-50 border border-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {message.type === 'agent' && (
                        <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Bot className="h-2.5 w-2.5 text-white" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-relaxed whitespace-pre-line break-words">{message.content}</p>
                        <p className={`text-xs mt-2 opacity-70 ${
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
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 max-w-[70%]">
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <Bot className="h-2.5 w-2.5 text-white" />
                      </div>
                      {isApiLoading ? (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-500" />
                          <span className="text-sm text-gray-600">Processing...</span>
                        </div>
                      ) : (
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {isRecording && (
                <div className="flex justify-center animate-fade-in">
                  <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3">
                    <div className="flex items-center space-x-2 text-red-600">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Recording...</span>
                    </div>
                  </div>
                </div>
              )}

              {isProcessing && (
                <div className="flex justify-center animate-fade-in">
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3">
                    <div className="flex items-center space-x-2 text-blue-600">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span className="text-sm font-medium">Processing voice...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Refined Input */}
          <div className="border-t border-gray-100/60 p-6 flex-shrink-0 bg-white/80 backdrop-blur-sm">
            <div className="flex space-x-3 items-end">
              <div className="flex-1 relative">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onEnterPress={handleSendMessage}
                  placeholder={
                    isRecording 
                      ? "Recording..." 
                      : isProcessing 
                      ? "Processing..." 
                      : "Type your message..."
                  }
                  className="min-h-[48px] max-h-[120px] resize-none border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 rounded-2xl shadow-sm bg-white transition-all duration-200 text-sm"
                  disabled={isInputDisabled}
                  rows={1}
                />
              </div>
              
              <VoiceButton
                isRecording={isRecording}
                isProcessing={isProcessing}
                onToggleRecording={toggleRecording}
                disabled={isApiLoading}
              />
              
              <Button 
                onClick={handleSendMessage} 
                className="bg-blue-500 hover:bg-blue-600 shrink-0 h-[48px] px-5 rounded-2xl shadow-sm transition-all duration-200"
                disabled={!inputValue.trim() || isInputDisabled}
              >
                {isApiLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-2.5 text-center">
              {isRecording 
                ? "Recording voice message" 
                : "Press Enter to send or use voice"
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DefaultChatInterface;
