
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/layout/Navigation";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import CampaignsList from "@/components/dashboard/CampaignsList";
import CampaignAgentModal from "@/components/modals/CampaignAgentModal";
import MetricsModal from "@/components/dashboard/MetricsModal";
import { useDashboardMetrics, DashboardMetric } from "@/hooks/useDashboardMetrics";
import DashboardHero from "@/components/dashboard/DashboardHero";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import DashboardSearch from "@/components/dashboard/DashboardSearch";

interface DashboardProps {
  openCampaignAgentModal?: boolean;
}

const Dashboard = ({ openCampaignAgentModal = false }: DashboardProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMetric, setSelectedMetric] = useState<DashboardMetric | null>(null);
  const [isMetricsModalOpen, setIsMetricsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { metrics, isLoading } = useDashboardMetrics();

  const handleCloseModal = () => {
    navigate("/dashboard");
  };

  const handleNewCampaign = () => {
    navigate("/dashboard/campaign-agent");
  };

  const handleMetricClick = (metric: DashboardMetric) => {
    setSelectedMetric(metric);
    setIsMetricsModalOpen(true);
  };

  const handleCloseMetricsModal = () => {
    setIsMetricsModalOpen(false);
    setSelectedMetric(null);
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <Navigation />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Hero Section */}
        <DashboardHero onNewCampaign={handleNewCampaign} />
        
        {/* Search Section */}
        <DashboardSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        {/* Metrics Grid */}
        <DashboardMetrics
          metrics={metrics}
          isLoading={isLoading}
          onMetricClick={handleMetricClick}
        />
        
        {/* Campaigns Section */}
        <div className="space-y-6">
          <CampaignsList searchQuery={searchQuery} />
        </div>
      </main>

      {/* Modals */}
      {openCampaignAgentModal && (
        <CampaignAgentModal 
          isOpen={true} 
          onClose={handleCloseModal}
        />
      )}

      <MetricsModal
        isOpen={isMetricsModalOpen}
        onClose={handleCloseMetricsModal}
        metric={selectedMetric}
      />
    </div>
  );
};

export default Dashboard;
