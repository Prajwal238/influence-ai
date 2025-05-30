
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Instagram, Mail, Mic } from "lucide-react";

interface Message {
  id: string;
  from: 'agent' | 'creator';
  content: string;
  timestamp: string;
  platform: 'instagram' | 'email' | 'voice';
}

interface Thread {
  creatorId: string;
  name: string;
  handle: string;
  platform: 'instagram' | 'email' | 'voice';
  messages: Message[];
}

interface ChatWindowProps {
  selectedThread?: Thread;
  onSendMessage: (content: string, platform: string) => void;
}

const ChatWindow = ({ selectedThread, onSendMessage }: ChatWindowProps) => {
  const [messageInput, setMessageInput] = useState('');

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-3 w-3" />;
      case 'email':
        return <Mail className="h-3 w-3" />;
      case 'voice':
        return <Mic className="h-3 w-3" />;
      default:
        return <Mail className="h-3 w-3" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleSend = () => {
    if (messageInput.trim() && selectedThread) {
      onSendMessage(messageInput.trim(), selectedThread.platform);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!selectedThread) {
    return (
      <Card className="h-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.05)] rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#F2F2F7] rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-[#6E6E73]" />
          </div>
          <h3 className="text-lg font-medium text-[#1D1D1F] font-['SF_Pro_Display'] mb-2">
            Select a conversation
          </h3>
          <p className="text-[#6E6E73] font-['SF_Pro_Text']">
            Choose a creator from the list to start negotiating
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.05)] rounded-2xl flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[#F2F2F7] flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#1D1D1F] font-['SF_Pro_Display']">
            {selectedThread.name}
          </h3>
          <p className="text-sm text-[#6E6E73] font-['SF_Pro_Text']">
            {selectedThread.handle}
          </p>
        </div>
        <Badge className="bg-[#E0F3FF] text-[#0071E3] rounded-full px-3 py-1 text-xs border-0 flex items-center gap-1">
          {getPlatformIcon(selectedThread.platform)}
          {selectedThread.platform.charAt(0).toUpperCase() + selectedThread.platform.slice(1)}
        </Badge>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-300px)]">
        {selectedThread.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.from === 'agent' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[70%] ${
                message.from === 'agent'
                  ? 'bg-[#F2F2F7] text-[#1D1D1F]'
                  : 'bg-[#0071E3] text-white'
              } rounded-2xl px-4 py-3 relative`}
            >
              {message.from === 'agent' && (
                <Badge className="absolute -top-2 -right-2 bg-[#E0F3FF] text-[#0071E3] rounded-full px-2 py-1 text-xs border-0 flex items-center gap-1">
                  {getPlatformIcon(message.platform)}
                </Badge>
              )}
              
              <p className="font-['SF_Pro_Text'] text-sm leading-relaxed">
                {message.content}
              </p>
              
              <p className={`text-xs mt-2 ${
                message.from === 'agent' ? 'text-[#8E8E93]' : 'text-blue-100'
              }`}>
                {formatTimestamp(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Bar */}
      <div className="p-4 border-t border-[#F2F2F7] bg-[#FAFAFA] rounded-b-2xl">
        <div className="flex items-center space-x-3">
          <Select value={selectedThread.platform} disabled>
            <SelectTrigger className="w-[120px] rounded-lg border-[#E0E0E0] bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="instagram">
                <div className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Instagram
                </div>
              </SelectItem>
              <SelectItem value="email">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </div>
              </SelectItem>
              <SelectItem value="voice">
                <div className="flex items-center gap-2">
                  <Mic className="h-4 w-4" />
                  Voice
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          
          <Input
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Reply to ${selectedThread.handle}...`}
            className="flex-1 rounded-lg border-[#E0E0E0] focus:border-[#0071E3] focus:ring-[#0071E3] font-['SF_Pro_Text']"
          />
          
          <Button
            onClick={handleSend}
            disabled={!messageInput.trim()}
            className="bg-[#0071E3] hover:bg-[#005BB5] text-white rounded-full px-4 py-2 font-['SF_Pro_Text'] disabled:opacity-50 min-w-[80px]"
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatWindow;
