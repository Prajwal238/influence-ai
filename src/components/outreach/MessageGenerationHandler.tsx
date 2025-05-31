
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface MessageGenerationHandlerProps {
  sendAsVoice: boolean;
  selectedPlatform: string;
  onMessageChange: (message: string) => void;
  onVoiceMessageChange: (message: string) => void;
}

export const useMessageGeneration = ({
  sendAsVoice,
  selectedPlatform,
  onMessageChange,
  onVoiceMessageChange
}: MessageGenerationHandlerProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateWithAI = async () => {
    setIsGenerating(true);
    
    try {
      toast({
        title: "Generating Message",
        description: "AI is creating your personalized message...",
      });

      const response = await fetch('http://localhost:5000/api/user_123/campaigns/summer_fashion_2024/ai_message', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.type === 'message' && data.message) {
        if (sendAsVoice) {
          onVoiceMessageChange(data.message);
        } else {
          onMessageChange(data.message);
        }
        
        toast({
          title: "Message Generated",
          description: "AI has successfully created your message!",
        });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error generating AI message:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate AI message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    handleGenerateWithAI
  };
};
