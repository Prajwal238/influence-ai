
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PlatformGroup from "./PlatformGroup";

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

  const handleSelectAllInPlatform = (platform: 'instagram' | 'email' | 'whatsapp') => {
    const platformInfluencers = groupedInfluencers[platform];
    platformInfluencers.forEach(influencer => {
      if (!selectedInfluencers.includes(influencer.id)) {
        onToggleInfluencer(influencer.id);
      }
    });
  };

  const handleDeselectAllInPlatform = (platform: 'instagram' | 'email' | 'whatsapp') => {
    const platformInfluencers = groupedInfluencers[platform];
    platformInfluencers.forEach(influencer => {
      if (selectedInfluencers.includes(influencer.id)) {
        onToggleInfluencer(influencer.id);
      }
    });
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold text-gray-900">
            Select Influencers for Bulk Outreach
          </CardTitle>
          {selectedInfluencers.length > 0 && (
            <div className="flex items-center space-x-2">
              <Badge className="bg-blue-600 text-white">
                {selectedInfluencers.length} Total Selected
              </Badge>
              <span className="text-sm text-blue-800">
                Ready for bulk messaging across platforms
              </span>
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Platform Groups */}
      <div className="space-y-4">
        {Object.entries(groupedInfluencers).map(([platform, influencers]) => (
          influencers.length > 0 && (
            <PlatformGroup
              key={platform}
              platform={platform as 'instagram' | 'email' | 'whatsapp'}
              influencers={influencers}
              selectedInfluencers={selectedInfluencers}
              onToggleInfluencer={onToggleInfluencer}
              onSelectAllInPlatform={() => handleSelectAllInPlatform(platform as 'instagram' | 'email' | 'whatsapp')}
              onDeselectAllInPlatform={() => handleDeselectAllInPlatform(platform as 'instagram' | 'email' | 'whatsapp')}
            />
          )
        ))}
      </div>
    </div>
  );
};

export default InfluencerSelector;
