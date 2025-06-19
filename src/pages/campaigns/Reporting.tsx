
import CampaignLayout from "@/components/layout/CampaignLayout";
import { useCampaignProgress } from "@/hooks/useCampaignProgress";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ReportingHeader from "@/components/reporting/ReportingHeader";
import KPICards from "@/components/reporting/KPICards";
import PerformanceTabs from "@/components/reporting/PerformanceTabs";

const Reporting = () => {
  const { id } = useParams();
  const campaignId = id || '';
  const navigate = useNavigate();
  const { progress, markCampaignComplete } = useCampaignProgress(campaignId);
  const { toast } = useToast();

  const impressionsData = [
    { date: "Jul 1", impressions: 45000, reach: 38000 },
    { date: "Jul 8", impressions: 52000, reach: 45000 },
    { date: "Jul 15", impressions: 67000, reach: 58000 },
    { date: "Jul 22", impressions: 78000, reach: 67000 },
    { date: "Jul 29", impressions: 85000, reach: 72000 },
    { date: "Aug 5", impressions: 92000, reach: 79000 },
  ];

  const engagementData = [
    { platform: "Instagram", likes: 45000, comments: 2300, shares: 1200 },
    { platform: "TikTok", likes: 78000, comments: 4500, shares: 2100 },
    { platform: "YouTube", likes: 23000, comments: 1800, shares: 890 },
  ];

  const handleMarkComplete = () => {
    markCampaignComplete();
    toast({
      title: "Campaign Completed!",
      description: "Your campaign has been marked as 100% complete.",
    });
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  const isCampaignComplete = progress?.isFullyCompleted || false;

  return (
    <CampaignLayout>
      <div className="space-y-4">
        <ReportingHeader 
          isCampaignComplete={isCampaignComplete}
          onMarkComplete={handleMarkComplete}
        />
        
        <KPICards />
        
        <PerformanceTabs 
          impressionsData={impressionsData}
          engagementData={engagementData}
        />
      </div>
    </CampaignLayout>
  );
};

export default Reporting;
