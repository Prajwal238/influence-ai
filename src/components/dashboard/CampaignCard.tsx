
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Campaign } from "@/types/campaign";

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Discovery": return "bg-blue-100 text-blue-800";
      case "Outreach": return "bg-yellow-100 text-yellow-800";
      case "Negotiation": return "bg-purple-100 text-purple-800";
      case "Contracts": return "bg-orange-100 text-orange-800";
      case "Payments": return "bg-green-100 text-green-800";
      case "Reporting": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  // For now, using hardcoded values as requested
  const progress = Math.floor(Math.random() * 80) + 20; // Random progress between 20-100
  const stage = "Discovery"; // Default stage

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-2">
          <h3 className="font-medium text-gray-900">{campaign.campaignName}</h3>
          <Badge className={getStageColor(stage)}>
            {stage}
          </Badge>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>{progress}% Complete</span>
          <span>•</span>
          <span>Updated {formatDate(campaign.lastModifiedAt)}</span>
          <span>•</span>
          <span>Budget: ${campaign.totalBudget.toLocaleString()}</span>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-24 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <Link to={`/campaigns/${campaign._id}/discovery`}>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CampaignCard;
