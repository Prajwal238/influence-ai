
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, ExternalLink, Verified } from "lucide-react";
import { getPlatformIcon, getPlatformColor } from "./platformUtils";

interface Platform {
  name: string;
  handle: string;
  followers: string;
  engagement: string;
  verified: boolean;
  topBrand: string | null;
}

interface Influencer {
  name: string;
  bio: string;
  location: string;
  image: string;
  totalFollowers: string;
  avgEngagement: string;
  rating: number;
  niches: string[];
  platforms: Platform[];
}

interface InfluencerDialogProps {
  influencer: Influencer;
}

const InfluencerDialog = ({ influencer }: InfluencerDialogProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={influencer.image} alt={influencer.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
              {influencer.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl">{influencer.name}</span>
              <div className="flex items-center space-x-1">
                {renderStars(influencer.rating)}
                <span className="text-sm text-gray-600">{influencer.rating}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 font-normal flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {influencer.location}
            </p>
          </div>
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <p className="text-gray-600">{influencer.bio}</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="font-bold text-2xl text-gray-900">{influencer.totalFollowers}</p>
            <p className="text-sm text-gray-500">Total Followers</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="font-bold text-2xl text-gray-900">{influencer.avgEngagement}</p>
            <p className="text-sm text-gray-500">Avg Engagement</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">Social Platforms</h4>
          {influencer.platforms.map((platform) => {
            const IconComponent = getPlatformIcon(platform.name);
            return (
              <div key={platform.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r ${getPlatformColor(platform.name)} text-white`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium capitalize">{platform.name}</p>
                      {platform.verified && (
                        <Verified className="h-4 w-4 text-blue-500 fill-current" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{platform.handle} • {platform.followers}</p>
                    <p className="text-xs text-gray-500">Engagement: {platform.engagement}</p>
                    {platform.topBrand && (
                      <p className="text-xs text-blue-600">Top Brand: {platform.topBrand}</p>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>

        <div>
          <h4 className="font-semibold mb-2">Specialties</h4>
          <div className="flex flex-wrap gap-2">
            {influencer.niches.map((niche) => (
              <Badge key={niche} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                #{niche.toLowerCase()}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default InfluencerDialog;
