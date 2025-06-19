
import { Star, Users, Heart, Globe } from "lucide-react";

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
    <div className="px-6 pb-4 border-t border-gray-100/60 pt-4">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center bg-blue-50/50 rounded-xl p-3 border border-blue-100/60">
          <div className="flex items-center justify-center mb-1">
            <Users className="h-4 w-4 text-blue-600 mr-1" />
          </div>
          <p className="font-bold text-lg text-gray-900">{totalFollowers}</p>
          <p className="text-xs text-gray-600 font-medium">Total Followers</p>
        </div>
        <div className="text-center bg-green-50/50 rounded-xl p-3 border border-green-100/60">
          <div className="flex items-center justify-center mb-1">
            <Heart className="h-4 w-4 text-green-600 mr-1" />
          </div>
          <p className="font-bold text-lg text-gray-900">{avgEngagement}</p>
          <p className="text-xs text-gray-600 font-medium">Avg Engagement</p>
        </div>
      </div>

      {/* Rating and Languages */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {renderStars(rating)}
          </div>
          <span className="text-sm font-semibold text-gray-700">{rating}</span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-gray-600 bg-gray-50/80 backdrop-blur-sm px-2 py-1 rounded-full">
          <Globe className="h-3 w-3" />
          <span className="font-medium">{languages.slice(0, 2).join(', ')}</span>
          {languages.length > 2 && <span>+{languages.length - 2}</span>}
        </div>
      </div>
    </div>
  );
};

export default InfluencerStats;
