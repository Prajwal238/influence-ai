
import { useNavigate, useLocation } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewCampaignStep1 from "./steps/NewCampaignStep1";
import NewCampaignStep2 from "./steps/NewCampaignStep2";
import NewCampaignStep3 from "./steps/NewCampaignStep3";
import { useState } from "react";

export interface CampaignData {
  name: string;
  description: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  objective: string;
  budget: number;
  kpis: string[];
  autoAdvance: boolean;
  notifyAtEachStage: boolean;
  language: string;
}

const NewCampaignModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [campaignData, setCampaignData] = useState<CampaignData>({
    name: "",
    description: "",
    startDate: undefined,
    endDate: undefined,
    objective: "",
    budget: 0,
    kpis: [],
    autoAdvance: true,
    notifyAtEachStage: true,
    language: "en-US"
  });

  const isOpen = location.pathname.includes('/new-campaign');
  const currentStep = location.pathname.includes('step-2') ? 2 : 
                    location.pathname.includes('step-3') ? 3 : 1;

  const handleClose = () => {
    navigate('/dashboard');
  };

  const updateCampaignData = (updates: Partial<CampaignData>) => {
    setCampaignData(prev => ({ ...prev, ...updates }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <NewCampaignStep1 data={campaignData} updateData={updateCampaignData} />;
      case 2:
        return <NewCampaignStep2 data={campaignData} updateData={updateCampaignData} />;
      case 3:
        return <NewCampaignStep3 data={campaignData} updateData={updateCampaignData} onComplete={handleClose} />;
      default:
        return <NewCampaignStep1 data={campaignData} updateData={updateCampaignData} />;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Create Campaign";
      case 2: return "Campaign Goals & Budget";
      case 3: return "Configure Workflow";
      default: return "Create Campaign";
    }
  };

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1: return "Step 1 of 3: Basic Details";
      case 2: return "Step 2 of 3";
      case 3: return "Step 3 of 3";
      default: return "Step 1 of 3: Basic Details";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-none h-screen w-screen p-0 m-0 rounded-none border-none">
        <div className="h-full flex flex-col bg-white">
          {/* Header */}
          <div className="border-b border-gray-100 px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{getStepTitle()}</h1>
                <p className="text-gray-600 mt-1">{getStepSubtitle()}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Progress Indicator */}
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full ${
                    step === currentStep 
                      ? 'bg-blue-600' 
                      : step < currentStep 
                        ? 'bg-blue-300' 
                        : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-2xl mx-auto px-8 py-8">
              {renderStep()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewCampaignModal;
