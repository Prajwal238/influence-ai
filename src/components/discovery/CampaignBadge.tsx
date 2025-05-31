
import { Badge } from "@/components/ui/badge";

interface CampaignBadgeProps {
  campaignName: string;
}

const CampaignBadge = ({ campaignName }: CampaignBadgeProps) => {
  return (
    <div className="absolute top-3 right-3 z-10">
      <Badge className="bg-green-100 text-green-700 border-green-200 px-2 py-1 text-xs font-medium">
        ✓ Added to campaign
      </Badge>
    </div>
  );
};

export default CampaignBadge;
