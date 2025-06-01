
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportingCharts from "./ReportingCharts";
import AIPerformanceSummary from "./AIPerformanceSummary";

interface PerformanceTabsProps {
  impressionsData: any[];
  engagementData: any[];
}

const PerformanceTabs = ({ impressionsData, engagementData }: PerformanceTabsProps) => {
  const charts = ReportingCharts({ impressionsData, engagementData });

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="impressions">Impressions</TabsTrigger>
        <TabsTrigger value="engagement">Engagement</TabsTrigger>
        <TabsTrigger value="roi">ROI</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <charts.OverviewCharts />
        <AIPerformanceSummary />
      </TabsContent>

      <TabsContent value="impressions" className="space-y-6">
        <charts.ImpressionsChart />
      </TabsContent>

      <TabsContent value="engagement" className="space-y-6">
        <charts.EngagementChart />
      </TabsContent>

      <TabsContent value="roi" className="space-y-6">
        <charts.ROISection />
      </TabsContent>
    </Tabs>
  );
};

export default PerformanceTabs;
