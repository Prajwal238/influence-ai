
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
      <DialogContent className="max-w-4xl h-[80vh] p-0 rounded-3xl border-0 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.12)] bg-white/95 backdrop-blur-xl [&>button]:hidden flex flex-col overflow-hidden">
        <DialogTitle className="sr-only">Campaign Agent Chat</DialogTitle>
        
        {/* Minimal decorative accent */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></div>
        
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
