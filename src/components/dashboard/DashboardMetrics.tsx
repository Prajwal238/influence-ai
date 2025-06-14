
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
        return <Activity className="h-5 w-5 text-purple-600" />;
      case 'budget':
        return <Target className="h-5 w-5 text-blue-600" />;
      case 'revenue':
        return <DollarSign className="h-5 w-5 text-emerald-600" />;
      case 'reach':
        return <Eye className="h-5 w-5 text-orange-600" />;
      default:
        return <Activity className="h-5 w-5 text-gray-600" />;
    }
  };

  const getMetricColors = (metricId: string) => {
    switch (metricId) {
      case 'campaigns':
        return {
          bg: 'bg-white/80',
          border: 'border-purple-100/80',
          accent: 'bg-purple-50/80'
        };
      case 'budget':
        return {
          bg: 'bg-white/80',
          border: 'border-blue-100/80',
          accent: 'bg-blue-50/80'
        };
      case 'revenue':
        return {
          bg: 'bg-white/80',
          border: 'border-emerald-100/80',
          accent: 'bg-emerald-50/80'
        };
      case 'reach':
        return {
          bg: 'bg-white/80',
          border: 'border-orange-100/80',
          accent: 'bg-orange-50/80'
        };
      default:
        return {
          bg: 'bg-white/80',
          border: 'border-gray-100/80',
          accent: 'bg-gray-50/80'
        };
    }
  };

  return (
    <div className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const colors = getMetricColors(metric.id);
          return (
            <Card 
              key={metric.id}
              className={`${colors.bg} ${colors.border} cursor-pointer hover:shadow-md transition-all duration-200 shadow-sm rounded-xl border backdrop-blur-sm group`}
              onClick={() => onMetricClick(metric)}
            >
              <CardContent className="p-4">
                {/* Icon and Value */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${colors.accent} border border-white/60`}>
                    {getMetricIcon(metric.id)}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {isLoading ? (
                        <div className="bg-gray-200 animate-pulse h-6 w-12 rounded"></div>
                      ) : (
                        metric.value
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Title and Description */}
                <div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
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
