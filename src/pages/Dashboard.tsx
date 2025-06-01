
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/layout/Navigation";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import CampaignsList from "@/components/dashboard/CampaignsList";
import CampaignAgentModal from "@/components/modals/CampaignAgentModal";
import MetricsModal from "@/components/dashboard/MetricsModal";
import { useDashboardMetrics, DashboardMetric } from "@/hooks/useDashboardMetrics";

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

  const handleMetricClick = (metric: DashboardMetric) => {
    setSelectedMetric(metric);
    setIsMetricsModalOpen(true);
  };

  const handleCloseMetricsModal = () => {
    setIsMetricsModalOpen(false);
    setSelectedMetric(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                Welcome Back to Inflowencer.ai
              </h1>
              <p className="text-gray-600">
                Manage your influencer campaigns with AI-powered automation
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-sm">
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search campaigns..." 
                className="pl-10 bg-white border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="border-gray-200">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => (
            <Card 
              key={metric.id}
              className="bg-white shadow-sm border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleMetricClick(metric)}
            >
              <CardContent className="p-6">
                <div className="text-2xl font-semibold text-gray-900 mb-1">
                  {isLoading ? "..." : metric.value}
                </div>
                <div className="text-sm text-gray-600">{metric.title}</div>
                <div className="text-xs text-gray-500 mt-1">{metric.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Campaigns List */}
        <CampaignsList searchQuery={searchQuery} />
      </main>

      {/* Campaign Agent Modal */}
      {openCampaignAgentModal && (
        <CampaignAgentModal 
          isOpen={true} 
          onClose={handleCloseModal}
        />
      )}

      {/* Metrics Modal */}
      <MetricsModal
        isOpen={isMetricsModalOpen}
        onClose={handleCloseMetricsModal}
        metric={selectedMetric}
      />
    </div>
  );
};

export default Dashboard;
