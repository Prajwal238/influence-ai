
import CampaignLayout from "@/components/layout/CampaignLayout";

interface NegotiationErrorStateProps {
  error: string;
}

const NegotiationErrorState = ({ error }: NegotiationErrorStateProps) => {
  return (
    <CampaignLayout>
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-sans mb-4">Error loading negotiations: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-[#0071E3] text-white px-4 py-2 rounded-xl"
          >
            Retry
          </button>
        </div>
      </div>
    </CampaignLayout>
  );
};

export default NegotiationErrorState;
