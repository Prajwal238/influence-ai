
import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AISearchResults from "./AISearchResults";
import AISearchInput from "./AISearchInput";
import { Influencer } from "@/types/influencer";
import { useAISearch } from "@/hooks/useAISearch";
import { useSearchHistory } from "@/hooks/useSearchHistory";

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
  const { loading, influencers, error, searchInfluencers, resetSearch } = useAISearch();
  const { searchHistory, addToHistory } = useSearchHistory();

  const handleSearch = async (prompt?: string) => {
    try {
      await searchInfluencers(campaignId, prompt);
      if (prompt) {
        addToHistory(prompt);
      }
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  const handleRetry = () => {
    handleSearch();
  };

  // Load initial recommendations when dialog opens
  useEffect(() => {
    if (open && influencers.length === 0) {
      console.log('Dialog opened, triggering initial API call...');
      handleSearch();
    }
  }, [open]);

  // Reset search when dialog closes
  useEffect(() => {
    if (!open) {
      resetSearch();
    }
  }, [open, resetSearch]);

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
          <AISearchResults
            loading={loading}
            error={error}
            influencers={influencers}
            isInCampaign={isInCampaign}
            onAddToCampaign={onAddToCampaign}
            onRemoveFromCampaign={onRemoveFromCampaign}
            onRetry={handleRetry}
          />
        </div>

        {/* Custom Prompt Section */}
        <AISearchInput
          onSearch={handleSearch}
          loading={loading}
          searchHistory={searchHistory}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AISearchDialog;
