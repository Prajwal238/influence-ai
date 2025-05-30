
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CampaignData } from "../NewCampaignModal";
import { format } from "date-fns";
import { toast } from "sonner";

interface Props {
  data: CampaignData;
  updateData: (updates: Partial<CampaignData>) => void;
  onComplete: () => void;
}

const NewCampaignStep3 = ({ data, updateData, onComplete }: Props) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard/new-campaign/step-2');
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const handleCreateCampaign = async () => {
    // Simulate API call
    try {
      console.log('Creating campaign with data:', data);
      
      // Generate a new campaign ID (in real app, this would come from API)
      const campaignId = Math.random().toString(36).substr(2, 9);
      
      // Show success toast
      toast.success(`Campaign '${data.name}' created. Start with Discovery →`);
      
      // Close modal first
      onComplete();
      
      // Navigate to the new campaign's discovery page
      setTimeout(() => {
        navigate(`/campaigns/${campaignId}/discovery`);
      }, 100);
      
    } catch (error) {
      toast.error('Failed to create campaign. Please try again.');
    }
  };

  const getObjectiveLabel = (objective: string) => {
    switch (objective) {
      case 'brand-awareness': return 'Brand Awareness';
      case 'conversions': return 'Conversions';
      case 'engagement': return 'Engagement';
      default: return objective;
    }
  };

  const getKpiLabels = (kpis: string[]) => {
    const labels = {
      impressions: 'Impressions',
      clicks: 'Clicks',
      conversions: 'Conversions',
      roi: 'ROI'
    };
    return kpis.map(kpi => labels[kpi as keyof typeof labels]).join(', ');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-gray-900">
            Auto-advance stages?
          </Label>
          <Switch
            checked={data.autoAdvance}
            onCheckedChange={(checked) => updateData({ autoAdvance: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-gray-900">
            Notify me at each stage
          </Label>
          <Switch
            checked={data.notifyAtEachStage}
            onCheckedChange={(checked) => updateData({ notifyAtEachStage: checked })}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-900">
            Language & Locale
          </Label>
          <Select value={data.language} onValueChange={(value) => updateData({ language: value })}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-US">English (US)</SelectItem>
              <SelectItem value="en-GB">English (UK)</SelectItem>
              <SelectItem value="es-ES">Spanish</SelectItem>
              <SelectItem value="fr-FR">French</SelectItem>
              <SelectItem value="de-DE">German</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Review Panel */}
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Campaign Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-900">Name:</span>
              <p className="text-gray-600">{data.name}</p>
            </div>
            <div>
              <span className="font-medium text-gray-900">Objective:</span>
              <p className="text-gray-600">{getObjectiveLabel(data.objective)}</p>
            </div>
            <div>
              <span className="font-medium text-gray-900">Budget:</span>
              <p className="text-gray-600">${data.budget.toLocaleString()}</p>
            </div>
            <div>
              <span className="font-medium text-gray-900">Duration:</span>
              <p className="text-gray-600">
                {data.startDate && data.endDate 
                  ? `${format(data.startDate, 'MMM dd')} - ${format(data.endDate, 'MMM dd, yyyy')}`
                  : 'Not set'
                }
              </p>
            </div>
          </div>
          
          {data.kpis.length > 0 && (
            <div>
              <span className="font-medium text-gray-900 text-sm">KPIs:</span>
              <p className="text-gray-600 text-sm">{getKpiLabels(data.kpis)}</p>
            </div>
          )}
          
          {data.description && (
            <div>
              <span className="font-medium text-gray-900 text-sm">Description:</span>
              <p className="text-gray-600 text-sm">{data.description}</p>
            </div>
          )}

          <div className="flex items-center space-x-4 text-sm pt-2 border-t border-gray-100">
            <span className="text-gray-600">
              Auto-advance: {data.autoAdvance ? 'On' : 'Off'}
            </span>
            <span className="text-gray-600">
              Notifications: {data.notifyAtEachStage ? 'On' : 'Off'}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={handleBack}>
            Back
          </Button>
          <Button variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
        <Button 
          onClick={handleCreateCampaign}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Create Campaign
        </Button>
      </div>
    </div>
  );
};

export default NewCampaignStep3;
