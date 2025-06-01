
import { useCampaigns } from './useCampaigns';
import { getCampaignProgressForDashboard } from './useCampaignProgress';

export interface DashboardMetric {
  id: string;
  title: string;
  value: string;
  description: string;
  relatedMetrics: RelatedMetric[];
}

export interface RelatedMetric {
  label: string;
  value: string;
  description: string;
}

export interface DashboardMetrics {
  totalCampaigns: number;
  activeInfluencers: number;
  totalSpend: number;
  avgEngagement: number;
}

export const useDashboardMetrics = () => {
  const { data: campaigns, isLoading } = useCampaigns();

  const calculateMetrics = (): DashboardMetric[] => {
    if (!campaigns || campaigns.length === 0) {
      return [
        { id: 'campaigns', title: 'Active Campaigns', value: '0', description: 'Total active campaigns', relatedMetrics: [] },
        { id: 'budget', title: 'Total Budget', value: '₹0', description: 'Combined budget across all campaigns', relatedMetrics: [] },
        { id: 'revenue', title: 'Total Revenue', value: '₹0', description: 'Revenue generated from campaigns', relatedMetrics: [] },
        { id: 'reach', title: 'Total Reach', value: '0M', description: 'Combined reach across all campaigns', relatedMetrics: [] }
      ];
    }

    // Calculate active campaigns
    const activeCampaigns = campaigns.length;

    // Calculate total budget
    const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.totalBudget, 0);
    const formattedBudget = `₹${totalBudget.toLocaleString('en-IN')}`;

    // Calculate revenue (simulated - in real app this would come from campaign results)
    // Assuming 15-25% ROI on average for demonstration
    const totalSpent = Math.round(totalBudget * 0.8); // 80% of budget typically spent
    const totalRevenue = Math.round(totalBudget * 1.2); // 20% ROI on average
    const profitLoss = totalRevenue - totalSpent;
    const formattedRevenue = `₹${totalRevenue.toLocaleString('en-IN')}`;

    // Calculate reach (simulated based on budget and platforms)
    const totalReach = campaigns.reduce((sum, campaign) => {
      // Simulate reach based on budget and platforms
      const budgetMultiplier = campaign.totalBudget / 10000; // Base multiplier
      const platformMultiplier = campaign.preferredPlatforms.length * 0.5; // More platforms = more reach
      return sum + Math.round(budgetMultiplier * platformMultiplier * 1000);
    }, 0);
    
    const formattedReach = totalReach >= 1000000 
      ? `${(totalReach / 1000000).toFixed(1)}M`
      : totalReach >= 1000 
        ? `${(totalReach / 1000).toFixed(0)}K`
        : totalReach.toString();

    // Calculate objective distribution
    const objectiveCount: Record<string, number> = {};
    campaigns.forEach(campaign => {
      objectiveCount[campaign.objective] = (objectiveCount[campaign.objective] || 0) + 1;
    });

    // Calculate budget distribution
    const budgetRanges = {
      'Under ₹50K': campaigns.filter(c => c.totalBudget < 50000).length,
      '₹50K-₹100K': campaigns.filter(c => c.totalBudget >= 50000 && c.totalBudget < 100000).length,
      'Above ₹100K': campaigns.filter(c => c.totalBudget >= 100000).length
    };

    // Calculate reach by platform
    const reachByPlatform: Record<string, number> = {};
    campaigns.forEach(campaign => {
      campaign.preferredPlatforms.forEach(platform => {
        const campaignReach = Math.round((campaign.totalBudget / 10000) * 500); // Simplified calculation
        reachByPlatform[platform] = (reachByPlatform[platform] || 0) + campaignReach;
      });
    });

    return [
      {
        id: 'campaigns',
        title: 'Active Campaigns',
        value: activeCampaigns.toString(),
        description: 'Total active campaigns',
        relatedMetrics: [
          { label: 'Completed Campaigns', value: '0', description: 'Campaigns at 100% progress' },
          { label: 'In Discovery', value: campaigns.filter(c => getCampaignProgressForDashboard(c._id).percentage < 20).length.toString(), description: 'Campaigns in early stages' },
          { label: 'In Progress', value: campaigns.filter(c => { const p = getCampaignProgressForDashboard(c._id).percentage; return p >= 20 && p < 100; }).length.toString(), description: 'Campaigns actively running' }
        ]
      },
      {
        id: 'budget',
        title: 'Total Budget',
        value: formattedBudget,
        description: 'Combined budget across all campaigns',
        relatedMetrics: [
          { label: 'Average Budget', value: `₹${Math.round(totalBudget / campaigns.length).toLocaleString('en-IN')}`, description: 'Average budget per campaign' },
          { label: 'Under ₹50K', value: budgetRanges['Under ₹50K'].toString(), description: 'Campaigns with smaller budgets' },
          { label: '₹50K-₹100K', value: budgetRanges['₹50K-₹100K'].toString(), description: 'Medium budget campaigns' },
          { label: 'Above ₹100K', value: budgetRanges['Above ₹100K'].toString(), description: 'High budget campaigns' }
        ]
      },
      {
        id: 'revenue',
        title: 'Total Revenue',
        value: formattedRevenue,
        description: 'Revenue generated from campaigns',
        relatedMetrics: [
          { label: 'Total Spent', value: `₹${totalSpent.toLocaleString('en-IN')}`, description: 'Total amount spent on campaigns' },
          { label: 'Profit/Loss', value: `₹${profitLoss.toLocaleString('en-IN')}`, description: profitLoss >= 0 ? 'Net profit generated' : 'Net loss incurred' },
          { label: 'ROI', value: `${Math.round((profitLoss / totalSpent) * 100)}%`, description: 'Return on investment percentage' }
        ]
      },
      {
        id: 'reach',
        title: 'Total Reach',
        value: formattedReach,
        description: 'Combined reach across all campaigns',
        relatedMetrics: [
          { label: 'Instagram Reach', value: reachByPlatform['Instagram'] ? `${Math.round(reachByPlatform['Instagram'] / 1000)}K` : '0', description: 'Reach through Instagram campaigns' },
          { label: 'YouTube Reach', value: reachByPlatform['YouTube'] ? `${Math.round(reachByPlatform['YouTube'] / 1000)}K` : '0', description: 'Reach through YouTube campaigns' },
          { label: 'Avg Reach/Campaign', value: `${Math.round(totalReach / campaigns.length / 1000)}K`, description: 'Average reach per campaign' }
        ]
      }
    ];
  };

  const calculateSimpleMetrics = (): DashboardMetrics => {
    if (!campaigns || campaigns.length === 0) {
      return {
        totalCampaigns: 0,
        activeInfluencers: 0,
        totalSpend: 0,
        avgEngagement: 0
      };
    }

    const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.totalBudget, 0);
    const totalSpent = Math.round(totalBudget * 0.8); // 80% of budget typically spent

    return {
      totalCampaigns: campaigns.length,
      activeInfluencers: campaigns.length * 3, // Simulated: avg 3 influencers per campaign
      totalSpend: totalSpent,
      avgEngagement: 3.2 // Simulated engagement rate
    };
  };

  return {
    metrics: calculateSimpleMetrics(),
    detailedMetrics: calculateMetrics(),
    isLoading
  };
};
