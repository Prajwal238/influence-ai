
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface ReportingHeaderProps {
  isCampaignComplete: boolean;
  onMarkComplete: () => void;
}

const ReportingHeader = ({ isCampaignComplete, onMarkComplete }: ReportingHeaderProps) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Campaign Performance
        </h1>
        <p className="text-gray-600">
          Track and analyze your campaign metrics across all channels
        </p>
      </div>
      
      {/* Campaign Completion Button */}
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
