
import CampaignLayout from "@/components/layout/CampaignLayout";

const NegotiationLoadingState = () => {
  return (
    <CampaignLayout>
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0071E3] mx-auto mb-4"></div>
          <p className="text-[#6E6E73] font-sans">Loading negotiations...</p>
        </div>
      </div>
    </CampaignLayout>
  );
};

export default NegotiationLoadingState;
