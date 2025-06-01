
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Phone, Mail, Clock, Activity, HelpCircle } from "lucide-react";
import { NegotiationThread } from "@/types/outreach";
import { useToast } from "@/hooks/use-toast";

interface NegotiationSidePanelProps {
  selectedThread?: NegotiationThread;
}

const NegotiationSidePanel = ({ selectedThread }: NegotiationSidePanelProps) => {
  const { toast } = useToast();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} copied successfully`,
    });
  };

  const getStatusBadge = (status: string) => {
    const configs = {
      polling: { bg: 'bg-[#F2F2F7]', text: 'text-[#6E6E73]', label: 'Polling' },
      chatting: { bg: 'bg-[#E0F3FF]', text: 'text-[#0071E3]', label: 'Chatting' },
      waitingPhone: { bg: 'bg-[#FFF4E6]', text: 'text-[#FF9500]', label: 'Waiting Phone' },
      calling: { bg: 'bg-[#F0E6FF]', text: 'text-[#7B68EE]', label: 'Calling' },
      complete: { bg: 'bg-[#E6F7ED]', text: 'text-[#34C759]', label: 'Complete' }
    };

    const config = configs[status as keyof typeof configs] || configs.polling;
    return (
      <Badge className={`${config.bg} ${config.text} rounded-full px-3 py-1 text-xs font-medium border-0 font-['SF_Pro_Text']`}>
        {config.label}
      </Badge>
    );
  };

  const mockAgentLogs = [
    { time: '14:32', action: 'Started polling for replies', type: 'info' },
    { time: '14:35', action: 'Received DM reply from creator', type: 'success' },
    { time: '14:36', action: 'Generated response using LLM', type: 'info' },
    { time: '14:37', action: 'Sent negotiation counter-offer', type: 'success' },
    { time: '14:40', action: 'Waiting for creator response...', type: 'pending' }
  ];

  if (!selectedThread) {
    return (
      <Card className="h-full bg-white shadow-apple rounded-2xl border-0 flex items-center justify-center">
        <div className="text-center p-6">
          <Activity className="h-12 w-12 text-[#6E6E73] mx-auto mb-4" />
          <p className="text-[#6E6E73] font-sans text-lg">
            Select a thread to view details
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full bg-white shadow-apple rounded-2xl border-0">
      <CardHeader className="border-b border-[#F2F2F7] pb-4">
        <CardTitle className="text-xl font-semibold text-[#1D1D1F] font-sans tracking-tight">
          Thread Details
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0 h-full">
        <Tabs defaultValue="overview" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 bg-[#F2F2F7] m-4 rounded-xl p-1">
            <TabsTrigger 
              value="overview" 
              className="text-sm data-[state=active]:bg-white data-[state=active]:text-[#1D1D1F] data-[state=active]:shadow-sm rounded-lg font-sans font-medium"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="contact" 
              className="text-sm data-[state=active]:bg-white data-[state=active]:text-[#1D1D1F] data-[state=active]:shadow-sm rounded-lg font-sans font-medium"
            >
              Contact
            </TabsTrigger>
            <TabsTrigger 
              value="logs" 
              className="text-sm data-[state=active]:bg-white data-[state=active]:text-[#1D1D1F] data-[state=active]:shadow-sm rounded-lg font-sans font-medium"
            >
              Agent Logs
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="overview" className="px-6 h-full overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
                    Current Status
                  </h4>
                  {getStatusBadge(selectedThread.agentStatus)}
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
                    Control Mode
                  </h4>
                  <Badge className={`${
                    selectedThread.controlMode === 'agent' 
                      ? 'bg-[#E0F3FF] text-[#0071E3]' 
                      : 'bg-[#E6F7ED] text-[#34C759]'
                  } rounded-full px-3 py-1 text-xs font-medium border-0 font-sans`}>
                    {selectedThread.controlMode === 'agent' ? 'AI Agent' : 'Manual'}
                  </Badge>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
                    Platform
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-[#1D1D1F] font-sans">
                      In<span className="text-[#0071E3] font-medium">flow</span>encer.ai
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
                    Last Activity
                  </h4>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-[#6E6E73]" />
                    <span className="text-sm text-[#6E6E73] font-sans">
                      {new Date(selectedThread.lastActivity).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
                    Messages
                  </h4>
                  <p className="text-sm text-[#6E6E73] font-sans">
                    {selectedThread.messages.length} total messages
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
                    Next Steps
                  </h4>
                  <p className="text-sm text-[#6E6E73] font-sans leading-relaxed">
                    {selectedThread.agentStatus === 'polling' && 'Waiting for creator response'}
                    {selectedThread.agentStatus === 'chatting' && 'Actively negotiating terms'}
                    {selectedThread.agentStatus === 'waitingPhone' && 'Requesting phone number for call'}
                    {selectedThread.agentStatus === 'calling' && 'On active voice call'}
                    {selectedThread.agentStatus === 'complete' && 'Negotiation finished'}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="px-6 h-full overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
                    Creator Info
                  </h4>
                  <div className="bg-[#F2F2F7] rounded-xl p-4">
                    <p className="text-sm font-semibold text-[#1D1D1F] font-sans">
                      {selectedThread.name}
                    </p>
                    <p className="text-sm text-[#6E6E73] font-sans">
                      {selectedThread.handle}
                    </p>
                  </div>
                </div>

                {selectedThread.contact?.email && (
                  <div>
                    <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
                      Email
                    </h4>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-[#F2F2F7] rounded-xl p-3">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-[#6E6E73]" />
                          <span className="text-sm text-[#1D1D1F] font-sans">
                            {selectedThread.contact.email}
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleCopy(selectedThread.contact!.email!, 'Email')}
                        variant="outline"
                        size="sm"
                        className="p-2 border-[#E0E0E0] hover:border-[#0071E3] hover:bg-[#F8F9FA]"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {selectedThread.contact?.phone && (
                  <div>
                    <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
                      Phone
                    </h4>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-[#F2F2F7] rounded-xl p-3">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-[#6E6E73]" />
                          <span className="text-sm text-[#1D1D1F] font-sans">
                            {selectedThread.contact.phone}
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleCopy(selectedThread.contact!.phone!, 'Phone')}
                        variant="outline"
                        size="sm"
                        className="p-2 border-[#E0E0E0] hover:border-[#0071E3] hover:bg-[#F8F9FA]"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="logs" className="px-6 h-full overflow-y-auto">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-4">
                  Agent Activity
                </h4>
                {mockAgentLogs.map((log, index) => (
                  <div key={index} className="bg-[#F2F2F7] rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-[#1D1D1F] font-sans">
                          {log.action}
                        </p>
                        <p className="text-sm text-[#8E8E93] font-sans mt-2">
                          {log.time}
                        </p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        log.type === 'success' ? 'bg-[#34C759]' :
                        log.type === 'pending' ? 'bg-[#FF9500]' :
                        'bg-[#0071E3]'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>

        {/* Help Footer */}
        <div className="p-6 border-t border-[#F2F2F7] bg-[#FAFAFA] rounded-b-2xl">
          <div className="flex items-start space-x-3">
            <HelpCircle className="h-5 w-5 text-[#0071E3] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#1D1D1F] font-sans mb-2">
                Quick Help
              </p>
              <p className="text-sm text-[#6E6E73] font-sans leading-relaxed">
                <strong>Take Over:</strong> Your manual messages pause the agent.<br />
                <strong>Return to Agent:</strong> Agent resumes automatically.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NegotiationSidePanel;
