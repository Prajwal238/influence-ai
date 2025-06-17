
import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Loader2 } from "lucide-react";
import { Message } from './types';

interface MessagesListProps {
  messages: Message[];
  isTyping: boolean;
  isApiLoading: boolean;
  isRecording: boolean;
  isProcessing: boolean;
}

const MessagesList = ({
  messages,
  isTyping,
  isApiLoading,
  isRecording,
  isProcessing
}: MessagesListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
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
  );
};

export default MessagesList;
