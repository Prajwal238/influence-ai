
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
      <DialogContent className="max-w-4xl h-[80vh] p-0 rounded-lg [&>button]:hidden flex flex-col">
        <DialogTitle className="sr-only">Campaign Agent Chat</DialogTitle>
        <div className="flex-1 min-h-0">
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
