
import { DashboardMetric } from "@/hooks/useDashboardMetrics";
import { Campaign } from "@/types/campaign";

export const getMetricIcon = (metricId: string) => {
  switch (metricId) {
    case 'revenue':
      return 'DollarSign';
    case 'budget':
      return 'Target';
    case 'campaigns':
      return 'Activity';
    case 'reach':
      return 'Eye';
    default:
      return 'Activity';
  }
};

export const getModalTitle = (metric: DashboardMetric, campaignsCount?: number) => {
  if (metric.id === 'revenue') return 'Revenue Performance';
  if (metric.id === 'budget') return 'Budget Allocation';
  if (metric.id === 'campaigns') return `Active Campaigns (${campaignsCount || 0})`;
  if (metric.id === 'reach') return 'Reach & Engagement';
  return metric.title;
};

export const generateChartData = (metric: DashboardMetric, campaigns?: Campaign[]) => {
  const isRevenueMetric = metric.id === 'revenue';
  const isBudgetMetric = metric.id === 'budget';
  const isCampaignsMetric = metric.id === 'campaigns';
  const isReachMetric = metric.id === 'reach';

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
