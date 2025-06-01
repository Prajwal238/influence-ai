import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardMetric } from "@/hooks/useDashboardMetrics";
import { TrendingUp, TrendingDown, DollarSign, Activity, Eye, Target, X } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { useCampaigns } from "@/hooks/useCampaigns";

interface MetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  metric: DashboardMetric | null;
}

const MetricsModal = ({ isOpen, onClose, metric }: MetricsModalProps) => {
  const { data: campaigns } = useCampaigns();

  if (!metric) return null;

  const isRevenueMetric = metric.id === 'revenue';
  const isBudgetMetric = metric.id === 'budget';
  const isCampaignsMetric = metric.id === 'campaigns';
  const isReachMetric = metric.id === 'reach';

  // Mock data for charts - in a real app, this would come from your API
  const getChartData = () => {
    if (isRevenueMetric) {
      return {
        revenueOverTime: [
          { date: 'Jan 1', revenue: 15000 },
          { date: 'Jan 8', revenue: 18000 },
          { date: 'Jan 15', revenue: 22000 },
          { date: 'Jan 22', revenue: 25000 },
          { date: 'Jan 29', revenue: 28000 },
          { date: 'Feb 5', revenue: 32000 },
          { date: 'Feb 12', revenue: 35000 },
        ],
        topCampaigns: campaigns?.slice(0, 5).map(campaign => ({
          name: campaign.campaignName,
          revenue: Math.round(campaign.totalBudget * 1.2),
          roi: Math.round(((campaign.totalBudget * 1.2) - (campaign.totalBudget * 0.8)) / (campaign.totalBudget * 0.8) * 100)
        })) || []
      };
    }
    
    if (isBudgetMetric) {
      return {
        budgetByObjective: [
          { name: 'Awareness', value: 45000, color: '#0071E3' },
          { name: 'Engagement', value: 35000, color: '#34C759' },
          { name: 'Conversions', value: 25000, color: '#FF9500' }
        ],
        topCampaignsByBudget: campaigns?.slice(0, 5).map(campaign => ({
          name: campaign.campaignName,
          budget: campaign.totalBudget,
          spent: Math.round(campaign.totalBudget * 0.8)
        })) || []
      };
    }
    
    if (isCampaignsMetric) {
      return {
        campaignsByObjective: [
          { objective: 'Awareness', count: 8 },
          { objective: 'Engagement', count: 6 },
          { objective: 'Conversions', count: 4 }
        ],
        campaignsOverTime: [
          { date: 'Week 1', count: 12 },
          { date: 'Week 2', count: 15 },
          { date: 'Week 3', count: 18 },
          { date: 'Week 4', count: 18 }
        ]
      };
    }
    
    if (isReachMetric) {
      return {
        reachOverTime: [
          { date: 'Jan 1', impressions: 150000, engagement: 4.2 },
          { date: 'Jan 8', impressions: 180000, engagement: 4.5 },
          { date: 'Jan 15', impressions: 220000, engagement: 4.8 },
          { date: 'Jan 22', impressions: 250000, engagement: 5.1 },
          { date: 'Jan 29', impressions: 280000, engagement: 5.3 },
          { date: 'Feb 5', impressions: 320000, engagement: 5.6 },
          { date: 'Feb 12', impressions: 350000, engagement: 5.8 },
        ],
        topCreators: [
          { name: '@fashion_guru', reach: 125000, engagement: 6.2 },
          { name: '@style_maven', reach: 98000, engagement: 5.8 },
          { name: '@trend_setter', reach: 87000, engagement: 5.4 },
          { name: '@chic_insider', reach: 76000, engagement: 5.1 },
          { name: '@glam_daily', reach: 65000, engagement: 4.9 }
        ]
      };
    }
    
    return {};
  };

  const chartData = getChartData();

  const getModalIcon = () => {
    if (isRevenueMetric) return <DollarSign className="h-6 w-6 text-green-600" />;
    if (isBudgetMetric) return <Target className="h-6 w-6 text-blue-600" />;
    if (isCampaignsMetric) return <Activity className="h-6 w-6 text-purple-600" />;
    if (isReachMetric) return <Eye className="h-6 w-6 text-orange-600" />;
    return null;
  };

  const getModalTitle = () => {
    if (isRevenueMetric) return 'Revenue Performance';
    if (isBudgetMetric) return 'Budget Allocation';
    if (isCampaignsMetric) return `Active Campaigns (${campaigns?.length || 0})`;
    if (isReachMetric) return 'Reach & Engagement';
    return metric.title;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold flex items-center gap-3">
            {getModalIcon()}
            <span className="text-gray-900">{getModalTitle()}</span>
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-full hover:bg-gray-100"
            onClick={onClose}
          >
            <X className="h-5 w-5 text-gray-500" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Main Metric Summary */}
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

          {/* Charts and Detailed Insights */}
          {isRevenueMetric && (
            <>
              {/* Revenue Over Time Chart */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trend (Last 7 Weeks)</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData.revenueOverTime}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip 
                          formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                          labelStyle={{ color: '#374151' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#0071E3" 
                          strokeWidth={3}
                          dot={{ fill: '#0071E3', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Top Campaigns by Revenue */}
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
            </>
          )}

          {isBudgetMetric && (
            <>
              {/* Budget by Objective Pie Chart */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Budget Distribution by Objective</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData.budgetByObjective}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {chartData.budgetByObjective?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Budget']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Top Campaigns by Budget */}
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
            </>
          )}

          {isCampaignsMetric && (
            <>
              {/* Campaigns by Objective Bar Chart */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Campaigns by Objective</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData.campaignsByObjective}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="objective" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#0071E3" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Active Campaigns List */}
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
            </>
          )}

          {isReachMetric && (
            <>
              {/* Reach Over Time Chart */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Reach & Engagement Trend</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData.reachOverTime}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                        <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="impressions" 
                          stroke="#0071E3" 
                          strokeWidth={3}
                          name="Impressions"
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="engagement" 
                          stroke="#34C759" 
                          strokeWidth={3}
                          name="Engagement Rate (%)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Top Creators by Reach */}
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
            </>
          )}

          {/* Related Metrics - Keep existing functionality */}
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MetricsModal;
