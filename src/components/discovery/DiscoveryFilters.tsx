
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Search, Filter, X, Sparkles, Users, Zap } from "lucide-react";

interface DiscoveryFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showCampaignInfluencers: boolean;
  onToggleChange: (value: boolean) => void;
  activeFilters: string[];
  onFilterAdd: (filter: string) => void;
  onFilterRemove: (filter: string) => void;
}

const DiscoveryFilters = ({ 
  searchQuery, 
  onSearchChange,
  showCampaignInfluencers,
  onToggleChange,
  activeFilters,
  onFilterAdd,
  onFilterRemove
}: DiscoveryFiltersProps) => {
  const suggestedFilters = [
    { label: "Fashion", icon: "👗", color: "bg-pink-50 border-pink-200 text-pink-700 hover:bg-pink-100" },
    { label: "100K+ followers", icon: "📈", color: "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" },
    { label: "High engagement", icon: "❤️", color: "bg-red-50 border-red-200 text-red-700 hover:bg-red-100" },
    { label: "Verified", icon: "✓", color: "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100" },
    { label: "Lifestyle", icon: "🌟", color: "bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100" },
    { label: "Beauty", icon: "💄", color: "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100" }
  ];

  const handleFilterClick = (filter: string) => {
    if (activeFilters.includes(filter)) {
      onFilterRemove(filter);
    } else {
      onFilterAdd(filter);
    }
  };

  return (
    <div className="space-y-4">
      {/* Toggle Switch Card */}
      <Card className="bg-white/60 backdrop-blur-sm border border-gray-200/60 shadow-sm hover:shadow-md hover:bg-white/80 transition-all duration-200">
        <CardContent className="p-5">
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className={`text-sm font-medium transition-colors ${!showCampaignInfluencers ? 'text-gray-900' : 'text-gray-500'}`}>
                All Creators
              </span>
            </div>
            
            <Switch
              checked={showCampaignInfluencers}
              onCheckedChange={onToggleChange}
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-blue-700"
            />
            
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium transition-colors ${showCampaignInfluencers ? 'text-gray-900' : 'text-gray-500'}`}>
                My Campaign
              </span>
              <Zap className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter Card */}
      <Card className="bg-white/60 backdrop-blur-sm border border-gray-200/60 shadow-sm hover:shadow-md hover:bg-white/80 transition-all duration-200">
        <CardContent className="p-5 space-y-5">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search creators by name, handle, niche, or location..." 
              className="pl-12 h-12 text-base border-gray-200/80 focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 rounded-xl bg-white/90 backdrop-blur-sm placeholder:text-gray-500 transition-all duration-200"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
                onClick={() => onSearchChange("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {/* Filter Tags */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Quick Filters</span>
              </h3>
              {activeFilters.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => activeFilters.forEach(onFilterRemove)}
                  className="text-xs text-gray-500 hover:text-gray-700 h-8"
                >
                  Clear all ({activeFilters.length})
                </Button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {suggestedFilters.map((filter) => {
                const isActive = activeFilters.includes(filter.label);
                return (
                  <Badge 
                    key={filter.label}
                    variant={isActive ? "default" : "outline"} 
                    className={`text-sm cursor-pointer transition-all duration-200 hover:scale-105 border ${
                      isActive 
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md border-blue-600" 
                        : `${filter.color} border transition-colors`
                    }`}
                    onClick={() => handleFilterClick(filter.label)}
                  >
                    <span className="mr-1.5">{filter.icon}</span>
                    {filter.label}
                    {isActive && (
                      <X className="h-3 w-3 ml-1.5" />
                    )}
                  </Badge>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiscoveryFilters;
