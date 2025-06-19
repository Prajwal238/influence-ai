
import { Sparkles, Users } from "lucide-react";

const DiscoveryHeader = () => {
  return (
    <div className="text-center space-y-4 py-8">
      <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
        <Sparkles className="h-4 w-4" />
        <span>AI-Powered Discovery</span>
      </div>
      
      <div className="space-y-3">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Discover Perfect
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Influencers</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Find and collaborate with creators who align with your brand values and campaign goals
        </p>
      </div>

      <div className="flex items-center justify-center space-x-8 pt-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Users className="h-4 w-4" />
          <span>10,000+ Verified Creators</span>
        </div>
        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Sparkles className="h-4 w-4" />
          <span>AI-Matched Recommendations</span>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryHeader;
