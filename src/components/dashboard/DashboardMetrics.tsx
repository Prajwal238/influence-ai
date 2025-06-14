
import { Card, CardContent } from "@/components/ui/card";
import { Activity, DollarSign, Eye, Target } from "lucide-react";
import { DashboardMetric } from "@/hooks/useDashboardMetrics";

interface DashboardMetricsProps {
  metrics: DashboardMetric[];
  isLoading: boolean;
  onMetricClick: (metric: DashboardMetric) => void;
}

const DashboardMetrics = ({ metrics, isLoading, onMetricClick }: DashboardMetricsProps) => {
  const getMetricIcon = (metricId: string) => {
    switch (metricId) {
      case 'campaigns':
        return <Activity className="h-6 w-6 text-purple-600" />;
      case 'budget':
        return <Target className="h-6 w-6 text-blue-600" />;
      case 'revenue':
        return <DollarSign className="h-6 w-6 text-emerald-600" />;
      case 'reach':
        return <Eye className="h-6 w-6 text-orange-600" />;
      default:
        return <Activity className="h-6 w-6 text-gray-600" />;
    }
  };

  const getMetricColors = (metricId: string) => {
    switch (metricId) {
      case 'campaigns':
        return {
          bg: 'bg-gradient-to-br from-purple-50/80 to-purple-100/50',
          border: 'border-purple-200/60',
          hover: 'hover:from-purple-100/80 hover:to-purple-150/50 hover:border-purple-300/60'
        };
      case 'budget':
        return {
          bg: 'bg-gradient-to-br from-blue-50/80 to-blue-100/50',
          border: 'border-blue-200/60',
          hover: 'hover:from-blue-100/80 hover:to-blue-150/50 hover:border-blue-300/60'
        };
      case 'revenue':
        return {
          bg: 'bg-gradient-to-br from-emerald-50/80 to-emerald-100/50',
          border: 'border-emerald-200/60',
          hover: 'hover:from-emerald-100/80 hover:to-emerald-150/50 hover:border-emerald-300/60'
        };
      case 'reach':
        return {
          bg: 'bg-gradient-to-br from-orange-50/80 to-orange-100/50',
          border: 'border-orange-200/60',
          hover: 'hover:from-orange-100/80 hover:to-orange-150/50 hover:border-orange-300/60'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-gray-50/80 to-gray-100/50',
          border: 'border-gray-200/60',
          hover: 'hover:from-gray-100/80 hover:to-gray-150/50 hover:border-gray-300/60'
        };
    }
  };

  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const colors = getMetricColors(metric.id);
          return (
            <Card 
              key={metric.id}
              className={`${colors.bg} ${colors.border} ${colors.hover} cursor-pointer transform hover:scale-[1.02] transition-all duration-300 shadow-sm hover:shadow-md rounded-2xl border backdrop-blur-sm`}
              onClick={() => onMetricClick(metric)}
            >
              <CardContent className="p-6">
                {/* Icon and Value Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40">
                    {getMetricIcon(metric.id)}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {isLoading ? (
                        <div className="bg-gray-300/60 animate-pulse h-8 w-16 rounded-lg"></div>
                      ) : (
                        metric.value
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Title and Description */}
                <div>
                  <div className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    {metric.title}
                  </div>
                  <div className="text-xs text-gray-600 leading-relaxed">
                    {metric.description}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardMetrics;
