
import { Star } from "lucide-react";

interface InfluencerStatsProps {
  totalFollowers: string;
  avgEngagement: string;
  rating: number;
  languages: string[];
}

const InfluencerStats = ({ totalFollowers, avgEngagement, rating, languages }: InfluencerStatsProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="px-6 pb-4 border-t border-gray-100 pt-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="font-bold text-lg text-gray-900">{totalFollowers}</p>
          <p className="text-xs text-gray-500">Total Followers</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-lg text-gray-900">{avgEngagement}</p>
          <p className="text-xs text-gray-500">Avg Engagement</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {renderStars(rating)}
          <span className="text-xs text-gray-600 ml-1">{rating}</span>
        </div>
        <div className="text-xs text-gray-500">
          {languages.join(', ')}
        </div>
      </div>
    </div>
  );
};

export default InfluencerStats;
