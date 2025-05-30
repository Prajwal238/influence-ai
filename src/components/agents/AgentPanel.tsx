
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AgentChat from "./AgentChat";
import { MessageSquare, Bot } from "lucide-react";

interface AgentPanelProps {
  agentName: string;
  agentType: 'discovery' | 'outreach' | 'negotiation';
}

const AgentPanel = ({ agentName, agentType }: AgentPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          className="fixed right-4 top-1/2 transform -translate-y-1/2 z-10 bg-blue-600 text-white border-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <Bot className="h-4 w-4 mr-2" />
          Chat with {agentName}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] p-0">
        <AgentChat 
          agentName={agentName}
          agentType={agentType}
          onClose={() => setIsOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
};

export default AgentPanel;
