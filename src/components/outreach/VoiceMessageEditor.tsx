
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceMessageEditorProps {
  voiceMessage: string;
  onVoiceMessageChange: (message: string) => void;
  voiceLanguage: string;
  onVoiceLanguageChange: (language: string) => void;
}

const VoiceMessageEditor = ({ 
  voiceMessage, 
  onVoiceMessageChange, 
  voiceLanguage, 
  onVoiceLanguageChange 
}: VoiceMessageEditorProps) => {
  const { toast } = useToast();

  const handlePreviewVoice = () => {
    toast({
      title: "Voice Preview",
      description: `Playing voice preview in ${voiceLanguage}...`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Voice Message Content
        </label>
        <Input
          value={voiceMessage}
          onChange={(e) => onVoiceMessageChange(e.target.value)}
          placeholder="Type message in English"
          className="w-full"
        />
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
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button 
            variant="outline"
            onClick={handlePreviewVoice}
            disabled={!voiceMessage.trim()}
            className="flex items-center space-x-2"
          >
            <Volume2 className="h-4 w-4" />
            <span>Preview Voice</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VoiceMessageEditor;
