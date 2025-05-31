
import { Badge } from "@/components/ui/badge";

interface InfluencerNichesProps {
  niches: string[];
}

const InfluencerNiches = ({ niches }: InfluencerNichesProps) => {
  return (
    <div className="px-6 pb-4">
      <div className="flex flex-wrap gap-2">
        {niches.slice(0, 3).map((niche) => (
          <Badge key={niche} variant="secondary" className="text-xs px-2 py-1 bg-blue-50 text-blue-700 border-blue-200">
            #{niche.toLowerCase()}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default InfluencerNiches;
