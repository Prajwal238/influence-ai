
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardMetric } from "@/hooks/useDashboardMetrics";

interface MetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  metric: DashboardMetric | null;
}

const MetricsModal = ({ isOpen, onClose, metric }: MetricsModalProps) => {
  if (!metric) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {metric.title} Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Main Metric */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900 mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-blue-700">
                  {metric.description}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Metrics */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Related Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {metric.relatedMetrics.map((relatedMetric, index) => (
                <Card key={index} className="bg-white shadow-sm border-gray-200">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-xl font-semibold text-gray-900 mb-1">
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
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MetricsModal;
