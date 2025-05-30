
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Check } from "lucide-react";

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
  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          Select Influencers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {availableInfluencers.map((influencer) => (
            <div 
              key={influencer.id}
              className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedInfluencers.includes(influencer.id) 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => onToggleInfluencer(influencer.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">{influencer.name}</h4>
                  <p className="text-xs text-gray-600">{influencer.handle} • {influencer.followers} • {influencer.niche}</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                selectedInfluencers.includes(influencer.id) 
                  ? 'border-blue-500 bg-blue-500' 
                  : 'border-gray-300'
              }`}>
                {selectedInfluencers.includes(influencer.id) && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
            </div>
          ))}
        </div>
        {selectedInfluencers.length > 0 && (
          <p className="text-sm text-blue-600 mt-3">
            {selectedInfluencers.length} influencer{selectedInfluencers.length > 1 ? 's' : ''} selected
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default InfluencerSelector;
