import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Instagram, Mail, Mic, Send, Phone, PhoneOff, Bot, User, Users } from "lucide-react";
import { NegotiationThread, AgentStatus } from "@/types/outreach";

interface NegotiationChatPanelProps {
  selectedThread?: NegotiationThread;
  onSendMessage: (content: string, platform: string) => void;
  onControlToggle: () => void;
  onStatusChange: (status: AgentStatus) => void;
}

const NegotiationChatPanel = ({ 
  selectedThread, 
  onSendMessage, 
  onControlToggle,
  onStatusChange 
}: NegotiationChatPanelProps) => {
  const [messageInput, setMessageInput] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);

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

  const getStatusIndicator = (status: AgentStatus) => {
    const configs = {
      polling: { dot: 'bg-gray-400', text: 'Polling for replies...' },
      chatting: { dot: 'bg-blue-500', text: 'Actively chatting' },
      waitingPhone: { dot: 'bg-yellow-500', text: 'Waiting for phone number' },
      calling: { dot: 'bg-purple-500', text: 'On call' },
      complete: { dot: 'bg-green-500', text: 'Negotiation complete' }
    };

    const config = configs[status];
    return (
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
        <span className="text-sm text-[#6E6E73] font-['SF_Pro_Text']">{config.text}</span>
      </div>
    );
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

  const handleCallToggle = () => {
    if (!selectedThread) return;
    
    if (isCallActive) {
      setIsCallActive(false);
      onStatusChange('chatting');
    } else {
      setIsCallActive(true);
      onStatusChange('calling');
    }
  };

  if (!selectedThread) {
    return (
      <Card className="h-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.05)] rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#F2F2F7] rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-[#6E6E73]" />
          </div>
          <h3 className="text-lg font-semibold text-[#1D1D1F] font-['SF_Pro_Display'] mb-2">
            Select a negotiation
          </h3>
          <p className="text-[#6E6E73] font-['SF_Pro_Text']">
            Choose a creator from the list to view the conversation
          </p>
        </div>
      </Card>
    );
  }

  const isAgentActive = selectedThread.controlMode === 'agent' && selectedThread.agentStatus !== 'complete';
  const canCall = selectedThread.contact?.phone && selectedThread.agentStatus === 'waitingPhone';

  return (
    <Card className="h-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.05)] rounded-2xl flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[#F2F2F7]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div>
              <h3 className="text-lg font-semibold text-[#1D1D1F] font-['SF_Pro_Display']">
                {selectedThread.name}
              </h3>
              <p className="text-sm text-[#6E6E73] font-['SF_Pro_Text']">
                {selectedThread.handle}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge className="bg-[#E0F3FF] text-[#0071E3] rounded-full px-3 py-1 text-xs border-0 flex items-center gap-1">
              {getPlatformIcon(selectedThread.platform)}
              {selectedThread.platform.charAt(0).toUpperCase() + selectedThread.platform.slice(1)}
            </Badge>
          </div>
        </div>
        
        {getStatusIndicator(selectedThread.agentStatus)}
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-400px)]">
        {selectedThread.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.from === 'creator' ? 'justify-end' : 
              message.from === 'user' ? 'justify-center' : 'justify-start'
            }`}
          >
            <div className="max-w-[70%]">
              {/* Message Label */}
              <div className={`text-xs uppercase font-['SF_Pro_Text'] font-medium mb-1 ${
                message.from === 'agent' ? 'text-[#6E6E73]' :
                message.from === 'creator' ? 'text-[#0071E3]' : 'text-[#34C759]'
              }`}>
                {message.from === 'agent' ? (
                  <div className="flex items-center space-x-1">
                    <Bot className="h-3 w-3" />
                    <span>Agent</span>
                  </div>
                ) : message.from === 'creator' ? (
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>Influencer</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>You</span>
                  </div>
                )}
              </div>
              
              {/* Message Bubble */}
              <div
                className={`rounded-2xl px-4 py-3 relative ${
                  message.from === 'agent' ? 'bg-[#F2F2F7] text-[#1D1D1F]' :
                  message.from === 'creator' ? 'bg-white text-[#1D1D1F] border border-[#E0E0E0]' :
                  'bg-[#D1E8FF] text-[#1D1D1F]'
                }`}
              >
                <p className="font-['SF_Pro_Text'] text-sm leading-relaxed">
                  {message.content}
                </p>
                
                <p className="text-xs mt-2 text-[#8E8E93]">
                  {formatTimestamp(message.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Bar */}
      <div className="p-4 border-t border-[#F2F2F7] bg-[#FAFAFA] rounded-b-2xl space-y-3">
        {/* Control Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isAgentActive ? (
              <>
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-[#0071E3]" />
                  <span className="text-sm font-['SF_Pro_Text'] text-[#1D1D1F]">Agent is active</span>
                </div>
                <Button
                  onClick={onControlToggle}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-3 py-1 text-sm font-['SF_Pro_Text']"
                  size="sm"
                >
                  Take Over
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-[#34C759]" />
                  <span className="text-sm font-['SF_Pro_Text'] text-[#1D1D1F]">You are in control</span>
                </div>
                <Button
                  onClick={onControlToggle}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-1 text-sm font-['SF_Pro_Text']"
                  size="sm"
                >
                  Return to Agent
                </Button>
              </>
            )}
          </div>

          {/* Call Controls */}
          {canCall && (
            <Button
              onClick={handleCallToggle}
              className={`${
                isCallActive 
                  ? 'bg-gray-500 hover:bg-gray-600' 
                  : 'bg-green-500 hover:bg-green-600'
              } text-white rounded-lg px-3 py-1 text-sm font-['SF_Pro_Text'] flex items-center space-x-1`}
              size="sm"
            >
              {isCallActive ? (
                <>
                  <PhoneOff className="h-3 w-3" />
                  <span>End Call</span>
                </>
              ) : (
                <>
                  <Phone className="h-3 w-3" />
                  <span>Call Now</span>
                </>
              )}
            </Button>
          )}
        </div>

        {/* Manual Chat Input */}
        <div className="flex items-center space-x-3">
          <Input
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              selectedThread.agentStatus === 'complete' 
                ? 'Negotiation complete' 
                : isAgentActive 
                  ? 'Take over to send manual messages...' 
                  : 'Type your message...'
            }
            disabled={isAgentActive || selectedThread.agentStatus === 'complete'}
            className="flex-1 rounded-lg border-[#E0E0E0] focus:border-[#0071E3] focus:ring-[#0071E3] font-['SF_Pro_Text'] disabled:bg-[#F2F2F7] disabled:text-[#8E8E93]"
          />
          
          <Button
            onClick={handleSend}
            disabled={!messageInput.trim() || isAgentActive || selectedThread.agentStatus === 'complete'}
            className="bg-[#0071E3] hover:bg-[#005BB5] text-white rounded-lg px-4 py-2 font-['SF_Pro_Text'] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NegotiationChatPanel;
