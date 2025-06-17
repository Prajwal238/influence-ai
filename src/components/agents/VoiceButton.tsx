
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";

interface VoiceButtonProps {
  isRecording: boolean;
  isProcessing: boolean;
  onToggleRecording: () => void;
  disabled?: boolean;
}

const VoiceButton = ({ isRecording, isProcessing, onToggleRecording, disabled }: VoiceButtonProps) => {
  return (
    <Button
      onClick={onToggleRecording}
      disabled={disabled || isProcessing}
      className={`shrink-0 h-[48px] w-[48px] rounded-2xl transition-all duration-200 shadow-sm ${
        isRecording 
          ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
          : 'bg-gray-600 hover:bg-gray-700'
      }`}
      size="icon"
    >
      {isRecording ? (
        <div className="relative">
          <MicOff className="h-4 w-4 text-white" />
          <div className="absolute inset-0 rounded-2xl border border-white/30 animate-ping" />
        </div>
      ) : (
        <Mic className="h-4 w-4 text-white" />
      )}
    </Button>
  );
};

export default VoiceButton;
