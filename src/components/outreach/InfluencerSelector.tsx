
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Check } from "lucide-react";
import PlatformSelector from "./PlatformSelector";
import { InfluencerSelection } from "@/types/outreach";

interface Influencer {
  id: number;
  name: string;
  handle: string;
  followers: string;
  niche: string;
  platforms: string[];
}

interface InfluencerSelectorProps {
  availableInfluencers: Influencer[];
  selectedInfluencers: InfluencerSelection[];
  onUpdateSelection: (influencerId: number, platform: string) => void;
  onRemoveSelection: (influencerId: number) => void;
}

const InfluencerSelector = ({ 
  availableInfluencers, 
  selectedInfluencers, 
  onUpdateSelection,
  onRemoveSelection
}: InfluencerSelectorProps) => {
  const handleInfluencerToggle = (influencerId: number) => {
    const isSelected = selectedInfluencers.some(sel => sel.influencerId === influencerId);
    
    if (isSelected) {
      onRemoveSelection(influencerId);
    } else {
      const influencer = availableInfluencers.find(inf => inf.id === influencerId);
      if (influencer) {
        // Default to first available platform
        const defaultPlatform = influencer.platforms[0] || 'instagram';
        onUpdateSelection(influencerId, defaultPlatform);
      }
    }
  };

  const handlePlatformChange = (influencerId: number, platform: string) => {
    onUpdateSelection(influencerId, platform);
  };

  const handleSelectAll = () => {
    const allIds = availableInfluencers.map(inf => inf.id);
    const allSelected = allIds.every(id => selectedInfluencers.some(sel => sel.influencerId === id));
    
    if (allSelected) {
      // Deselect all
      allIds.forEach(id => {
        if (selectedInfluencers.some(sel => sel.influencerId === id)) {
          onRemoveSelection(id);
        }
      });
    } else {
      // Select all with default platforms
      allIds.forEach(id => {
        if (!selectedInfluencers.some(sel => sel.influencerId === id)) {
          const influencer = availableInfluencers.find(inf => inf.id === id);
          if (influencer) {
            const defaultPlatform = influencer.platforms[0] || 'instagram';
            onUpdateSelection(id, defaultPlatform);
          }
        }
      });
    }
  };

  const allSelected = availableInfluencers.length > 0 && 
    availableInfluencers.every(inf => selectedInfluencers.some(sel => sel.influencerId === inf.id));

  return (
    <div className="space-y-6">
      {/* Selection Summary */}
      {selectedInfluencers.length > 0 && (
        <Card className="border-l-4 border-l-blue-500 bg-blue-50/50">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {selectedInfluencers.length} influencer{selectedInfluencers.length !== 1 ? 's' : ''} selected
                </p>
                <p className="text-sm text-gray-600">
                  Ready for outreach campaign
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Influencer List */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Select Influencers</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSelectAll}
              className="flex items-center space-x-2"
            >
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                allSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
              }`}>
                {allSelected && <Check className="h-2.5 w-2.5 text-white" />}
              </div>
              <span>{allSelected ? 'Deselect All' : 'Select All'}</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {availableInfluencers.map((influencer) => {
            const selection = selectedInfluencers.find(sel => sel.influencerId === influencer.id);
            const isSelected = !!selection;
            
            return (
              <div 
                key={influencer.id}
                className={`flex items-center justify-between p-4 border rounded-lg transition-all ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50/50 shadow-sm' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      checked={isSelected}
                      onCheckedChange={() => handleInfluencerToggle(influencer.id)}
                      className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    />
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-gray-900">{influencer.name}</h4>
                      {influencer.platforms.length > 1 && (
                        <Badge variant="secondary" className="text-xs">
                          {influencer.platforms.length} platforms
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{influencer.handle}</span>
                      <span>•</span>
                      <span>{influencer.followers}</span>
                      <span>•</span>
                      <span>{influencer.niche}</span>
                      <span>•</span>
                      <span className="text-blue-600">English, Spanish</span>
                    </div>
                  </div>
                </div>
                
                {isSelected && (
                  <div className="ml-4">
                    <PlatformSelector
                      platforms={influencer.platforms}
                      selectedPlatform={selection.platform}
                      onPlatformChange={(platform) => handlePlatformChange(influencer.id, platform)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default InfluencerSelector;
