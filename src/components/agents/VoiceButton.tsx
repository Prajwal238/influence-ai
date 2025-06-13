
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
      className={`shrink-0 transition-all duration-300 ${
        isRecording 
          ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
          : 'bg-blue-600 hover:bg-blue-700'
      }`}
      size="icon"
    >
      {isRecording ? (
        <div className="relative">
          <MicOff className="h-4 w-4" />
          {/* Wave animation */}
          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
          <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping animation-delay-150" />
          <div className="absolute inset-0 rounded-full border-2 border-white/10 animate-ping animation-delay-300" />
        </div>
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </Button>
  );
};

export default VoiceButton;
