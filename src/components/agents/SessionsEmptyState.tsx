
import { MessageSquare } from "lucide-react";

const SessionsEmptyState = () => {
  return (
    <div className="text-center py-12">
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <MessageSquare className="h-6 w-6 text-gray-400" />
      </div>
      <p className="text-sm font-medium text-gray-600 mb-1">No chat history</p>
      <p className="text-xs text-gray-400">Start a new conversation to see it here</p>
    </div>
  );
};

export default SessionsEmptyState;
