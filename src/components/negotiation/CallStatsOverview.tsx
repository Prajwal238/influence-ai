
import { Clock, MessageSquare } from "lucide-react";
import { CallStatsData } from "./CallStatsTypes";

interface CallStatsOverviewProps {
  callData: CallStatsData;
}

const CallStatsOverview = ({ callData }: CallStatsOverviewProps) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const transcript = callData.transcript || [];

  return (
    <div>
      <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
        Call Overview
      </h4>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#F2F2F7] rounded-xl p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Clock className="h-4 w-4 text-[#6E6E73]" />
            <span className="text-xs font-medium text-[#6E6E73] font-sans">Duration</span>
          </div>
          <p className="text-sm font-semibold text-[#1D1D1F] font-sans">
            {formatDuration(callData.callDurationSeconds)}
          </p>
        </div>
        <div className="bg-[#F2F2F7] rounded-xl p-3">
          <div className="flex items-center space-x-2 mb-1">
            <MessageSquare className="h-4 w-4 text-[#6E6E73]" />
            <span className="text-xs font-medium text-[#6E6E73] font-sans">Messages</span>
          </div>
          <p className="text-sm font-semibold text-[#1D1D1F] font-sans">
            {transcript.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CallStatsOverview;
