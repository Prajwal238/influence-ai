
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
      <CardContent className="p-4">
        {/* Toggle Switch */}
        <div className="flex items-center space-x-3 mb-3">
          <span className="text-sm font-medium">Show:</span>
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${!showCampaignInfluencers ? 'font-medium' : 'text-gray-500'}`}>
              All Influencers
            </span>
            <Switch
              checked={showCampaignInfluencers}
              onCheckedChange={onToggleChange}
            />
            <span className={`text-sm ${showCampaignInfluencers ? 'font-medium' : 'text-gray-500'}`}>
              My Campaign's Influencers
            </span>
          </div>
        </div>

        {/* Search and Filter Row */}
        <div className="flex space-x-3 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search influencers by name, handle, or niche..." 
              className="pl-10 h-9"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
        
        {/* Active Filters */}
        <div className="flex space-x-2">
          {suggestedFilters.map((filter) => {
            const isActive = activeFilters.includes(filter);
            return (
              <Badge 
                key={filter}
                variant={isActive ? "default" : "outline"} 
                className={`text-xs cursor-pointer transition-colors ${
                  isActive 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "hover:bg-gray-100"
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
