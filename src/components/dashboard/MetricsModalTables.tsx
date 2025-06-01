
import { Card, CardContent } from "@/components/ui/card";
import { DashboardMetric } from "@/hooks/useDashboardMetrics";
import { TrendingUp, TrendingDown } from "lucide-react";
import { generateChartData } from "./utils/metricsModalUtils";
import { Campaign } from "@/types/campaign";

interface MetricsModalTablesProps {
  metric: DashboardMetric;
  campaigns?: Campaign[];
}

const MetricsModalTables = ({ metric, campaigns }: MetricsModalTablesProps) => {
  const chartData = generateChartData(metric, campaigns);
  const isRevenueMetric = metric.id === 'revenue';
  const isBudgetMetric = metric.id === 'budget';
  const isCampaignsMetric = metric.id === 'campaigns';
  const isReachMetric = metric.id === 'reach';

  if (isRevenueMetric) {
    return (
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top 5 Campaigns by Revenue</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-xs font-medium text-gray-600 uppercase px-4 py-3 border-b">Campaign</th>
                  <th className="text-xs font-medium text-gray-600 uppercase px-4 py-3 border-b">Revenue</th>
                  <th className="text-xs font-medium text-gray-600 uppercase px-4 py-3 border-b">ROI</th>
                </tr>
              </thead>
              <tbody>
                {chartData.topCampaigns?.map((campaign, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border-b text-sm font-medium text-gray-900">{campaign.name}</td>
                    <td className="px-4 py-3 border-b text-sm text-gray-700">₹{campaign.revenue?.toLocaleString()}</td>
                    <td className="px-4 py-3 border-b text-sm">
                      <span className={`inline-flex items-center gap-1 ${campaign.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {campaign.roi >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {campaign.roi}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isBudgetMetric) {
    return (
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Budget Utilization by Campaign</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-xs font-medium text-gray-600 uppercase px-4 py-3 border-b">Campaign</th>
                  <th className="text-xs font-medium text-gray-600 uppercase px-4 py-3 border-b">Total Budget</th>
                  <th className="text-xs font-medium text-gray-600 uppercase px-4 py-3 border-b">Spent</th>
                  <th className="text-xs font-medium text-gray-600 uppercase px-4 py-3 border-b">Remaining</th>
                </tr>
              </thead>
              <tbody>
                {chartData.topCampaignsByBudget?.map((campaign, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border-b text-sm font-medium text-gray-900">{campaign.name}</td>
                    <td className="px-4 py-3 border-b text-sm text-gray-700">₹{campaign.budget?.toLocaleString()}</td>
                    <td className="px-4 py-3 border-b text-sm text-gray-700">₹{campaign.spent?.toLocaleString()}</td>
                    <td className="px-4 py-3 border-b text-sm text-green-600">₹{(campaign.budget - campaign.spent)?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isCampaignsMetric) {
    return (
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Active Campaigns</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-xs font-medium text-gray-600 uppercase px-4 py-3 border-b">Name</th>
                  <th className="text-xs font-medium text-gray-600 uppercase px-4 py-3 border-b">Objective</th>
                  <th className="text-xs font-medium text-gray-600 uppercase px-4 py-3 border-b">Budget</th>
                  <th className="text-xs font-medium text-gray-600 uppercase px-4 py-3 border-b">Created</th>
                </tr>
              </thead>
              <tbody>
                {campaigns?.slice(0, 5).map((campaign, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border-b text-sm font-medium text-gray-900">{campaign.campaignName}</td>
                    <td className="px-4 py-3 border-b text-sm text-gray-700">
                      <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {campaign.objective}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b text-sm text-gray-700">₹{campaign.totalBudget.toLocaleString()}</td>
                    <td className="px-4 py-3 border-b text-sm text-gray-500">
                      {new Date(campaign.lastModifiedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isReachMetric) {
    return (
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top 5 Creators by Reach</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-xs font-medium text-gray-600 uppercase px-4 py-3 border-b">Creator</th>
                  <th className="text-xs font-medium text-gray-600 uppercase px-4 py-3 border-b">Total Reach</th>
                  <th className="text-xs font-medium text-gray-600 uppercase px-4 py-3 border-b">Engagement Rate</th>
                </tr>
              </thead>
              <tbody>
                {chartData.topCreators?.map((creator, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border-b text-sm font-medium text-gray-900">{creator.name}</td>
                    <td className="px-4 py-3 border-b text-sm text-gray-700">{creator.reach?.toLocaleString()}</td>
                    <td className="px-4 py-3 border-b text-sm text-green-600">{creator.engagement}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default MetricsModalTables;
