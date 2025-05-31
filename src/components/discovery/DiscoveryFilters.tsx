
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface DiscoveryFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showCampaignInfluencers: boolean;
  onToggleChange: (value: boolean) => void;
  campaignStatus: string;
  onCampaignStatusChange: (value: string) => void;
  selectedCampaign: string;
  onCampaignChange: (value: string) => void;
  campaigns: { id: string; name: string; }[];
}

const DiscoveryFilters = ({ 
  searchQuery, 
  onSearchChange,
  showCampaignInfluencers,
  onToggleChange,
  campaignStatus,
  onCampaignStatusChange,
  selectedCampaign,
  onCampaignChange,
  campaigns
}: DiscoveryFiltersProps) => {
  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardContent className="p-6">
        {/* Toggle Switch */}
        <div className="flex items-center space-x-3 mb-4">
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

        {/* Filter Controls */}
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label className="text-xs font-medium text-gray-600 mb-1 block">Campaign Status</label>
            <Select value={campaignStatus} onValueChange={onCampaignStatusChange}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="not-added">Not Added to Campaign</SelectItem>
                <SelectItem value="added">Added to Campaign</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="text-xs font-medium text-gray-600 mb-1 block">Campaign</label>
            <Select value={selectedCampaign} onValueChange={onCampaignChange}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select campaign" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campaigns</SelectItem>
                {campaigns.map((campaign) => (
                  <SelectItem key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Active Filters */}
        <div className="flex space-x-2">
          <Badge variant="outline">Fashion</Badge>
          <Badge variant="outline">100K+ followers</Badge>
          <Badge variant="outline">High engagement</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscoveryFilters;
