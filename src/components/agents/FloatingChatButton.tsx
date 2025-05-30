
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AgentChat from "./AgentChat";
import { BrainCircuit, X } from "lucide-react";

interface FloatingChatButtonProps {
  agentName: string;
  agentType: 'discovery' | 'outreach' | 'negotiation';
}

const FloatingChatButton = ({ agentName, agentType }: FloatingChatButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110 z-50"
        size="icon"
      >
        <BrainCircuit className="h-6 w-6 text-white" />
        <span className="sr-only">Chat with {agentName}</span>
      </Button>

      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl h-[700px] p-0 rounded-lg animate-scale-in">
          <AgentChat 
            agentName={agentName}
            agentType={agentType}
            onClose={() => setIsOpen(false)}
            className="h-full"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingChatButton;
