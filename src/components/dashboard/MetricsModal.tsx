
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DashboardMetric } from "@/hooks/useDashboardMetrics";
import { useCampaigns } from "@/hooks/useCampaigns";
import MetricsModalHeader from "./MetricsModalHeader";
import MetricsModalSummary from "./MetricsModalSummary";
import MetricsModalCharts from "./MetricsModalCharts";
import MetricsModalTables from "./MetricsModalTables";
import MetricsModalRelated from "./MetricsModalRelated";

interface MetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  metric: DashboardMetric | null;
}

const MetricsModal = ({ isOpen, onClose, metric }: MetricsModalProps) => {
  const { data: campaigns } = useCampaigns();

  if (!metric) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle>
            <MetricsModalHeader metric={metric} campaignsCount={campaigns?.length} />
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Main Metric Summary */}
          <MetricsModalSummary metric={metric} />

          {/* Charts */}
          <MetricsModalCharts metric={metric} campaigns={campaigns} />

          {/* Tables */}
          <MetricsModalTables metric={metric} campaigns={campaigns} />

          {/* Related Metrics */}
          <MetricsModalRelated metric={metric} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MetricsModal;
