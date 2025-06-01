
import { Link, useParams, useLocation } from "react-router-dom";
import { Search, MessageSquare, Handshake, FileText, CreditCard, BarChart3, CheckCircle } from "lucide-react";
import { useCampaignProgress, CampaignStage } from "@/hooks/useCampaignProgress";
import { useEffect } from "react";

type StageKey = 
  | 'discovery' 
  | 'outreach' 
  | 'negotiation' 
  | 'contracts' 
  | 'payments' 
  | 'reporting';

interface PipelineBarProps {
  stages?: { key: StageKey; label: string }[];
  currentStage?: StageKey;
  stageStatus?: Record<StageKey, 'pending' | 'active' | 'complete'>;
}

const PipelineBar = ({ stages, currentStage, stageStatus }: PipelineBarProps) => {
  const { id } = useParams();
  const location = useLocation();
  const campaignId = id || '';

  const { progress, completeStage, getProgressPercentage } = useCampaignProgress(campaignId);

  // Default stages if not provided via props
  const defaultStages = [
    { key: "discovery" as StageKey, name: "Discovery", path: `/campaigns/${id}/discovery`, icon: Search },
    { key: "outreach" as StageKey, name: "Outreach", path: `/campaigns/${id}/outreach`, icon: MessageSquare },
    { key: "negotiation" as StageKey, name: "Negotiation", path: `/campaigns/${id}/negotiation`, icon: Handshake },
    { key: "contracts" as StageKey, name: "Contracts", path: `/campaigns/${id}/contracts`, icon: FileText },
    { key: "payments" as StageKey, name: "Payments", path: `/campaigns/${id}/payments`, icon: CreditCard },
    { key: "reporting" as StageKey, name: "Reporting", path: `/campaigns/${id}/reporting`, icon: BarChart3 },
  ];

  // Determine current stage from URL if not provided via props
  const getCurrentStageFromUrl = (): StageKey => {
    if (location.pathname.includes('/discovery')) return 'discovery';
    if (location.pathname.includes('/outreach')) return 'outreach';
    if (location.pathname.includes('/negotiation')) return 'negotiation';
    if (location.pathname.includes('/contracts')) return 'contracts';
    if (location.pathname.includes('/payments')) return 'payments';
    if (location.pathname.includes('/reporting')) return 'reporting';
    return 'discovery';
  };

  const activeStage = currentStage || getCurrentStageFromUrl();

  // Mark current stage as completed when user visits it
  useEffect(() => {
    if (campaignId && activeStage) {
      const currentStageIndex = defaultStages.findIndex(s => s.key === activeStage);
      if (currentStageIndex > 0) {
        // Complete the previous stage when moving to next stage
        const previousStage = defaultStages[currentStageIndex - 1].key as CampaignStage;
        completeStage(previousStage);
      }
    }
  }, [activeStage, campaignId]);

  // Get stage status based on progress
  const getStageStatus = (stageKey: StageKey): 'pending' | 'active' | 'complete' => {
    if (stageStatus && stageStatus[stageKey]) {
      return stageStatus[stageKey];
    }
    
    if (!progress) return 'pending';
    
    const isActive = location.pathname.includes(`/${stageKey}`);
    if (isActive) return 'active';
    
    const isCompleted = progress.completedStages.includes(stageKey as CampaignStage);
    return isCompleted ? 'complete' : 'pending';
  };

  const getStageStyles = (stageKey: StageKey) => {
    const status = getStageStatus(stageKey);
    
    switch (status) {
      case 'complete':
        return {
          container: "bg-green-100 text-green-500",
          icon: "text-green-500",
          label: "text-green-500"
        };
      case 'active':
        return {
          container: "bg-blue-600 text-white",
          icon: "text-white",
          label: "text-white"
        };
      default:
        return {
          container: "text-gray-400 hover:bg-gray-200",
          icon: "text-gray-400",
          label: "text-gray-400"
        };
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between space-x-4 py-4">
          {defaultStages.map((stage, index) => {
            const Icon = stage.icon;
            const styles = getStageStyles(stage.key);
            const status = getStageStatus(stage.key);
            const isComplete = status === 'complete';

            return (
              <div key={stage.key} className="flex items-center space-x-4 flex-1">
                <Link
                  to={stage.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${styles.container}`}
                >
                  <Icon className={`h-4 w-4 ${styles.icon}`} />
                  <span className={`text-sm font-medium ${styles.label}`}>
                    {stage.name}
                  </span>
                  {isComplete && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </Link>
                
                {/* Connector line */}
                {index < defaultStages.length - 1 && (
                  <div className={`flex-1 h-0.5 ${
                    isComplete ? 'bg-green-500' : 
                    status === 'active' ? 'bg-[#0071E3]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PipelineBar;
