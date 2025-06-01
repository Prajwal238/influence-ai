
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
      polling: { dot: 'bg-[#8E8E93]', text: 'Polling for replies...' },
      chatting: { dot: 'bg-[#0071E3]', text: 'Actively chatting' },
      waitingPhone: { dot: 'bg-[#FF9500]', text: 'Waiting for phone number' },
      calling: { dot: 'bg-[#7B68EE]', text: 'On call' },
      complete: { dot: 'bg-[#34C759]', text: 'Negotiation complete' }
    };

    const config = configs[status];
    return (
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
        <span className="text-sm text-[#6E6E73] font-sans">{config.text}</span>
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
      <Card className="h-full bg-white shadow-apple rounded-2xl border-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#F2F2F7] rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-[#6E6E73]" />
          </div>
          <h3 className="text-xl font-semibold text-[#1D1D1F] font-sans tracking-tight mb-2">
            Select a negotiation
          </h3>
          <p className="text-[#6E6E73] font-sans">
            Choose a creator from the list to view the conversation
          </p>
        </div>
      </Card>
    );
  }

  const isAgentActive = selectedThread.controlMode === 'agent' && selectedThread.agentStatus !== 'complete';
  const canCall = selectedThread.contact?.phone && selectedThread.agentStatus === 'waitingPhone';

  return (
    <Card className="h-full bg-white shadow-apple rounded-2xl border-0 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-[#F2F2F7]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div>
              <h3 className="text-xl font-semibold text-[#1D1D1F] font-sans tracking-tight">
                {selectedThread.name}
              </h3>
              <p className="text-sm text-[#6E6E73] font-sans">
                {selectedThread.handle}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge className="bg-[#E0F3FF] text-[#0071E3] rounded-full px-3 py-1 text-xs font-medium border-0 flex items-center gap-2 font-sans">
              {getPlatformIcon(selectedThread.platform)}
              {selectedThread.platform.charAt(0).toUpperCase() + selectedThread.platform.slice(1)}
            </Badge>
            <div className="text-sm text-[#6E6E73] font-sans">
              via In<span className="text-[#0071E3] font-medium">flow</span>encer.ai
            </div>
          </div>
        </div>
        
        {getStatusIndicator(selectedThread.agentStatus)}
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[calc(100vh-400px)]">
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
              <div className={`text-xs uppercase font-sans font-semibold mb-2 ${
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
                  message.from === 'creator' ? 'bg-white text-[#1D1D1F] border border-[#E0E0E0] shadow-sm' :
                  'bg-[#D1E8FF] text-[#1D1D1F]'
                }`}
              >
                <p className="font-sans text-sm leading-relaxed">
                  {message.content}
                </p>
                
                <p className="text-xs mt-2 text-[#8E8E93] font-sans">
                  {formatTimestamp(message.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Bar */}
      <div className="p-6 border-t border-[#F2F2F7] bg-[#FAFAFA] rounded-b-2xl space-y-4">
        {/* Control Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isAgentActive ? (
              <>
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-[#0071E3]" />
                  <span className="text-sm font-sans text-[#1D1D1F] font-medium">Agent is active</span>
                </div>
                <Button
                  onClick={onControlToggle}
                  className="bg-[#FF3B30] hover:bg-[#D70015] text-white rounded-xl px-4 py-2 text-sm font-sans font-medium shadow-sm"
                  size="sm"
                >
                  Take Over
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-[#34C759]" />
                  <span className="text-sm font-sans text-[#1D1D1F] font-medium">You are in control</span>
                </div>
                <Button
                  onClick={onControlToggle}
                  className="bg-[#0071E3] hover:bg-[#005BB5] text-white rounded-xl px-4 py-2 text-sm font-sans font-medium shadow-sm"
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
                  ? 'bg-[#8E8E93] hover:bg-[#6E6E73]' 
                  : 'bg-[#34C759] hover:bg-[#28A745]'
              } text-white rounded-xl px-4 py-2 text-sm font-sans font-medium flex items-center space-x-2 shadow-sm`}
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
            className="flex-1 rounded-xl border-[#E0E0E0] focus:border-[#0071E3] focus:ring-[#0071E3] font-sans disabled:bg-[#F2F2F7] disabled:text-[#8E8E93] text-sm"
          />
          
          <Button
            onClick={handleSend}
            disabled={!messageInput.trim() || isAgentActive || selectedThread.agentStatus === 'complete'}
            className="bg-[#0071E3] hover:bg-[#005BB5] text-white rounded-xl px-4 py-2 font-sans disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NegotiationChatPanel;
