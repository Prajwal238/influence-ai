
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MessageType } from "./MessageTypeToggle";

interface MessageGenerationHandlerProps {
  messageType: MessageType;
  selectedPlatform: string;
  selectedTemplate: string;
  selectedTargetLanguage: string;
  onMessageChange: (message: string) => void;
  onVoiceMessageChange: (message: string) => void;
  onVideoScriptChange: (script: string) => void;
}

export const useMessageGeneration = ({
  messageType,
  selectedPlatform,
  selectedTemplate,
  selectedTargetLanguage,
  onMessageChange,
  onVoiceMessageChange,
  onVideoScriptChange
}: MessageGenerationHandlerProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateWithAI = async () => {
    setIsGenerating(true);
    
    try {
      const generationType = messageType === "video" ? "video generation" : "message generation";
      
      toast({
        title: messageType === "video" ? "Generating Video" : "Generating Message",
        description: messageType === "video" 
          ? "AI is creating your personalized video (mock)..." 
          : "AI is creating your personalized message...",
      });

      // Mock video generation delay
      if (messageType === "video") {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        toast({
          title: "Video Generated (Mock)",
          description: "Your video preview is ready! This is a demo using mock Eleven Labs integration.",
        });
        
        return;
      }

      const response = await fetch('http://localhost:5000/api/user_123/campaigns/summer_fashion_2024/ai_message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: selectedTargetLanguage,
          messageTemplate: selectedTemplate
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.type === 'message' && data.message) {
        if (messageType === "voice") {
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
      console.error(`Error generating AI ${messageType}:`, error);
      toast({
        title: "Generation Failed",
        description: `Failed to generate AI ${messageType}. Please try again.`,
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
