import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Plus, TrendingUp, Users, DollarSign, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CampaignsList from "@/components/dashboard/CampaignsList";
import CampaignAgentModal from "@/components/modals/CampaignAgentModal";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";

interface DashboardProps {
  openCampaignAgentModal?: boolean;
}

const Dashboard = ({ openCampaignAgentModal = false }: DashboardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCampaignAgentOpen, setIsCampaignAgentOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { metrics, isLoading } = useDashboardMetrics();

  // Handle opening campaign agent modal from URL or prop
  useEffect(() => {
    if (openCampaignAgentModal || location.pathname === '/dashboard/campaign-agent') {
      setIsCampaignAgentOpen(true);
    }
  }, [openCampaignAgentModal, location.pathname]);

  const handleNewCampaign = () => {
    console.log("New Campaign button clicked");
    setIsCampaignAgentOpen(true);
    // Update URL to reflect modal state
    if (location.pathname === '/dashboard') {
      navigate('/dashboard/campaign-agent');
    }
  };

  const handleCloseCampaignAgent = () => {
    setIsCampaignAgentOpen(false);
    // Navigate back to dashboard if we were on the campaign-agent route
    if (location.pathname === '/dashboard/campaign-agent') {
      navigate('/dashboard');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-[#1D1D1F] font-sans tracking-tight">
              Dashboard
            </h1>
            <p className="text-[#6E6E73] font-sans mt-1 text-lg">
              Manage your influencer campaigns
            </p>
          </div>
          <Button 
            onClick={handleNewCampaign}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-apple border-0 rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6E6E73]">Total Campaigns</CardTitle>
              <BarChart3 className="h-4 w-4 text-[#6E6E73]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1D1D1F]">{metrics?.totalCampaigns || 0}</div>
              <p className="text-xs text-[#34C759] font-medium">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-apple border-0 rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6E6E73]">Active Influencers</CardTitle>
              <Users className="h-4 w-4 text-[#6E6E73]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1D1D1F]">{metrics?.activeInfluencers || 0}</div>
              <p className="text-xs text-[#34C759] font-medium">
                +12 this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-apple border-0 rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6E6E73]">Total Spend</CardTitle>
              <DollarSign className="h-4 w-4 text-[#6E6E73]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1D1D1F]">${metrics?.totalSpend?.toLocaleString() || 0}</div>
              <p className="text-xs text-[#34C759] font-medium">
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-apple border-0 rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6E6E73]">Avg. Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#6E6E73]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1D1D1F]">{metrics?.avgEngagement || 0}%</div>
              <p className="text-xs text-[#34C759] font-medium">
                +0.5% from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Campaigns Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-[#1D1D1F] font-sans tracking-tight">
              Recent Campaigns
            </h2>
          </div>
          <CampaignsList searchQuery={searchQuery} />
        </div>

        {/* Campaign Agent Modal */}
        <CampaignAgentModal 
          isOpen={isCampaignAgentOpen} 
          onClose={handleCloseCampaignAgent} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
