
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
      <CardContent className="p-2">
        {/* Toggle Switch - More compact */}
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xs font-medium">Show:</span>
          <div className="flex items-center space-x-1">
            <span className={`text-xs ${!showCampaignInfluencers ? 'font-medium' : 'text-gray-500'}`}>
              All
            </span>
            <Switch
              checked={showCampaignInfluencers}
              onCheckedChange={onToggleChange}
              className="scale-75"
            />
            <span className={`text-xs ${showCampaignInfluencers ? 'font-medium' : 'text-gray-500'}`}>
              Campaign
            </span>
          </div>
        </div>

        {/* Search and Filter Row - Ultra compact */}
        <div className="flex space-x-2 mb-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
            <Input 
              placeholder="Search influencers..." 
              className="pl-7 h-7 text-xs"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="h-7 px-2">
            <Filter className="h-3 w-3 mr-1" />
            <span className="text-xs">Filters</span>
          </Button>
        </div>
        
        {/* Compact Filter Badges */}
        <div className="flex space-x-1">
          {suggestedFilters.map((filter) => {
            const isActive = activeFilters.includes(filter);
            return (
              <Badge 
                key={filter}
                variant={isActive ? "default" : "outline"} 
                className={`text-xs cursor-pointer transition-colors py-0 px-1 h-5 ${
                  isActive 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleFilterClick(filter)}
              >
                <span className="text-xs">{filter}</span>
                {isActive && (
                  <X className="h-2 w-2 ml-1" />
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
