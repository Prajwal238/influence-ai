
import { Phone } from "lucide-react";
import { CallStatsProps } from "./CallStatsTypes";
import { useCallStats } from "./useCallStats";
import CallStatsOverview from "./CallStatsOverview";
import CallStatusSection from "./CallStatusSection";
import ConversationTranscript from "./ConversationTranscript";

const NegotiationCallStatsTab = ({ selectedThread, campaignId }: CallStatsProps) => {
  const { callData, loading } = useCallStats({ selectedThread, campaignId });

  if (loading) {
    return (
      <div className="px-6 py-8 text-center">
        <div className="animate-spin h-6 w-6 border-2 border-[#0071E3] border-t-transparent rounded-full mx-auto mb-2"></div>
        <p className="text-sm text-[#6E6E73] font-sans">Loading call stats...</p>
      </div>
    );
  }

  if (!callData || !callData.transcript) {
    return (
      <div className="px-6 py-8 text-center">
        <Phone className="h-8 w-8 text-[#6E6E73] mx-auto mb-2" />
        <p className="text-sm text-[#6E6E73] font-sans">No call data available</p>
      </div>
    );
  }

  const transcript = callData.transcript || [];

  return (
    <div className="px-6 h-full overflow-y-auto">
      <div className="space-y-6">
        <CallStatsOverview callData={callData} />
        <CallStatusSection callData={callData} />
        <ConversationTranscript transcript={transcript} />
      </div>
    </div>
  );
};

export default NegotiationCallStatsTab;
