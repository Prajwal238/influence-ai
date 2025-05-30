
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { CampaignData } from "../NewCampaignModal";

interface Props {
  data: CampaignData;
  updateData: (updates: Partial<CampaignData>) => void;
}

const NewCampaignStep1 = ({ data, updateData }: Props) => {
  const navigate = useNavigate();

  const canProceed = data.name.trim().length > 0;

  const handleNext = () => {
    if (canProceed) {
      navigate('/dashboard/new-campaign/step-2');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="campaign-name" className="text-sm font-medium text-gray-900">
            Campaign Name *
          </Label>
          <Input
            id="campaign-name"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            placeholder="Enter campaign name"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium text-gray-900">
            Description
          </Label>
          <Textarea
            id="description"
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
            placeholder="Describe your campaign goals and requirements"
            maxLength={300}
            className="w-full min-h-[100px]"
          />
          <p className="text-xs text-gray-500">{data.description.length}/300 characters</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-900">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !data.startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data.startDate ? format(data.startDate, "PPP") : "Pick start date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={data.startDate}
                  onSelect={(date) => updateData({ startDate: date })}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-900">End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !data.endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data.endDate ? format(data.endDate, "PPP") : "Pick end date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={data.endDate}
                  onSelect={(date) => updateData({ endDate: date })}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <Button variant="ghost" onClick={handleCancel}>
          Cancel
        </Button>
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

export default NewCampaignStep1;
