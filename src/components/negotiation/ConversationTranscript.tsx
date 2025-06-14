
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, User, Bot } from "lucide-react";
import { CallMessage } from "./CallStatsTypes";

interface ConversationTranscriptProps {
  transcript: CallMessage[];
}

const ConversationTranscript = ({ transcript }: ConversationTranscriptProps) => {
  const formatTime = (timeInCallSecs: number) => {
    const mins = Math.floor(timeInCallSecs / 60);
    const secs = timeInCallSecs % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
        Conversation Transcript
      </h4>
      {transcript.length > 0 ? (
        <ScrollArea className="h-64">
          <div className="space-y-3">
            {transcript.map((message, index) => (
              <div 
                key={index}
                className={`p-3 rounded-xl ${
                  message.role === 'agent' 
                    ? 'bg-[#E3F2FD] border-l-2 border-l-[#2196F3]' 
                    : 'bg-[#F2F2F7] border-l-2 border-l-[#6E6E73]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {message.role === 'agent' ? (
                      <Bot className="h-3 w-3 text-[#2196F3]" />
                    ) : (
                      <User className="h-3 w-3 text-[#6E6E73]" />
                    )}
                    <span className="text-xs font-medium text-[#1D1D1F] font-sans">
                      {message.role === 'agent' ? 'AI Agent' : 'Influencer'}
                    </span>
                    {message.interrupted && (
                      <Badge variant="outline" className="text-xs h-4">
                        Interrupted
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-[#6E6E73] font-sans">
                    {formatTime(message.time_in_call_secs || 0)}
                  </span>
                </div>
                {message.message && (
                  <p className="text-xs text-[#1D1D1F] font-sans leading-relaxed">
                    {message.message}
                  </p>
                )}
                {message.tool_calls && message.tool_calls.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="text-xs text-[#6E6E73] font-sans italic">
                      Tool called: {message.tool_calls[0]?.tool_name || 'Unknown'}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="text-center py-8">
          <MessageSquare className="h-8 w-8 text-[#6E6E73] mx-auto mb-2" />
          <p className="text-sm text-[#6E6E73] font-sans">No conversation transcript available</p>
        </div>
      )}
    </div>
  );
};

export default ConversationTranscript;
