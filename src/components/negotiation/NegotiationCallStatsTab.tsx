
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
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-sm text-gray-500 font-medium">Loading call stats...</p>
        </div>
      </div>
    );
  }

  if (!callData || !callData.transcript) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
            <Phone className="h-7 w-7 text-gray-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-900">No call data available</h3>
            <p className="text-xs text-gray-500">Call statistics will appear here once available</p>
          </div>
        </div>
      </div>
    );
  }

  const transcript = callData.transcript || [];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-8">
        <CallStatsOverview callData={callData} />
        <CallStatusSection callData={callData} />
        <ConversationTranscript transcript={transcript} />
      </div>
    </div>
  );
};

export default NegotiationCallStatsTab;
