
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Search, Filter, X } from "lucide-react";

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
  const suggestedFilters = ["Fashion", "100K+ followers", "High engagement"];

  const handleFilterClick = (filter: string) => {
    if (activeFilters.includes(filter)) {
      onFilterRemove(filter);
    } else {
      onFilterAdd(filter);
    }
  };

  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardContent className="p-3">
        {/* Single Row Layout: Toggle + Search + Filters */}
        <div className="flex items-center space-x-4 mb-3">
          {/* Left: Toggle Switch */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <span className={`text-sm ${!showCampaignInfluencers ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
              All
            </span>
            <Switch
              checked={showCampaignInfluencers}
              onCheckedChange={onToggleChange}
              className="h-5 w-9"
            />
            <span className={`text-sm ${showCampaignInfluencers ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
              Campaign
            </span>
          </div>

          {/* Center: Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search influencers..." 
              className="pl-10 h-9 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Right: Filters Button */}
          <Button variant="outline" size="sm" className="h-9 px-3 flex-shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Filter Badges Row */}
        <div className="flex flex-wrap gap-2">
          {suggestedFilters.map((filter) => {
            const isActive = activeFilters.includes(filter);
            return (
              <Badge 
                key={filter}
                variant={isActive ? "default" : "outline"} 
                className={`text-xs cursor-pointer transition-colors py-1 px-2 ${
                  isActive 
                    ? "bg-blue-600 text-white hover:bg-blue-700 border-blue-600" 
                    : "hover:bg-gray-100 border-gray-300"
                }`}
                onClick={() => handleFilterClick(filter)}
              >
                {filter}
                {isActive && (
                  <X className="h-3 w-3 ml-1" />
                )}
              </Badge>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscoveryFilters;
