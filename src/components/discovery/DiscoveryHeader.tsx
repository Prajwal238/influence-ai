
import { Sparkles, Users, Zap, Target } from "lucide-react";

const DiscoveryHeader = () => {
  return (
    <div className="text-center space-y-6 py-8">
      {/* AI Badge */}
      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold border border-blue-200/60 shadow-sm backdrop-blur-sm">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <Sparkles className="h-4 w-4" />
        <span>AI-Powered Discovery</span>
      </div>
      
      {/* Main Heading */}
      <div className="space-y-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-none">
          Discover Perfect
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent block sm:inline sm:ml-3">
            Creators
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Find and collaborate with authentic creators who align with your brand values and campaign goals
        </p>
      </div>

      {/* Stats Row */}
      <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white/40 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-200/60">
          <Users className="h-4 w-4 text-blue-600" />
          <span className="font-medium">10,000+ Verified Creators</span>
        </div>
        
        <div className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block"></div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white/40 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-200/60">
          <Zap className="h-4 w-4 text-emerald-600" />
          <span className="font-medium">AI-Matched Recommendations</span>
        </div>
        
        <div className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block"></div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white/40 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-200/60">
          <Target className="h-4 w-4 text-purple-600" />
          <span className="font-medium">Smart Campaign Matching</span>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryHeader;
