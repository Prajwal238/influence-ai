
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { CampaignData } from "../NewCampaignModal";

interface Props {
  data: CampaignData;
  updateData: (updates: Partial<CampaignData>) => void;
}

const NewCampaignStep2 = ({ data, updateData }: Props) => {
  const navigate = useNavigate();

  const canProceed = data.objective && data.budget > 0;

  const handleNext = () => {
    if (canProceed) {
      navigate('/dashboard/new-campaign/step-3');
    }
  };

  const handleBack = () => {
    navigate('/dashboard/new-campaign/step-1');
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const handleKpiToggle = (kpi: string, checked: boolean) => {
    const updatedKpis = checked 
      ? [...data.kpis, kpi]
      : data.kpis.filter(k => k !== kpi);
    updateData({ kpis: updatedKpis });
  };

  const kpiOptions = [
    { id: 'impressions', label: 'Impressions' },
    { id: 'clicks', label: 'Clicks' },
    { id: 'conversions', label: 'Conversions' },
    { id: 'roi', label: 'ROI' },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-900">
            Campaign Objective *
          </Label>
          <Select value={data.objective} onValueChange={(value) => updateData({ objective: value })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select campaign objective" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="brand-awareness">Brand Awareness</SelectItem>
              <SelectItem value="conversions">Conversions</SelectItem>
              <SelectItem value="engagement">Engagement</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget" className="text-sm font-medium text-gray-900">
            Budget (USD) *
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="budget"
              type="number"
              value={data.budget || ''}
              onChange={(e) => updateData({ budget: parseFloat(e.target.value) || 0 })}
              placeholder="0"
              className="pl-8"
              min="0"
              step="100"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-900">
            Key Performance Indicators (KPIs)
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {kpiOptions.map((kpi) => (
              <div key={kpi.id} className="flex items-center space-x-2">
                <Checkbox
                  id={kpi.id}
                  checked={data.kpis.includes(kpi.id)}
                  onCheckedChange={(checked) => handleKpiToggle(kpi.id, checked as boolean)}
                />
                <Label
                  htmlFor={kpi.id}
                  className="text-sm font-normal text-gray-700 cursor-pointer"
                >
                  {kpi.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

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
          onClick={handleNext} 
          disabled={!canProceed}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default NewCampaignStep2;
