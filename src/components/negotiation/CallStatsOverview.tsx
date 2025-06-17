
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
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
        <h4 className="text-sm font-semibold text-gray-900">Call Overview</h4>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border border-blue-100/50 hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-blue-700/80 uppercase tracking-wide">Duration</span>
          </div>
          <p className="text-lg font-bold text-gray-900">
            {formatDuration(callData.callDurationSeconds)}
          </p>
        </div>

        <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-4 border border-emerald-100/50 hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-emerald-600" />
            </div>
            <span className="text-xs font-medium text-emerald-700/80 uppercase tracking-wide">Messages</span>
          </div>
          <p className="text-lg font-bold text-gray-900">
            {transcript.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CallStatsOverview;
