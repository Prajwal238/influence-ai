
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface AISearchInputProps {
  onSearch: (prompt: string) => void;
  loading: boolean;
  searchHistory: string[];
}

const AISearchInput = ({ onSearch, loading, searchHistory }: AISearchInputProps) => {
  const [customPrompt, setCustomPrompt] = useState("");

  const handleCustomSearch = () => {
    if (customPrompt.trim()) {
      onSearch(customPrompt.trim());
      setCustomPrompt("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleCustomSearch();
    }
  };

  return (
    <div className="border-t pt-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Refine your search</h3>
        {searchHistory.length > 0 && (
          <div className="flex gap-2">
            {searchHistory.slice(0, 2).map((prompt, index) => (
              <button
                key={index}
                onClick={() => setCustomPrompt(prompt)}
                className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 truncate max-w-32"
                title={prompt}
              >
                {prompt.length > 20 ? `${prompt.slice(0, 20)}...` : prompt}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex gap-3">
        <Textarea
          placeholder="Ask for specific types of influencers... (e.g., 'Find fitness influencers with high engagement rates' or 'Show me micro-influencers in the beauty niche')"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 min-h-[60px] resize-none"
          disabled={loading}
        />
        <Button
          onClick={handleCustomSearch}
          disabled={!customPrompt.trim() || loading}
          className="self-end h-[60px] px-6"
        >
          <Send className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
      
      <p className="text-xs text-gray-500">
        Press Ctrl+Enter to search • Use specific keywords for better results
      </p>
    </div>
  );
};

export default AISearchInput;
