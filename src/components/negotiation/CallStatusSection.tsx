
import { Badge } from "@/components/ui/badge";
import { CallStatsData } from "./CallStatsTypes";

interface CallStatusSectionProps {
  callData: CallStatsData;
}

const CallStatusSection = ({ callData }: CallStatusSectionProps) => {
  return (
    <div>
      <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
        Call Status
      </h4>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#6E6E73] font-sans">Status</span>
          <Badge variant={callData.status === 'done' ? 'default' : 'secondary'} className="text-xs">
            {callData.status}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#6E6E73] font-sans">Interest Level</span>
          <Badge 
            variant={callData.influencerInterest === 'Interested' ? 'default' : 'secondary'} 
            className="text-xs"
          >
            {callData.influencerInterest}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default CallStatusSection;
