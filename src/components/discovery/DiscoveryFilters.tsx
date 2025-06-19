
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Search, Filter, X, Sparkles } from "lucide-react";

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
    { label: "Fashion", icon: "👗" },
    { label: "100K+ followers", icon: "📈" },
    { label: "High engagement", icon: "❤️" },
    { label: "Verified", icon: "✓" },
    { label: "Lifestyle", icon: "🌟" },
    { label: "Beauty", icon: "💄" }
  ];

  const handleFilterClick = (filter: string) => {
    if (activeFilters.includes(filter)) {
      onFilterRemove(filter);
    } else {
      onFilterAdd(filter);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toggle Switch Card */}
      <Card className="bg-white/70 backdrop-blur-sm border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm font-medium transition-colors ${!showCampaignInfluencers ? 'text-gray-900' : 'text-gray-500'}`}>
              All Influencers
            </span>
            <Switch
              checked={showCampaignInfluencers}
              onCheckedChange={onToggleChange}
              className="data-[state=checked]:bg-blue-600"
            />
            <span className={`text-sm font-medium transition-colors ${showCampaignInfluencers ? 'text-gray-900' : 'text-gray-500'}`}>
              My Campaign's Influencers
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter Card */}
      <Card className="bg-white/70 backdrop-blur-sm border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-200">
        <CardContent className="p-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search by name, handle, niche, or location..." 
              className="pl-12 h-12 text-base border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl bg-white/80 backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          
          {/* Filter Tags */}
          <div className="space-y-3">
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
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Clear all
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
                    className={`text-sm cursor-pointer transition-all duration-200 hover:scale-105 ${
                      isActive 
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md" 
                        : "hover:bg-gray-50 hover:border-gray-300"
                    }`}
                    onClick={() => handleFilterClick(filter.label)}
                  >
                    <span className="mr-1">{filter.icon}</span>
                    {filter.label}
                    {isActive && (
                      <X className="h-3 w-3 ml-1" />
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
