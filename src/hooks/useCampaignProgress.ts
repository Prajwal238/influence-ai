
import { useState, useEffect } from 'react';

export type CampaignStage = 'discovery' | 'outreach' | 'negotiation' | 'contracts' | 'payments' | 'reporting';

interface CampaignProgress {
  campaignId: string;
  completedStages: CampaignStage[];
  currentStage: CampaignStage;
  lastUpdated: string;
}

const STORAGE_KEY = 'campaign_progress';

export const useCampaignProgress = (campaignId: string) => {
  const [progress, setProgress] = useState<CampaignProgress | null>(null);

  // Get all campaign stages in order
  const allStages: CampaignStage[] = ['discovery', 'outreach', 'negotiation', 'contracts', 'payments', 'reporting'];

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      const allProgress: CampaignProgress[] = JSON.parse(savedProgress);
      const campaignProgress = allProgress.find(p => p.campaignId === campaignId);
      if (campaignProgress) {
        setProgress(campaignProgress);
      } else {
        // Initialize new campaign progress
        const newProgress: CampaignProgress = {
          campaignId,
          completedStages: [],
          currentStage: 'discovery',
          lastUpdated: new Date().toISOString()
        };
        setProgress(newProgress);
      }
    } else {
      // Initialize new campaign progress
      const newProgress: CampaignProgress = {
        campaignId,
        completedStages: [],
        currentStage: 'discovery',
        lastUpdated: new Date().toISOString()
      };
      setProgress(newProgress);
    }
  }, [campaignId]);

  // Save progress to localStorage
  const saveProgress = (updatedProgress: CampaignProgress) => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    let allProgress: CampaignProgress[] = savedProgress ? JSON.parse(savedProgress) : [];
    
    // Update or add the campaign progress
    const existingIndex = allProgress.findIndex(p => p.campaignId === campaignId);
    if (existingIndex >= 0) {
      allProgress[existingIndex] = updatedProgress;
    } else {
      allProgress.push(updatedProgress);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
    setProgress(updatedProgress);
  };

  // Mark a stage as completed
  const completeStage = (stage: CampaignStage) => {
    if (!progress) return;

    const stageIndex = allStages.indexOf(stage);
    const completedStages = [...progress.completedStages];
    
    // Add all stages up to and including the current stage
    for (let i = 0; i <= stageIndex; i++) {
      if (!completedStages.includes(allStages[i])) {
        completedStages.push(allStages[i]);
      }
    }

    const nextStageIndex = stageIndex + 1;
    const nextStage = nextStageIndex < allStages.length ? allStages[nextStageIndex] : stage;

    const updatedProgress: CampaignProgress = {
      ...progress,
      completedStages,
      currentStage: nextStage,
      lastUpdated: new Date().toISOString()
    };

    saveProgress(updatedProgress);
  };

  // Calculate progress percentage
  const getProgressPercentage = (): number => {
    if (!progress) return 0;
    return Math.round((progress.completedStages.length / allStages.length) * 100);
  };

  // Get the last completed stage index
  const getLastCompletedStageIndex = (): number => {
    if (!progress || progress.completedStages.length === 0) return -1;
    
    let lastIndex = -1;
    progress.completedStages.forEach(stage => {
      const index = allStages.indexOf(stage);
      if (index > lastIndex) {
        lastIndex = index;
      }
    });
    
    return lastIndex;
  };

  // Get redirect URL for campaign based on progress
  const getCampaignRedirectUrl = (campaignId: string): string => {
    if (!progress) return `/campaigns/${campaignId}/discovery`;
    
    const lastCompletedIndex = getLastCompletedStageIndex();
    const nextStageIndex = lastCompletedIndex + 1;
    
    if (nextStageIndex >= allStages.length) {
      // All stages completed, go to reporting
      return `/campaigns/${campaignId}/reporting`;
    }
    
    const nextStage = allStages[nextStageIndex];
    return `/campaigns/${campaignId}/${nextStage}`;
  };

  return {
    progress,
    completeStage,
    getProgressPercentage,
    getCampaignRedirectUrl,
    allStages,
    getLastCompletedStageIndex
  };
};

// Utility function to get campaign progress for dashboard
export const getCampaignProgressForDashboard = (campaignId: string): { percentage: number; completedStages: number } => {
  const savedProgress = localStorage.getItem(STORAGE_KEY);
  if (!savedProgress) return { percentage: 0, completedStages: 0 };
  
  const allProgress: CampaignProgress[] = JSON.parse(savedProgress);
  const campaignProgress = allProgress.find(p => p.campaignId === campaignId);
  
  if (!campaignProgress) return { percentage: 0, completedStages: 0 };
  
  const allStages = ['discovery', 'outreach', 'negotiation', 'contracts', 'payments', 'reporting'];
  const percentage = Math.round((campaignProgress.completedStages.length / allStages.length) * 100);
  
  return { percentage, completedStages: campaignProgress.completedStages.length };
};
