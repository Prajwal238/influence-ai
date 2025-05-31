
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import DiscoveryResults from "./DiscoveryResults";
import { Influencer, ApiInfluencer } from "@/types/influencer";
import { transformApiDataToInfluencer } from "@/utils/influencerTransforms";

interface AISearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaignId: string;
  isInCampaign: (influencer: Influencer) => boolean;
  onAddToCampaign: (influencer: Influencer) => Promise<boolean>;
  onRemoveFromCampaign: (influencer: Influencer) => Promise<boolean>;
}

const AISearchDialog = ({
  open,
  onOpenChange,
  campaignId,
  isInCampaign,
  onAddToCampaign,
  onRemoveFromCampaign
}: AISearchDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const handleSearch = async (prompt?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Calling AI search API for campaign:', campaignId, 'with prompt:', prompt);
      
      const url = `http://localhost:5000/api/user_123/campaigns/${campaignId}/influencers/llm`;
      
      let requestOptions: RequestInit;
      
      if (prompt) {
        // Custom prompt search - use POST with prompt in body
        requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userPrompt: prompt
          })
        };
      } else {
        // Default recommendations - use GET
        requestOptions = {
          method: 'GET'
        };
      }
      
      const response = await fetch(url, requestOptions);
      
      if (!response.ok) {
        throw new Error('Failed to fetch AI recommendations');
      }
      
      const apiInfluencers: ApiInfluencer[] = await response.json();
      console.log('AI search results:', apiInfluencers.length, 'influencers');
      
      // Transform API data to our influencer format
      const transformedInfluencers = apiInfluencers.map(data => 
        transformApiDataToInfluencer(data, false)
      );
      
      setInfluencers(transformedInfluencers);
      
      // Add to search history if it was a custom prompt
      if (prompt && prompt.trim()) {
        setSearchHistory(prev => [prompt, ...prev.slice(0, 4)]); // Keep last 5 searches
      }
    } catch (err) {
      console.error('Error fetching AI recommendations:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomSearch = () => {
    if (customPrompt.trim()) {
      handleSearch(customPrompt.trim());
      setCustomPrompt("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleCustomSearch();
    }
  };

  // Load initial recommendations when dialog opens
  useEffect(() => {
    if (open && influencers.length === 0) {
      console.log('Dialog opened, triggering initial API call...');
      handleSearch();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>AI-Powered Influencer Search</span>
          </DialogTitle>
        </DialogHeader>
        
        {/* Results Section */}
        <div className="flex-1 min-h-0 mb-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-gray-600">Finding perfect influencer matches...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-red-600 mb-4">Error: {error}</p>
                <button 
                  onClick={() => handleSearch()}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : influencers.length > 0 ? (
            <ScrollArea className="h-full">
              <div className="p-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    Found {influencers.length} AI-recommended influencers
                  </p>
                </div>
                <DiscoveryResults
                  influencers={influencers}
                  isInCampaign={isInCampaign}
                  onAddToCampaign={onAddToCampaign}
                  onRemoveFromCampaign={onRemoveFromCampaign}
                  showCampaignInfluencers={false}
                />
              </div>
            </ScrollArea>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No recommendations found</p>
            </div>
          )}
        </div>

        {/* Custom Prompt Section */}
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
      </DialogContent>
    </Dialog>
  );
};

export default AISearchDialog;
