
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Check, Instagram, Mail, Phone } from "lucide-react";

interface Influencer {
  id: number;
  name: string;
  handle: string;
  followers: string;
  niche: string;
}

interface PlatformGroupProps {
  platform: 'instagram' | 'email' | 'whatsapp';
  influencers: Influencer[];
  selectedInfluencers: number[];
  onToggleInfluencer: (influencerId: number) => void;
  onSelectAllInPlatform: () => void;
  onDeselectAllInPlatform: () => void;
}

const PlatformGroup = ({ 
  platform, 
  influencers, 
  selectedInfluencers, 
  onToggleInfluencer,
  onSelectAllInPlatform,
  onDeselectAllInPlatform
}: PlatformGroupProps) => {
  const getPlatformIcon = () => {
    switch (platform) {
      case "instagram": return <Instagram className="h-4 w-4" />;
      case "email": return <Mail className="h-4 w-4" />;
      case "whatsapp": return <Phone className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getPlatformColor = () => {
    switch (platform) {
      case "instagram": return "from-purple-500 to-pink-500";
      case "email": return "from-blue-500 to-blue-600";
      case "whatsapp": return "from-green-500 to-green-600";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const selectedInThisPlatform = influencers.filter(inf => selectedInfluencers.includes(inf.id));
  const allSelected = selectedInThisPlatform.length === influencers.length && influencers.length > 0;
  const someSelected = selectedInThisPlatform.length > 0 && selectedInThisPlatform.length < influencers.length;

  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${getPlatformColor()} text-white`}>
              {getPlatformIcon()}
            </div>
            <span className="capitalize">{platform}</span>
            <Badge variant="secondary" className="ml-2">
              {influencers.length} influencer{influencers.length !== 1 ? 's' : ''}
            </Badge>
          </CardTitle>
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={allSelected ? onDeselectAllInPlatform : onSelectAllInPlatform}
              className="text-xs"
            >
              {allSelected ? 'Deselect All' : 'Select All'}
            </Button>
          </div>
        </div>
        {selectedInThisPlatform.length > 0 && (
          <div className={`text-sm p-2 rounded-lg bg-gradient-to-r ${getPlatformColor()} text-white`}>
            <strong>{selectedInThisPlatform.length}</strong> selected for bulk messaging
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {influencers.map((influencer) => (
            <div 
              key={influencer.id}
              className={`flex items-center justify-between p-2 border rounded-lg cursor-pointer transition-colors ${
                selectedInfluencers.includes(influencer.id) 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => onToggleInfluencer(influencer.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="h-3 w-3 text-gray-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">{influencer.name}</h4>
                  <p className="text-xs text-gray-600">{influencer.handle} • {influencer.followers} • {influencer.niche}</p>
                </div>
              </div>
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                selectedInfluencers.includes(influencer.id) 
                  ? 'border-blue-500 bg-blue-500' 
                  : 'border-gray-300'
              }`}>
                {selectedInfluencers.includes(influencer.id) && (
                  <Check className="h-2.5 w-2.5 text-white" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformGroup;
