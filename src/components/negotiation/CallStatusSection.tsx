
import { Badge } from "@/components/ui/badge";
import { CallStatsData } from "./CallStatsTypes";

interface CallStatusSectionProps {
  callData: CallStatsData;
}

const CallStatusSection = ({ callData }: CallStatusSectionProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'done':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getInterestColor = (interest: string) => {
    switch (interest.toLowerCase()) {
      case 'interested':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'not interested':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
        <h4 className="text-sm font-semibold text-gray-900">Call Status</h4>
      </div>
      
      <div className="bg-gray-50/50 rounded-xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Status</span>
          <Badge 
            className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(callData.status)}`}
          >
            {callData.status}
          </Badge>
        </div>
        
        <div className="h-px bg-gray-200"></div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Interest Level</span>
          <Badge 
            className={`px-3 py-1 text-xs font-medium rounded-full border ${getInterestColor(callData.influencerInterest)}`}
          >
            {callData.influencerInterest}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default CallStatusSection;
