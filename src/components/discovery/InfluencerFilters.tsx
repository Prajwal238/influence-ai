
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

interface InfluencerFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const InfluencerFilters = ({ searchQuery, onSearchChange }: InfluencerFiltersProps) => {
  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardContent className="p-6">
        <div className="flex space-x-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search influencers by name, handle, or niche..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Badge variant="outline">Fashion</Badge>
          <Badge variant="outline">100K+ followers</Badge>
          <Badge variant="outline">High engagement</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfluencerFilters;
