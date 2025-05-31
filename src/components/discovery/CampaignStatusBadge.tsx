
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CampaignStatusBadgeProps {
  campaignName: string;
}

const CampaignStatusBadge = ({ campaignName }: CampaignStatusBadgeProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className="rounded-md bg-green-100 text-green-700 px-2 py-1 text-xs border-green-200">
            🟢 Added to "{campaignName}"
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Added to {campaignName}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CampaignStatusBadge;
