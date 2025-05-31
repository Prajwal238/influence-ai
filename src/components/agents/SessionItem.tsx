
import { MessageSquare } from "lucide-react";

interface SessionItemProps {
  sessionId: string;
  currentSessionId: string;
  onSessionSelect: (sessionId: string) => void;
}

const SessionItem = ({ sessionId, currentSessionId, onSessionSelect }: SessionItemProps) => {
  const formatSessionTitle = (sessionId: string) => {
    // Extract the last part of the session ID for display
    const shortId = sessionId.split('_')[1] || sessionId;
    return `Chat ${shortId.slice(-6)}`;
  };

  return (
    <div
      key={sessionId}
      className={`group relative rounded-lg p-3 cursor-pointer transition-all duration-150 hover:bg-gray-50 ${
        sessionId === currentSessionId 
          ? 'bg-blue-50 border border-blue-200' 
          : 'hover:bg-gray-50 border border-transparent'
      }`}
      onClick={() => onSessionSelect(sessionId)}
    >
      <div className="flex items-start space-x-3">
        <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${
          sessionId === currentSessionId
            ? 'bg-blue-100'
            : 'bg-gray-100 group-hover:bg-gray-200'
        }`}>
          <MessageSquare className={`h-3 w-3 ${
            sessionId === currentSessionId
              ? 'text-blue-600'
              : 'text-gray-500'
          }`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-medium truncate ${
              sessionId === currentSessionId
                ? 'text-blue-900'
                : 'text-gray-900'
            }`}>
              {formatSessionTitle(sessionId)}
            </h3>
          </div>
          <p className="text-xs text-gray-500 mt-1 truncate">
            Session ID: {sessionId.split('_')[1]?.slice(-8) || sessionId.slice(-8)}
          </p>
        </div>
      </div>
      
      {sessionId === currentSessionId && (
        <div className="absolute right-2 top-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default SessionItem;
