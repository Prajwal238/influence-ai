
import { Bot, User, Clock } from "lucide-react";
import { CallMessage } from "./CallStatsTypes";

interface ConversationTranscriptProps {
  transcript: CallMessage[];
}

const ConversationTranscript = ({ transcript }: ConversationTranscriptProps) => {
  const formatTime = (timeInSeconds: number) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!transcript || transcript.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
          <h4 className="text-sm font-semibold text-gray-900">Conversation</h4>
        </div>
        
        <div className="bg-gray-50/50 rounded-xl p-8 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Bot className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500">No conversation transcript available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
        <h4 className="text-sm font-semibold text-gray-900">Conversation</h4>
      </div>
      
      <div className="bg-gray-50/30 rounded-xl p-4">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {transcript.map((message, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.role === 'agent' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-emerald-100 text-emerald-600'
              }`}>
                {message.role === 'agent' ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>

              {/* Message */}
              <div className={`flex-1 max-w-xs ${
                message.role === 'user' ? 'text-right' : 'text-left'
              }`}>
                <div className={`inline-block px-4 py-2 rounded-2xl text-sm ${
                  message.role === 'agent'
                    ? 'bg-white border border-gray-200 text-gray-800'
                    : 'bg-blue-500 text-white'
                }`}>
                  <p className="leading-relaxed">{message.message}</p>
                </div>
                
                {/* Timestamp */}
                <div className={`flex items-center mt-1 space-x-1 text-xs text-gray-500 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}>
                  <Clock className="h-3 w-3" />
                  <span>{formatTime(message.time_in_call_secs)}</span>
                  {message.interrupted && (
                    <span className="text-orange-500 font-medium">(interrupted)</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationTranscript;
