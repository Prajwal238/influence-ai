
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

export const useDashboardMetrics = () => {
  const { data: campaigns, isLoading } = useCampaigns();

  const calculateMetrics = (): DashboardMetric[] => {
    if (!campaigns || campaigns.length === 0) {
      return [
        { id: 'campaigns', title: 'Active Campaigns', value: '0', description: 'Total active campaigns', relatedMetrics: [] },
        { id: 'budget', title: 'Total Budget', value: '₹0', description: 'Combined budget across all campaigns', relatedMetrics: [] },
        { id: 'progress', title: 'Avg Progress', value: '0%', description: 'Average completion percentage', relatedMetrics: [] },
        { id: 'platforms', title: 'Platform Coverage', value: '0', description: 'Unique platforms targeted', relatedMetrics: [] }
      ];
    }

    // Calculate active campaigns
    const activeCampaigns = campaigns.length;

    // Calculate total budget
    const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.totalBudget, 0);
    const formattedBudget = `₹${totalBudget.toLocaleString('en-IN')}`;

    // Calculate average progress
    let totalProgress = 0;
    const campaignProgresses = campaigns.map(campaign => {
      const { percentage } = getCampaignProgressForDashboard(campaign._id);
      totalProgress += percentage;
      return { name: campaign.campaignName, progress: percentage };
    });
    const avgProgress = campaigns.length > 0 ? Math.round(totalProgress / campaigns.length) : 0;

    // Calculate platform coverage
    const allPlatforms = new Set<string>();
    campaigns.forEach(campaign => {
      campaign.preferredPlatforms.forEach(platform => allPlatforms.add(platform));
    });

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
        id: 'progress',
        title: 'Avg Progress',
        value: `${avgProgress}%`,
        description: 'Average completion percentage',
        relatedMetrics: [
          { label: 'Highest Progress', value: `${Math.max(...campaignProgresses.map(c => c.progress))}%`, description: 'Most advanced campaign' },
          { label: 'Lowest Progress', value: `${Math.min(...campaignProgresses.map(c => c.progress))}%`, description: 'Least advanced campaign' },
          { label: 'Campaigns >50%', value: campaignProgresses.filter(c => c.progress > 50).length.toString(), description: 'Campaigns past halfway point' }
        ]
      },
      {
        id: 'platforms',
        title: 'Platform Coverage',
        value: allPlatforms.size.toString(),
        description: 'Unique platforms targeted',
        relatedMetrics: [
          { label: 'Instagram Campaigns', value: campaigns.filter(c => c.preferredPlatforms.includes('Instagram')).length.toString(), description: 'Campaigns targeting Instagram' },
          { label: 'YouTube Campaigns', value: campaigns.filter(c => c.preferredPlatforms.includes('YouTube')).length.toString(), description: 'Campaigns targeting YouTube' },
          { label: 'Multi-Platform', value: campaigns.filter(c => c.preferredPlatforms.length > 1).length.toString(), description: 'Campaigns using multiple platforms' }
        ]
      }
    ];
  };

  return {
    metrics: calculateMetrics(),
    isLoading
  };
};
