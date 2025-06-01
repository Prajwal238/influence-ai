
import { Button } from "@/components/ui/button";
import { MessageSquare, Mic, Video } from "lucide-react";

export type MessageType = "text" | "voice" | "video";

interface MessageTypeToggleProps {
  messageType: MessageType;
  onTypeChange: (type: MessageType) => void;
}

const MessageTypeToggle = ({ messageType, onTypeChange }: MessageTypeToggleProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">
        Message Type
      </label>
      <div className="flex space-x-2">
        <Button 
          variant={messageType === "text" ? "default" : "outline"}
          size="sm"
          onClick={() => onTypeChange("text")}
          className="flex items-center space-x-2"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Text Message</span>
        </Button>
        <Button 
          variant={messageType === "voice" ? "default" : "outline"}
          size="sm"
          onClick={() => onTypeChange("voice")}
          className="flex items-center space-x-2"
        >
          <Mic className="h-4 w-4" />
          <span>Voice Message</span>
        </Button>
        <Button 
          variant={messageType === "video" ? "default" : "outline"}
          size="sm"
          onClick={() => onTypeChange("video")}
          className="flex items-center space-x-2"
        >
          <Video className="h-4 w-4" />
          <span>Video Message</span>
        </Button>
      </div>
    </div>
  );
};

export default MessageTypeToggle;
