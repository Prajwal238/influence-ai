
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
      className={`shrink-0 h-[50px] w-[50px] rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
        isRecording 
          ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse' 
          : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
      }`}
      size="icon"
    >
      {isRecording ? (
        <div className="relative">
          <MicOff className="h-5 w-5 text-white" />
          {/* Enhanced wave animation */}
          <div className="absolute inset-0 rounded-xl border-2 border-white/30 animate-ping" />
          <div className="absolute inset-0 rounded-xl border-2 border-white/20 animate-ping animation-delay-150" />
          <div className="absolute inset-0 rounded-xl border-2 border-white/10 animate-ping animation-delay-300" />
        </div>
      ) : (
        <Mic className="h-5 w-5 text-white" />
      )}
    </Button>
  );
};

export default VoiceButton;
