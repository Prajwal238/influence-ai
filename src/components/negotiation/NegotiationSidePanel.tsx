
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, HelpCircle } from "lucide-react";
import { NegotiationThread } from "@/types/outreach";
import NegotiationOverviewTab from "./NegotiationOverviewTab";
import NegotiationContactTab from "./NegotiationContactTab";
import NegotiationAgentLogsTab from "./NegotiationAgentLogsTab";

interface NegotiationSidePanelProps {
  selectedThread?: NegotiationThread;
}

const NegotiationSidePanel = ({ selectedThread }: NegotiationSidePanelProps) => {
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
            <TabsContent value="overview" className="h-full overflow-y-auto">
              <NegotiationOverviewTab selectedThread={selectedThread} />
            </TabsContent>

            <TabsContent value="contact" className="h-full overflow-y-auto">
              <NegotiationContactTab selectedThread={selectedThread} />
            </TabsContent>

            <TabsContent value="logs" className="h-full overflow-y-auto">
              <NegotiationAgentLogsTab />
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
