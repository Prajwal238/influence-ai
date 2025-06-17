
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
        {/* Enhanced Header */}
        <CardHeader className="border-b border-gray-100/80 pb-6 pt-6 px-6 bg-white/80 backdrop-blur-sm flex-shrink-0 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-900 tracking-tight">
                  {agentName}
                </CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <Sparkles className="h-3 w-3 text-purple-500" />
                  <p className="text-sm text-gray-600 font-medium">AI Assistant</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
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
                  className="h-9 w-9 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0 min-h-0 bg-gradient-to-b from-gray-50/30 to-white">
          {/* Messages */}
          <ScrollArea className="flex-1 min-h-0">
            <div className="p-6">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl p-4 shadow-sm ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'bg-white border border-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {message.type === 'agent' && (
                          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Bot className="h-3 w-3 text-white" />
                          </div>
                        )}
                        {message.type === 'user' && (
                          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <User className="h-3 w-3 text-white" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm leading-relaxed whitespace-pre-line break-words">{message.content}</p>
                          <p className={`text-xs mt-2 ${
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
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 max-w-[75%] shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <Bot className="h-3 w-3 text-white" />
                        </div>
                        {isApiLoading ? (
                          <div className="flex items-center space-x-2">
                            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                            <span className="text-sm text-gray-600 font-medium">Processing campaign...</span>
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
                  <div className="flex justify-center animate-fade-in">
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-4 shadow-sm">
                      <div className="flex items-center space-x-3 text-red-600">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">Recording... Click to stop</span>
                      </div>
                    </div>
                  </div>
                )}

                {isProcessing && (
                  <div className="flex justify-center animate-fade-in">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 shadow-sm">
                      <div className="flex items-center space-x-3 text-blue-600">
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

          {/* Enhanced Input */}
          <div className="border-t border-gray-100/80 p-6 flex-shrink-0 bg-white/90 backdrop-blur-sm rounded-b-2xl">
            <div className="flex space-x-3 items-end">
              <div className="flex-1 relative">
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
                  className="min-h-[50px] max-h-[120px] resize-none border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl shadow-sm bg-white/80 backdrop-blur-sm transition-all duration-200"
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
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shrink-0 h-[50px] px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                disabled={!inputValue.trim() || isInputDisabled}
              >
                {isApiLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
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
