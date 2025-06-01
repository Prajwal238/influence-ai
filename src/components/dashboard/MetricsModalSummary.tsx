
import { Card, CardContent } from "@/components/ui/card";
import { DashboardMetric } from "@/hooks/useDashboardMetrics";

interface MetricsModalSummaryProps {
  metric: DashboardMetric;
}

const MetricsModalSummary = ({ metric }: MetricsModalSummaryProps) => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {metric.value}
          </div>
          <div className="text-sm text-gray-600">
            {metric.description}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsModalSummary;
