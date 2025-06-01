
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/layout/Navigation";
import { Plus, Search, Filter, Activity, DollarSign, Eye, Target } from "lucide-react";
import { Input } from "@/components/ui/input";
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

  const getMetricIcon = (metricId: string) => {
    switch (metricId) {
      case 'campaigns':
        return <Activity className="h-6 w-6 text-purple-600" />;
      case 'budget':
        return <Target className="h-6 w-6 text-blue-600" />;
      case 'revenue':
        return <DollarSign className="h-6 w-6 text-green-600" />;
      case 'reach':
        return <Eye className="h-6 w-6 text-orange-600" />;
      default:
        return <Activity className="h-6 w-6 text-gray-600" />;
    }
  };

  const getMetricBgColor = (metricId: string) => {
    switch (metricId) {
      case 'campaigns':
        return 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:from-purple-100 hover:to-purple-150';
      case 'budget':
        return 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-150';
      case 'revenue':
        return 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:from-green-100 hover:to-green-150';
      case 'reach':
        return 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:from-orange-100 hover:to-orange-150';
      default:
        return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 hover:from-gray-100 hover:to-gray-150';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                Welcome Back to Inflowencer.ai
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Manage your influencer campaigns with AI-powered automation
              </p>
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3"
              onClick={handleNewCampaign}
            >
              <Plus className="h-5 w-5 mr-2" />
              New Campaign
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex space-x-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Search campaigns..." 
                className="pl-12 bg-white border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="border-gray-200 rounded-2xl px-6 hover:bg-gray-50 transition-colors duration-200 h-12">
              <Filter className="h-5 w-5 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => (
            <Card 
              key={metric.id}
              className={`${getMetricBgColor(metric.id)} cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl rounded-2xl border-2`}
              onClick={() => handleMetricClick(metric)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  {getMetricIcon(metric.id)}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {isLoading ? (
                        <div className="bg-gray-300 animate-pulse h-8 w-16 rounded"></div>
                      ) : (
                        metric.value
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-1">
                    {metric.title}
                  </div>
                  <div className="text-xs text-gray-600 leading-relaxed">
                    {metric.description}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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
