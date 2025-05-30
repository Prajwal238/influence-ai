
import { useNavigate, useLocation } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
      <DialogContent className="max-w-4xl h-[80vh] p-0 rounded-lg">
        <AgentChat 
          agentName="Campaign Agent"
          agentType="campaign"
          onClose={handleClose}
          className="h-full"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CampaignAgentModal;
