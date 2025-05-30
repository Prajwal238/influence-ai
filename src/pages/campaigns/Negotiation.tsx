
import CampaignLayout from "@/components/layout/CampaignLayout";
import AgentPanel from "@/components/agents/AgentPanel";
import DMThreadPanel from "@/components/negotiation/DMThreadPanel";
import ContactCaptureWidget from "@/components/negotiation/ContactCaptureWidget";
import NegotiationSidePanel from "@/components/negotiation/NegotiationSidePanel";

const Negotiation = () => {
  return (
    <CampaignLayout>
      <div className="grid grid-cols-12 gap-6 min-h-screen">
        {/* Main Content - 8 columns */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <DMThreadPanel />
          <ContactCaptureWidget />
        </div>

        {/* Side Panel - 4 columns */}
        <div className="col-span-12 lg:col-span-4">
          <NegotiationSidePanel />
        </div>
      </div>

      {/* Agent Panel */}
      <AgentPanel agentName="Negotiation Agent" agentType="negotiation" />
    </CampaignLayout>
  );
};

export default Negotiation;
