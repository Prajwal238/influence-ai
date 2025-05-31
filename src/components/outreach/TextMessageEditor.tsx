
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

interface TextMessageEditorProps {
  message: string;
  onMessageChange: (message: string) => void;
  selectedPlatform: string;
  onGenerateWithAI: () => void;
  isGenerating: boolean;
}

const TextMessageEditor = ({ 
  message, 
  onMessageChange, 
  selectedPlatform,
  onGenerateWithAI,
  isGenerating 
}: TextMessageEditorProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          Message Content
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
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        className="min-h-32 resize-none"
        placeholder="Write your message..."
      />
      <p className="text-xs text-gray-500">
        Use variables like {"{name}"}, {"{followers}"}, and {"{niche}"} for personalization
      </p>
    </div>
  );
};

export default TextMessageEditor;
