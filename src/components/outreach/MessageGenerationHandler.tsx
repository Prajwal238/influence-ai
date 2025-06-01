
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MessageType } from "./MessageTypeToggle";
import { buildApiUrl } from "@/config/api";

interface MessageGenerationHandlerProps {
  campaignId?: string;
  messageType: MessageType;
  selectedPlatform: string;
  selectedTemplate: string;
  selectedTargetLanguage: string;
  onMessageChange: (message: string) => void;
  onVoiceMessageChange: (message: string) => void;
  onVideoScriptChange: (script: string) => void;
}

export const useMessageGeneration = ({
  campaignId,
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
    if (!campaignId) {
      toast({
        title: "Campaign Not Found",
        description: "No campaign ID available for message generation.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      toast({
        title: "Generating Message",
        description: "AI is creating your personalized message...",
      });

      const response = await fetch(buildApiUrl(`/api/user_123/campaigns/${campaignId}/ai_message`), {
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
