
import { Button } from "@/components/ui/button";
import { MessageSquare, X, Plus } from "lucide-react";

interface SessionsPanelHeaderProps {
  onClose: () => void;
  onNewSession: () => void;
}

const SessionsPanelHeader = ({ onClose, onNewSession }: SessionsPanelHeaderProps) => {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 text-sm">Chat History</h2>
            <p className="text-xs text-gray-500">Your conversation sessions</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0 hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {/* New Chat Button */}
      <div className="p-3 border-b border-gray-100">
        <Button
          onClick={onNewSession}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Start New Chat
        </Button>
      </div>
    </>
  );
};

export default SessionsPanelHeader;
