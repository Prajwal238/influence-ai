
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Play, Bot } from "lucide-react";

export interface Message {
  id: string;
  type: 'agent' | 'user';
  content: string;
  timestamp: Date;
  actionButtons?: ActionButton[];
  cards?: MessageCard[];
}

export interface ActionButton {
  id: string;
  label: string;
  variant?: 'default' | 'outline' | 'secondary';
  onClick?: () => void; // Made optional since we use onActionClick handler
}

export interface MessageCard {
  id: string;
  type: 'creator' | 'campaign-review' | 'summary';
  data: any;
}

interface Props {
  agentName: string;
  agentAvatar?: string;
  messages: Message[];
  onSendMessage: (message: string) => void;
  onActionClick: (actionId: string, messageId: string) => void;
  isTyping?: boolean;
  placeholder?: string;
}

const ConversationalAgent = ({
  agentName,
  agentAvatar,
  messages,
  onSendMessage,
  onActionClick,
  isTyping = false,
  placeholder = "Type your message..."
}: Props) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderCard = (card: MessageCard) => {
    switch (card.type) {
      case 'creator':
        return (
          <Card key={card.id} className="bg-white border border-gray-200 mb-2">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{card.data.name}</h4>
                  <p className="text-sm text-gray-600">{card.data.handle}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                    <span>{card.data.followers} followers</span>
                    <span>{card.data.engagement}% engagement</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">Add</Button>
              </div>
            </CardContent>
          </Card>
        );
      case 'campaign-review':
        return (
          <Card key={card.id} className="bg-blue-50 border border-blue-200 mb-2">
            <CardContent className="p-4">
              <h4 className="font-medium text-blue-900 mb-2">Campaign Summary</h4>
              <div className="text-sm space-y-1">
                <div><span className="font-medium">Name:</span> {card.data.name}</div>
                <div><span className="font-medium">Goal:</span> {card.data.goal}</div>
                <div><span className="font-medium">Budget:</span> ${card.data.budget?.toLocaleString()}</div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
              {message.type === 'agent' && (
                <Avatar className="w-8 h-8 mt-1">
                  <AvatarImage src={agentAvatar} />
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div className="space-y-2">
                <div className={`rounded-2xl px-4 py-3 ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>

                {/* Action Buttons */}
                {message.actionButtons && message.actionButtons.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {message.actionButtons.map((button) => (
                      <Button
                        key={button.id}
                        size="sm"
                        variant={button.variant || 'outline'}
                        onClick={() => onActionClick(button.id, message.id)}
                        className="text-xs"
                      >
                        {button.label}
                      </Button>
                    ))}
                  </div>
                )}

                {/* Inline Cards */}
                {message.cards && message.cards.length > 0 && (
                  <div className="space-y-2 mt-3">
                    {message.cards.map(renderCard)}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={!inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationalAgent;
