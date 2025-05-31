
import { Button } from "@/components/ui/button";
import { MessageSquare, Mic } from "lucide-react";

interface MessageTypeToggleProps {
  sendAsVoice: boolean;
  onToggle: (sendAsVoice: boolean) => void;
}

const MessageTypeToggle = ({ sendAsVoice, onToggle }: MessageTypeToggleProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">
        Message Type
      </label>
      <div className="flex space-x-2">
        <Button 
          variant={!sendAsVoice ? "default" : "outline"}
          size="sm"
          onClick={() => onToggle(false)}
          className="flex items-center space-x-2"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Text Message</span>
        </Button>
        <Button 
          variant={sendAsVoice ? "default" : "outline"}
          size="sm"
          onClick={() => onToggle(true)}
          className="flex items-center space-x-2"
        >
          <Mic className="h-4 w-4" />
          <span>Voice Message</span>
        </Button>
      </div>
    </div>
  );
};

export default MessageTypeToggle;
