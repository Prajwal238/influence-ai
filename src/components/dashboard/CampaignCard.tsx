
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Campaign } from "@/types/campaign";
import { getCampaignProgressForDashboard } from "@/hooks/useCampaignProgress";
import { useState, useEffect } from "react";

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const [progress, setProgress] = useState(0);

  // Update progress when component mounts or when localStorage changes
  useEffect(() => {
    const updateProgress = () => {
      const { percentage } = getCampaignProgressForDashboard(campaign._id);
      setProgress(percentage);
    };

    // Initial load
    updateProgress();

    // Listen for localStorage changes (when user returns from other pages)
    const handleStorageChange = () => {
      updateProgress();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for focus events (when user returns to tab)
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, [campaign._id]);

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case "discovery": return "bg-blue-100 text-blue-800";
      case "outreach": return "bg-yellow-100 text-yellow-800";
      case "negotiation": return "bg-purple-100 text-purple-800";
      case "contracts": return "bg-orange-100 text-orange-800";
      case "payments": return "bg-green-100 text-green-800";
      case "reporting": return "bg-gray-100 text-gray-800";
      case "conversions": return "bg-emerald-100 text-emerald-800";
      case "awareness": return "bg-cyan-100 text-cyan-800";
      case "engagement": return "bg-pink-100 text-pink-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const lastModified = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastModified.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffDays > 0) {
      return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
    } else if (diffHours > 0) {
      return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
    } else if (diffMinutes > 0) {
      return diffMinutes === 1 ? "1 minute ago" : `${diffMinutes} minutes ago`;
    } else {
      return "Just now";
    }
  };

  // Format budget in INR
  const formatBudgetInINR = (budget: number): string => {
    return `₹${budget.toLocaleString('en-IN')}`;
  };

  const objective = campaign.objective;

  // Get campaign redirect URL based on progress - follows the new routing structure
  const getCampaignRedirectUrl = (campaignId: string): string => {
    const savedProgress = localStorage.getItem('campaign_progress');
    if (!savedProgress) {
      return `/campaigns/${campaignId}/discovery`;
    }
    
    try {
      const allProgress = JSON.parse(savedProgress);
      const campaignProgress = allProgress.find((p: any) => p.campaignId === campaignId);
      
      if (!campaignProgress || !campaignProgress.completedStages || campaignProgress.completedStages.length === 0) {
        return `/campaigns/${campaignId}/discovery`;
      }
      
      const allStages = ['discovery', 'outreach', 'negotiation', 'contracts', 'payments', 'reporting'];
      let lastCompletedIndex = -1;
      
      campaignProgress.completedStages.forEach((stage: string) => {
        const index = allStages.indexOf(stage);
        if (index > lastCompletedIndex) {
          lastCompletedIndex = index;
        }
      });
      
      const nextStageIndex = lastCompletedIndex + 1;
      if (nextStageIndex >= allStages.length) {
        return `/campaigns/${campaignId}/reporting`;
      }
      
      const nextStage = allStages[nextStageIndex];
      return `/campaigns/${campaignId}/${nextStage}`;
    } catch (error) {
      console.error('Error parsing campaign progress:', error);
      return `/campaigns/${campaignId}/discovery`;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-2">
          <h3 className="font-medium text-gray-900">{campaign.campaignName}</h3>
          <Badge className={getStageColor(objective)}>
            {objective}
          </Badge>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>{progress}% Complete</span>
          <span>•</span>
          <span>Created {formatTimeAgo(campaign.lastModifiedAt)}</span>
          <span>•</span>
          <span>Budget: {formatBudgetInINR(campaign.totalBudget)}</span>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-24 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <Link to={getCampaignRedirectUrl(campaign._id)}>
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
