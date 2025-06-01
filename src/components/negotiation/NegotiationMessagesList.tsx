
import { Bot, User } from "lucide-react";
import { NegotiationMessage } from "@/types/outreach";

interface NegotiationMessagesListProps {
  messages: NegotiationMessage[];
}

const NegotiationMessagesList = ({ messages }: NegotiationMessagesListProps) => {
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[calc(100vh-400px)]">
      {messages.map((message) => (
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
              message.from === 'agent' ? 'text-[#34C759]' :
              message.from === 'creator' ? 'text-[#0071E3]' : 'text-[#34C759]'
            }`}>
              {message.from === 'agent' ? (
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>You</span>
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
  );
};

export default NegotiationMessagesList;
