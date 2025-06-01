
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Phone, PhoneOff, Send, RefreshCw } from "lucide-react";
import { NegotiationThread, AgentStatus } from "@/types/outreach";

interface NegotiationActionBarProps {
  selectedThread: NegotiationThread;
  onSendMessage: (content: string, platform: string) => void;
  onStatusChange: (status: AgentStatus) => void;
  onAIResponse?: () => void;
  onPoll?: () => void;
  aiResponseInput?: string;
  onAiResponseInputChange?: (value: string) => void;
}

const NegotiationActionBar = ({ 
  selectedThread, 
  onSendMessage, 
  onStatusChange,
  onAIResponse,
  onPoll,
  aiResponseInput = '',
  onAiResponseInputChange
}: NegotiationActionBarProps) => {
  const [messageInput, setMessageInput] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);

  // Update messageInput when aiResponseInput changes
  useEffect(() => {
    if (aiResponseInput) {
      setMessageInput(aiResponseInput);
      // Clear the AI response input after setting it to the message input
      if (onAiResponseInputChange) {
        onAiResponseInputChange('');
      }
    }
  }, [aiResponseInput, onAiResponseInputChange]);

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

  const handleAIResponse = () => {
    if (onAIResponse) {
      onAIResponse();
    }
  };

  const handlePoll = () => {
    if (onPoll) {
      onPoll();
    }
  };

  const canCall = selectedThread.contact?.phone && selectedThread.agentStatus === 'waitingPhone';

  return (
    <div className="p-6 border-t border-[#F2F2F7] bg-[#FAFAFA] rounded-b-2xl space-y-4">
      {/* Action Buttons Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* AI Response Button */}
          <Button
            onClick={handleAIResponse}
            className="bg-[#0071E3] hover:bg-[#005BB5] text-white rounded-xl px-4 py-2 text-sm font-sans font-medium flex items-center space-x-2 shadow-sm"
            size="sm"
          >
            <Bot className="h-3 w-3" />
            <span>AI Response</span>
          </Button>

          {/* Poll Button (always visible) */}
          <Button
            onClick={handlePoll}
            className="bg-[#34C759] hover:bg-[#28A745] text-white rounded-xl px-4 py-2 text-sm font-sans font-medium flex items-center space-x-2 shadow-sm"
            size="sm"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Poll</span>
          </Button>
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
              : 'Type your message...'
          }
          disabled={selectedThread.agentStatus === 'complete'}
          className="flex-1 rounded-xl border-[#E0E0E0] focus:border-[#0071E3] focus:ring-[#0071E3] font-sans disabled:bg-[#F2F2F7] disabled:text-[#8E8E93] text-sm"
        />
        
        <Button
          onClick={handleSend}
          disabled={!messageInput.trim() || selectedThread.agentStatus === 'complete'}
          className="bg-[#0071E3] hover:bg-[#005BB5] text-white rounded-xl px-4 py-2 font-sans disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default NegotiationActionBar;
