
import { Star, Users, Heart, Globe, TrendingUp } from "lucide-react";

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
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center bg-gradient-to-br from-blue-50/60 to-blue-100/40 rounded-xl p-3 border border-blue-200/40 backdrop-blur-sm group-hover:border-blue-300/60 transition-colors">
          <div className="flex items-center justify-center mb-1">
            <Users className="h-4 w-4 text-blue-600 mr-1" />
          </div>
          <p className="font-bold text-lg text-gray-900">{totalFollowers}</p>
          <p className="text-xs text-gray-600 font-medium">Total Reach</p>
        </div>
        
        <div className="text-center bg-gradient-to-br from-emerald-50/60 to-emerald-100/40 rounded-xl p-3 border border-emerald-200/40 backdrop-blur-sm group-hover:border-emerald-300/60 transition-colors">
          <div className="flex items-center justify-center mb-1">
            <TrendingUp className="h-4 w-4 text-emerald-600 mr-1" />
          </div>
          <p className="font-bold text-lg text-gray-900">{avgEngagement}</p>
          <p className="text-xs text-gray-600 font-medium">Engagement</p>
        </div>
      </div>

      {/* Rating and Languages */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-0.5">
            {renderStars(rating)}
          </div>
          <span className="text-sm font-semibold text-gray-700">{rating}</span>
          <span className="text-xs text-gray-500">rating</span>
        </div>
        
        <div className="flex items-center space-x-1 text-xs text-gray-600 bg-gradient-to-r from-gray-50/80 to-gray-100/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-gray-200/60">
          <Globe className="h-3 w-3" />
          <span className="font-medium">{languages.slice(0, 2).join(', ')}</span>
          {languages.length > 2 && <span className="text-gray-500">+{languages.length - 2}</span>}
        </div>
      </div>
    </div>
  );
};

export default InfluencerStats;
