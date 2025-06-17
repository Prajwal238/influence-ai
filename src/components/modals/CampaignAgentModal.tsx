
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ChatOrchestrator from "@/components/agents/ChatOrchestrator";
import { useRefreshCampaigns } from "@/hooks/useCampaigns";

interface CampaignAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CampaignAgentModal = ({ isOpen, onClose }: CampaignAgentModalProps) => {
  const refreshCampaigns = useRefreshCampaigns();

  const handleClose = () => {
    refreshCampaigns();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl h-[85vh] p-0 rounded-2xl border-0 shadow-2xl bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 [&>button]:hidden flex flex-col overflow-hidden">
        <DialogTitle className="sr-only">Campaign Agent Chat</DialogTitle>
        
        {/* Decorative header gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
        
        <div className="flex-1 min-h-0 relative">
          <ChatOrchestrator 
            agentName="Campaign Agent"
            agentType="campaign"
            onClose={handleClose}
            className="h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignAgentModal;
