
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Users, Check } from "lucide-react";

interface Influencer {
  id: number;
  name: string;
  handle: string;
  followers: string;
  niche: string;
}

interface InfluencerSelectorProps {
  availableInfluencers: Influencer[];
  selectedInfluencers: number[];
  onToggleInfluencer: (influencerId: number) => void;
}

const InfluencerSelector = ({ 
  availableInfluencers, 
  selectedInfluencers, 
  onToggleInfluencer 
}: InfluencerSelectorProps) => {
  // Group influencers by platform (mock data - in real app this would come from API)
  const groupedInfluencers = {
    instagram: availableInfluencers.filter((_, index) => index % 3 === 0),
    email: availableInfluencers.filter((_, index) => index % 3 === 1),
    whatsapp: availableInfluencers.filter((_, index) => index % 3 === 2)
  };

  // Check platform compatibility for bulk sending
  const selectedInfluencerDetails = availableInfluencers.filter(inf => selectedInfluencers.includes(inf.id));
  const platforms = Object.keys(groupedInfluencers).filter(platform => 
    groupedInfluencers[platform as keyof typeof groupedInfluencers].some(inf => selectedInfluencers.includes(inf.id))
  );
  const hasPlatformMismatch = platforms.length > 1;

  const handleSelectAll = () => {
    const allIds = availableInfluencers.map(inf => inf.id);
    const allSelected = allIds.every(id => selectedInfluencers.includes(id));
    
    if (allSelected) {
      // Deselect all
      allIds.forEach(id => {
        if (selectedInfluencers.includes(id)) {
          onToggleInfluencer(id);
        }
      });
    } else {
      // Select all
      allIds.forEach(id => {
        if (!selectedInfluencers.includes(id)) {
          onToggleInfluencer(id);
        }
      });
    }
  };

  const allSelected = availableInfluencers.length > 0 && 
    availableInfluencers.every(inf => selectedInfluencers.includes(inf.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Outreach</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Send personalized messages to selected influencers for this campaign.
        </p>
      </div>

      {/* Selection Summary */}
      {selectedInfluencers.length > 0 && (
        <Card className="border-l-4 border-l-blue-500 bg-blue-50/50">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {selectedInfluencers.length} influencer{selectedInfluencers.length !== 1 ? 's' : ''} selected
                  </p>
                  <p className="text-sm text-gray-600">
                    Ready for outreach across {platforms.length} platform{platforms.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              {hasPlatformMismatch && (
                <div className="flex items-center space-x-2 text-amber-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Platform mismatch detected</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Platform Mismatch Warning */}
      {hasPlatformMismatch && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-900">Platform Compatibility Warning</h4>
                <p className="text-sm text-amber-800 mt-1">
                  Selected influencers are on different platforms. Bulk messaging is disabled for mixed platform selections.
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
            const isSelected = selectedInfluencers.includes(influencer.id);
            // Determine platform for styling
            const platformIndex = influencer.id % 3;
            const platform = platformIndex === 0 ? 'Instagram' : platformIndex === 1 ? 'Email' : 'WhatsApp';
            const platformColor = platformIndex === 0 ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 
                                 platformIndex === 1 ? 'bg-blue-500' : 'bg-green-500';
            
            return (
              <div 
                key={influencer.id}
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50/50 shadow-sm' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onToggleInfluencer(influencer.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      checked={isSelected}
                      className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    />
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-gray-900">{influencer.name}</h4>
                      <Badge className={`${platformColor} text-white text-xs`}>
                        {platform}
                      </Badge>
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
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default InfluencerSelector;
