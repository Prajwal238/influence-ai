
import { useParams } from "react-router-dom";
import CampaignLayout from "@/components/layout/CampaignLayout";
import AgentPanel from "@/components/agents/AgentPanel";
import OutreachPageHeader from "@/components/outreach/OutreachPageHeader";
import OutreachPageContent from "@/components/outreach/OutreachPageContent";
import OutreachPageSidebar from "@/components/outreach/OutreachPageSidebar";
import { useOutreachInfluencers } from "@/hooks/useOutreachInfluencers";
import { useOutreachData } from "@/hooks/useOutreachData";

const Outreach = () => {
  const { id: campaignId } = useParams();
  const { outreachLog } = useOutreachData();
  
  const {
    selectedInfluencers,
    transformedInfluencers,
    loading,
    error,
    updateInfluencerSelection,
    removeInfluencerSelection,
    clearSelectedInfluencers
  } = useOutreachInfluencers(campaignId);

  if (loading) {
    return (
      <CampaignLayout>
        <div className="flex items-center justify-center py-8">
          <p className="text-gray-500">Loading influencers...</p>
        </div>
      </CampaignLayout>
    );
  }

  if (error) {
    return (
      <CampaignLayout>
        <div className="flex items-center justify-center py-8">
          <p className="text-red-500">Error loading influencers: {error}</p>
        </div>
      </CampaignLayout>
    );
  }

  return (
    <CampaignLayout>
      <div className="space-y-4">
        <OutreachPageHeader />
        
        <div className="flex gap-6">
          <OutreachPageContent
            transformedInfluencers={transformedInfluencers}
            selectedInfluencers={selectedInfluencers}
            onUpdateSelection={updateInfluencerSelection}
            onRemoveSelection={removeInfluencerSelection}
            onClearSelectedInfluencers={clearSelectedInfluencers}
          />

          <OutreachPageSidebar outreachLog={outreachLog} />
        </div>

        <AgentPanel agentName="Outreach Agent" agentType="outreach" />
      </div>
    </CampaignLayout>
  );
};

export default Outreach;
