
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, ChevronDown, ChevronUp, BrainCircuit, MessageSquare, Mail, Phone, FileText } from "lucide-react";

interface AgentSidePanelProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const AgentSidePanel = ({ isCollapsed, onToggleCollapse }: AgentSidePanelProps) => {
  const [agentInput, setAgentInput] = useState('');

  const handleSendToAgent = () => {
    if (agentInput.trim()) {
      console.log('Sending to agent:', agentInput);
      setAgentInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendToAgent();
    }
  };

  const contextChips = [
    { label: "Resend DM", action: () => console.log('Resend DM') },
    { label: "Finalize Deal", action: () => console.log('Finalize Deal') },
    { label: "Schedule Call", action: () => console.log('Schedule Call') },
    { label: "Send Contract", action: () => console.log('Send Contract') }
  ];

  if (isCollapsed) {
    return (
      <Card className="h-fit bg-white shadow-[0_0_10px_rgba(0,0,0,0.05)] rounded-2xl">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white">
                  <BrainCircuit className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-sm font-semibold text-[#1D1D1F] font-['SF_Pro_Display']">
                  Agent
                </h3>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="h-8 w-8 p-0 hover:bg-[#F2F2F7]"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="h-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.05)] rounded-2xl flex flex-col">
      {/* Header */}
      <CardHeader className="border-b border-[#F2F2F7] pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white">
                <BrainCircuit className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg font-semibold text-[#1D1D1F] font-['SF_Pro_Display']">
                Negotiation Agent
              </CardTitle>
              <p className="text-sm text-[#6E6E73] font-['SF_Pro_Text']">
                AI Assistant
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="h-8 w-8 p-0 hover:bg-[#F2F2F7]"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {/* Chat History Tabs */}
      <CardContent className="flex-1 p-4 flex flex-col">
        <Tabs defaultValue="dms" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-4 mb-4 bg-[#F2F2F7] rounded-lg p-1">
            <TabsTrigger 
              value="dms" 
              className="text-xs data-[state=active]:bg-white data-[state=active]:text-[#1D1D1F] data-[state=active]:shadow-sm rounded-md"
            >
              <MessageSquare className="h-3 w-3 mr-1" />
              DMs
            </TabsTrigger>
            <TabsTrigger 
              value="emails" 
              className="text-xs data-[state=active]:bg-white data-[state=active]:text-[#1D1D1F] data-[state=active]:shadow-sm rounded-md"
            >
              <Mail className="h-3 w-3 mr-1" />
              Email
            </TabsTrigger>
            <TabsTrigger 
              value="calls" 
              className="text-xs data-[state=active]:bg-white data-[state=active]:text-[#1D1D1F] data-[state=active]:shadow-sm rounded-md"
            >
              <Phone className="h-3 w-3 mr-1" />
              Calls
            </TabsTrigger>
            <TabsTrigger 
              value="tasks" 
              className="text-xs data-[state=active]:bg-white data-[state=active]:text-[#1D1D1F] data-[state=active]:shadow-sm rounded-md"
            >
              <FileText className="h-3 w-3 mr-1" />
              Tasks
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="dms" className="h-full overflow-y-auto space-y-3">
              <div className="space-y-3">
                <div className="bg-[#F2F2F7] rounded-lg p-3">
                  <p className="text-sm font-['SF_Pro_Text'] text-[#1D1D1F]">
                    "Based on the negotiation patterns, I recommend starting with a higher rate and gradually adjusting based on their response."
                  </p>
                  <p className="text-xs text-[#8E8E93] mt-2">2 minutes ago</p>
                </div>
                <div className="bg-[#E0F3FF] rounded-lg p-3">
                  <p className="text-sm font-['SF_Pro_Text'] text-[#1D1D1F]">
                    "The creator seems interested but price-sensitive. Consider offering package deals or additional perks."
                  </p>
                  <p className="text-xs text-[#8E8E93] mt-2">5 minutes ago</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="emails" className="h-full overflow-y-auto">
              <div className="text-center py-8">
                <Mail className="h-8 w-8 text-[#6E6E73] mx-auto mb-2" />
                <p className="text-sm text-[#6E6E73] font-['SF_Pro_Text']">
                  No email conversations yet
                </p>
              </div>
            </TabsContent>

            <TabsContent value="calls" className="h-full overflow-y-auto">
              <div className="text-center py-8">
                <Phone className="h-8 w-8 text-[#6E6E73] mx-auto mb-2" />
                <p className="text-sm text-[#6E6E73] font-['SF_Pro_Text']">
                  No calls scheduled
                </p>
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="h-full overflow-y-auto">
              <div className="space-y-2">
                <div className="p-3 bg-[#F2F2F7] rounded-lg">
                  <p className="text-sm font-['SF_Pro_Text'] font-medium">Follow up with @creator_handle</p>
                  <p className="text-xs text-[#6E6E73] mt-1">Due in 2 hours</p>
                </div>
                <div className="p-3 bg-[#F2F2F7] rounded-lg">
                  <p className="text-sm font-['SF_Pro_Text'] font-medium">Send contract to 3 creators</p>
                  <p className="text-xs text-[#6E6E73] mt-1">Due tomorrow</p>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>

      {/* Footer Input */}
      <div className="p-4 border-t border-[#F2F2F7] bg-[#FAFAFA] rounded-b-2xl">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {contextChips.map((chip, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={chip.action}
                className="text-xs bg-white border-[#E0E0E0] text-[#0071E3] hover:bg-[#E0F3FF] rounded-full px-3 py-1 h-7"
              >
                {chip.label}
              </Button>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Input
              value={agentInput}
              onChange={(e) => setAgentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Negotiation Agent..."
              className="flex-1 rounded-lg border-[#E0E0E0] focus:border-[#0071E3] focus:ring-[#0071E3] font-['SF_Pro_Text'] text-sm"
            />
            <Button
              onClick={handleSendToAgent}
              disabled={!agentInput.trim()}
              size="sm"
              className="bg-[#0071E3] hover:bg-[#005BB5] text-white rounded-lg px-3 font-['SF_Pro_Text'] disabled:opacity-50"
            >
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AgentSidePanel;
