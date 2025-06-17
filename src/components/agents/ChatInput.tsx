
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import VoiceButton from './VoiceButton';

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  isRecording: boolean;
  isProcessing: boolean;
  isApiLoading: boolean;
  toggleRecording: () => void;
}

const ChatInput = ({
  inputValue,
  setInputValue,
  handleSendMessage,
  handleKeyPress,
  isRecording,
  isProcessing,
  isApiLoading,
  toggleRecording
}: ChatInputProps) => {
  const isInputDisabled = isApiLoading || isRecording || isProcessing;

  return (
    <div className="border-t border-gray-100/60 p-6 flex-shrink-0 bg-white/80 backdrop-blur-sm">
      <div className="flex space-x-3 items-end">
        <div className="flex-1 relative">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onEnterPress={handleSendMessage}
            placeholder={
              isRecording 
                ? "Recording..." 
                : isProcessing 
                ? "Processing..." 
                : "Type your message..."
            }
            className="min-h-[48px] max-h-[120px] resize-none border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 rounded-2xl shadow-sm bg-white transition-all duration-200 text-sm"
            disabled={isInputDisabled}
            rows={1}
          />
        </div>
        
        <VoiceButton
          isRecording={isRecording}
          isProcessing={isProcessing}
          onToggleRecording={toggleRecording}
          disabled={isApiLoading}
        />
        
        <Button 
          onClick={handleSendMessage} 
          className="bg-blue-500 hover:bg-blue-600 shrink-0 h-[48px] px-5 rounded-2xl shadow-sm transition-all duration-200"
          disabled={!inputValue.trim() || isInputDisabled}
        >
          {isApiLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
      <p className="text-xs text-gray-400 mt-2.5 text-center">
        {isRecording 
          ? "Recording voice message" 
          : "Press Enter to send or use voice"
        }
      </p>
    </div>
  );
};

export default ChatInput;
