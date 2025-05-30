
import { useNavigate, useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import AgentChat from "@/components/agents/AgentChat";

const CampaignAgentModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isOpen = location.pathname === '/dashboard/campaign-agent';

  const handleClose = () => {
    navigate('/dashboard');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl h-[80vh] p-0 rounded-lg [&>button]:hidden flex flex-col">
        <DialogTitle className="sr-only">Campaign Agent Chat</DialogTitle>
        <div className="flex-1 min-h-0">
          <AgentChat 
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
