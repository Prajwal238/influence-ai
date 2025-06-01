
import { Card, CardContent } from "@/components/ui/card";
import { DashboardMetric } from "@/hooks/useDashboardMetrics";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricsModalRelatedProps {
  metric: DashboardMetric;
}

const MetricsModalRelated = ({ metric }: MetricsModalRelatedProps) => {
  const isRevenueMetric = metric.id === 'revenue';

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {isRevenueMetric ? 'Financial Breakdown' : 'Related Metrics'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metric.relatedMetrics.map((relatedMetric, index) => {
          const isProfitLoss = relatedMetric.label === 'Profit/Loss';
          const isPositive = isProfitLoss && !relatedMetric.value.includes('-');
          
          return (
            <Card key={index} className="bg-white shadow-sm border-gray-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className={`text-xl font-semibold mb-1 flex items-center justify-center gap-1 ${
                    isProfitLoss 
                      ? isPositive 
                        ? 'text-green-600' 
                        : 'text-red-600'
                      : 'text-gray-900'
                  }`}>
                    {isProfitLoss && (
                      isPositive 
                        ? <TrendingUp className="h-4 w-4" />
                        : <TrendingDown className="h-4 w-4" />
                    )}
                    {relatedMetric.value}
                  </div>
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    {relatedMetric.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {relatedMetric.description}
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

export default MetricsModalRelated;
