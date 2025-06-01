
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardMetric } from "@/hooks/useDashboardMetrics";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface MetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  metric: DashboardMetric | null;
}

const MetricsModal = ({ isOpen, onClose, metric }: MetricsModalProps) => {
  if (!metric) return null;

  const isRevenueMetric = metric.id === 'revenue';
  const profitLossMetric = metric.relatedMetrics.find(m => m.label === 'Profit/Loss');
  const isProfitable = profitLossMetric ? !profitLossMetric.value.includes('-') : true;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            {isRevenueMetric && <DollarSign className="h-5 w-5 text-green-600" />}
            {metric.title} Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Main Metric */}
          <Card className={isRevenueMetric ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"}>
            <CardContent className="p-6">
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${isRevenueMetric ? 'text-green-900' : 'text-blue-900'}`}>
                  {metric.value}
                </div>
                <div className={`text-sm ${isRevenueMetric ? 'text-green-700' : 'text-blue-700'}`}>
                  {metric.description}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Metrics */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {isRevenueMetric ? 'Financial Breakdown' : 'Related Metrics'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {metric.relatedMetrics.map((relatedMetric, index) => {
                const isProfitLoss = relatedMetric.label === 'Profit/Loss';
                const isPositive = isProfitLoss && !relatedMetric.value.includes('-');
                const isROI = relatedMetric.label === 'ROI';
                
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

          {/* Additional Revenue Insights */}
          {isRevenueMetric && (
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    isProfitable 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {isProfitable ? (
                      <>
                        <TrendingUp className="h-4 w-4" />
                        Campaigns are profitable
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-4 w-4" />
                        Campaigns need optimization
                      </>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    {isProfitable 
                      ? 'Your campaigns are generating positive returns. Consider scaling successful strategies.'
                      : 'Review campaign performance and optimize targeting to improve ROI.'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MetricsModal;
