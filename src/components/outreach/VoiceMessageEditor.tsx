
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Volume2, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { buildApiUrl } from "@/config/api";

interface VoiceMessageEditorProps {
  voiceMessage: string;
  onVoiceMessageChange: (message: string) => void;
  voiceLanguage: string;
  onVoiceLanguageChange: (language: string) => void;
  selectedPlatform: string;
  onGenerateWithAI: () => void;
  isGenerating: boolean;
}

const VoiceMessageEditor = ({ 
  voiceMessage, 
  onVoiceMessageChange, 
  voiceLanguage, 
  onVoiceLanguageChange,
  selectedPlatform,
  onGenerateWithAI,
  isGenerating
}: VoiceMessageEditorProps) => {
  const { toast } = useToast();
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  // Map full language names to short codes
  const getLanguageCode = (language: string): string => {
    const languageMap: { [key: string]: string } = {
      'english': 'en',
      'spanish': 'es',
      'french': 'fr',
      'german': 'de',
      'italian': 'it',
      'portuguese': 'pt'
    };
    return languageMap[language] || 'en';
  };

  const handlePreviewVoice = async () => {
    if (!voiceMessage.trim()) {
      toast({
        title: "No Content",
        description: "Please add message content before previewing voice.",
        variant: "destructive"
      });
      return;
    }

    setIsPreviewLoading(true);
    
    try {
      const languageCode = getLanguageCode(voiceLanguage);
      
      toast({
        title: "Generating Voice Preview",
        description: "Converting your message to voice...",
      });

      const response = await fetch(buildApiUrl('/api/user_123/voice_preview'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: languageCode,
          message: voiceMessage
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get the audio blob from the response
      const audioBlob = await response.blob();
      
      // Create audio URL and play it
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onloadeddata = () => {
        audio.play().then(() => {
          toast({
            title: "Voice Preview Ready",
            description: "Playing your voice message preview!",
          });
        }).catch((error) => {
          console.error('Error playing audio:', error);
          toast({
            title: "Playback Error",
            description: "Failed to play the voice preview.",
            variant: "destructive"
          });
        });
      };

      audio.onerror = () => {
        toast({
          title: "Audio Error",
          description: "Failed to load the voice preview.",
          variant: "destructive"
        });
      };

      // Clean up the URL when audio ends
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };

    } catch (error) {
      console.error('Error generating voice preview:', error);
      toast({
        title: "Preview Failed",
        description: "Failed to generate voice preview. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsPreviewLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Voice Message Content
          </label>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onGenerateWithAI}
            disabled={isGenerating}
            className="flex items-center space-x-2"
          >
            <Sparkles className="h-4 w-4" />
            <span>{isGenerating ? 'Generating...' : 'Generate with AI'}</span>
          </Button>
        </div>
        <Textarea
          value={voiceMessage}
          onChange={(e) => onVoiceMessageChange(e.target.value)}
          placeholder="Write your voice message content..."
          className="min-h-32 resize-none"
        />
        <p className="text-xs text-gray-500">
          Use variables like {"{name}"}, {"{followers}"}, and {"{niche}"} for personalization
        </p>
      </div>
      
      <div className="flex space-x-3">
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Voice Language
          </label>
          <Select value={voiceLanguage} onValueChange={onVoiceLanguageChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="italian">Italian</SelectItem>
              <SelectItem value="portuguese">Portuguese</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button 
            variant="outline"
            onClick={handlePreviewVoice}
            disabled={!voiceMessage.trim() || isPreviewLoading}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 border-0"
          >
            {isPreviewLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
            <span>{isPreviewLoading ? 'Generating...' : 'Preview Voice'}</span>
          </Button>
        </div>
      </div>

      {/* Voice Settings Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-1">
          <Volume2 className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-900">Voice Message Settings</span>
        </div>
        <p className="text-sm text-blue-800">
          Your message will be converted to a natural-sounding voice in {voiceLanguage} and sent as an audio message on {selectedPlatform}.
        </p>
      </div>
    </div>
  );
};

export default VoiceMessageEditor;
