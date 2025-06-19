
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface ReportingHeaderProps {
  isCampaignComplete: boolean;
  onMarkComplete: () => void;
}

const ReportingHeader = ({ isCampaignComplete, onMarkComplete }: ReportingHeaderProps) => {
  return (
    <div className="flex justify-end items-center mb-4">
      {/* Campaign Completion Button - moved to top right only */}
      {!isCampaignComplete && (
        <Button 
          onClick={onMarkComplete}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Mark Campaign Complete
        </Button>
      )}
      
      {isCampaignComplete && (
        <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg">
          <CheckCircle className="h-4 w-4" />
          <span className="font-medium">Campaign Completed</span>
        </div>
      )}
    </div>
  );
};

export default ReportingHeader;
