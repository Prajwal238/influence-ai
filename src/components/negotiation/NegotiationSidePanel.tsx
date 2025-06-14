
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, HelpCircle } from "lucide-react";
import { NegotiationThread } from "@/types/outreach";
import NegotiationOverviewTab from "./NegotiationOverviewTab";
import NegotiationContactTab from "./NegotiationContactTab";
import NegotiationCallStatsTab from "./NegotiationCallStatsTab";
import { useParams } from "react-router-dom";

interface NegotiationSidePanelProps {
  selectedThread?: NegotiationThread;
  onCall?: () => void;
}

const NegotiationSidePanel = ({ selectedThread, onCall }: NegotiationSidePanelProps) => {
  const { id: campaignId } = useParams<{ id: string }>();

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
    <Card className="h-full bg-white shadow-apple rounded-2xl border-0 flex flex-col">
      <CardHeader className="border-b border-[#F2F2F7] pb-4 flex-shrink-0">
        <CardTitle className="text-xl font-semibold text-[#1D1D1F] font-sans tracking-tight">
          Thread Details
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 flex flex-col min-h-0">
        <Tabs defaultValue="overview" className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-3 bg-[#F2F2F7] m-4 rounded-xl p-1 flex-shrink-0">
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
              value="callstats" 
              className="text-sm data-[state=active]:bg-white data-[state=active]:text-[#1D1D1F] data-[state=active]:shadow-sm rounded-lg font-sans font-medium"
            >
              Call Stats
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 min-h-0 overflow-hidden">
            <TabsContent value="overview" className="h-full m-0 overflow-y-auto">
              <NegotiationOverviewTab selectedThread={selectedThread} />
            </TabsContent>

            <TabsContent value="contact" className="h-full m-0 overflow-y-auto">
              <NegotiationContactTab selectedThread={selectedThread} onCall={onCall} />
            </TabsContent>

            <TabsContent value="callstats" className="h-full m-0 overflow-y-auto">
              <NegotiationCallStatsTab selectedThread={selectedThread} campaignId={campaignId} />
            </TabsContent>
          </div>
        </Tabs>

        {/* Help Footer */}
        <div className="p-4 border-t border-[#F2F2F7] bg-[#FAFAFA] rounded-b-2xl flex-shrink-0">
          <div className="flex items-start space-x-2">
            <HelpCircle className="h-4 w-4 text-[#0071E3] mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#1D1D1F] font-sans mb-1">
                Quick Help
              </p>
              <p className="text-xs text-[#6E6E73] font-sans leading-tight">
                <strong>Take Over:</strong> Manual messages pause agent.<br />
                <strong>Return:</strong> Agent resumes automatically.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NegotiationSidePanel;
