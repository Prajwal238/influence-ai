
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
      polling: { bg: 'bg-gray-200', text: 'text-gray-600', label: 'Polling' },
      chatting: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Chatting' },
      waitingPhone: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Waiting Phone' },
      calling: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Calling' },
      complete: { bg: 'bg-green-100', text: 'text-green-700', label: 'Complete' }
    };

    const config = configs[status as keyof typeof configs] || configs.polling;
    return (
      <Badge className={`${config.bg} ${config.text} rounded-full px-2 py-1 text-xs border-0`}>
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
      <Card className="h-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.05)] rounded-2xl flex items-center justify-center">
        <div className="text-center p-6">
          <Activity className="h-12 w-12 text-[#6E6E73] mx-auto mb-3" />
          <p className="text-[#6E6E73] font-['SF_Pro_Text']">
            Select a thread to view details
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.05)] rounded-2xl">
      <CardHeader className="border-b border-[#F2F2F7] pb-4">
        <CardTitle className="text-lg font-semibold text-[#1D1D1F] font-['SF_Pro_Display']">
          Thread Details
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0 h-full">
        <Tabs defaultValue="overview" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 bg-[#F2F2F7] m-4 rounded-lg p-1">
            <TabsTrigger 
              value="overview" 
              className="text-xs data-[state=active]:bg-white data-[state=active]:text-[#1D1D1F] data-[state=active]:shadow-sm rounded-md font-['SF_Pro_Text']"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="contact" 
              className="text-xs data-[state=active]:bg-white data-[state=active]:text-[#1D1D1F] data-[state=active]:shadow-sm rounded-md font-['SF_Pro_Text']"
            >
              Contact
            </TabsTrigger>
            <TabsTrigger 
              value="logs" 
              className="text-xs data-[state=active]:bg-white data-[state=active]:text-[#1D1D1F] data-[state=active]:shadow-sm rounded-md font-['SF_Pro_Text']"
            >
              Agent Logs
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="overview" className="px-4 h-full overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-[#1D1D1F] font-['SF_Pro_Display'] mb-2">
                    Current Status
                  </h4>
                  {getStatusBadge(selectedThread.agentStatus)}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-[#1D1D1F] font-['SF_Pro_Display'] mb-2">
                    Control Mode
                  </h4>
                  <Badge className={`${
                    selectedThread.controlMode === 'agent' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-green-100 text-green-700'
                  } rounded-full px-2 py-1 text-xs border-0`}>
                    {selectedThread.controlMode === 'agent' ? 'AI Agent' : 'Manual'}
                  </Badge>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-[#1D1D1F] font-['SF_Pro_Display'] mb-2">
                    Last Activity
                  </h4>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-3 w-3 text-[#6E6E73]" />
                    <span className="text-xs text-[#6E6E73] font-['SF_Pro_Text']">
                      {new Date(selectedThread.lastActivity).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-[#1D1D1F] font-['SF_Pro_Display'] mb-2">
                    Messages
                  </h4>
                  <p className="text-xs text-[#6E6E73] font-['SF_Pro_Text']">
                    {selectedThread.messages.length} total messages
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-[#1D1D1F] font-['SF_Pro_Display'] mb-2">
                    Next Steps
                  </h4>
                  <p className="text-xs text-[#6E6E73] font-['SF_Pro_Text']">
                    {selectedThread.agentStatus === 'polling' && 'Waiting for creator response'}
                    {selectedThread.agentStatus === 'chatting' && 'Actively negotiating terms'}
                    {selectedThread.agentStatus === 'waitingPhone' && 'Requesting phone number for call'}
                    {selectedThread.agentStatus === 'calling' && 'On active voice call'}
                    {selectedThread.agentStatus === 'complete' && 'Negotiation finished'}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="px-4 h-full overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-[#1D1D1F] font-['SF_Pro_Display'] mb-2">
                    Creator Info
                  </h4>
                  <div className="bg-[#F2F2F7] rounded-lg p-3">
                    <p className="text-sm font-medium text-[#1D1D1F] font-['SF_Pro_Text']">
                      {selectedThread.name}
                    </p>
                    <p className="text-xs text-[#6E6E73] font-['SF_Pro_Text']">
                      {selectedThread.handle}
                    </p>
                  </div>
                </div>

                {selectedThread.contact?.email && (
                  <div>
                    <h4 className="text-sm font-medium text-[#1D1D1F] font-['SF_Pro_Display'] mb-2">
                      Email
                    </h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-[#F2F2F7] rounded-lg p-2">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-3 w-3 text-[#6E6E73]" />
                          <span className="text-xs text-[#1D1D1F] font-['SF_Pro_Text']">
                            {selectedThread.contact.email}
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleCopy(selectedThread.contact!.email!, 'Email')}
                        variant="outline"
                        size="sm"
                        className="p-2"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}

                {selectedThread.contact?.phone && (
                  <div>
                    <h4 className="text-sm font-medium text-[#1D1D1F] font-['SF_Pro_Display'] mb-2">
                      Phone
                    </h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-[#F2F2F7] rounded-lg p-2">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-3 w-3 text-[#6E6E73]" />
                          <span className="text-xs text-[#1D1D1F] font-['SF_Pro_Text']">
                            {selectedThread.contact.phone}
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleCopy(selectedThread.contact!.phone!, 'Phone')}
                        variant="outline"
                        size="sm"
                        className="p-2"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="logs" className="px-4 h-full overflow-y-auto">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-[#1D1D1F] font-['SF_Pro_Display'] mb-2">
                  Agent Activity
                </h4>
                {mockAgentLogs.map((log, index) => (
                  <div key={index} className="bg-[#F2F2F7] rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-xs text-[#1D1D1F] font-['SF_Pro_Text']">
                          {log.action}
                        </p>
                        <p className="text-xs text-[#8E8E93] font-['SF_Pro_Text'] mt-1">
                          {log.time}
                        </p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        log.type === 'success' ? 'bg-green-500' :
                        log.type === 'pending' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>

        {/* Help Footer */}
        <div className="p-4 border-t border-[#F2F2F7] bg-[#FAFAFA] rounded-b-2xl">
          <div className="flex items-start space-x-2">
            <HelpCircle className="h-4 w-4 text-[#0071E3] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-[#1D1D1F] font-['SF_Pro_Text'] mb-1">
                Quick Help
              </p>
              <p className="text-xs text-[#6E6E73] font-['SF_Pro_Text'] leading-relaxed">
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
