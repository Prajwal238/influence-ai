
import { DashboardMetric } from "@/hooks/useDashboardMetrics";
import { DollarSign, Activity, Eye, Target } from "lucide-react";
import { getModalTitle } from "./utils/metricsModalUtils";

interface MetricsModalHeaderProps {
  metric: DashboardMetric;
  campaignsCount?: number;
}

const MetricsModalHeader = ({ metric, campaignsCount }: MetricsModalHeaderProps) => {
  const getModalIcon = () => {
    if (metric.id === 'revenue') return <DollarSign className="h-6 w-6 text-green-600" />;
    if (metric.id === 'budget') return <Target className="h-6 w-6 text-blue-600" />;
    if (metric.id === 'campaigns') return <Activity className="h-6 w-6 text-purple-600" />;
    if (metric.id === 'reach') return <Eye className="h-6 w-6 text-orange-600" />;
    return null;
  };

  return (
    <div className="text-xl font-semibold flex items-center gap-3">
      {getModalIcon()}
      <span className="text-gray-900">{getModalTitle(metric, campaignsCount)}</span>
    </div>
  );
};

export default MetricsModalHeader;
