
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Star, MapPin, Heart, ExternalLink, Verified } from "lucide-react";
import PlatformPill from "./PlatformPill";

interface Platform {
  name: string;
  handle: string;
  followers: string;
  engagement: string;
  verified: boolean;
  topBrand: string | null;
}

interface Influencer {
  id: number;
  name: string;
  bio: string;
  location: string;
  image: string;
  totalFollowers: string;
  avgEngagement: string;
  languages: string[];
  rating: number;
  niches: string[];
  platforms: Platform[];
}

interface InfluencerCardProps {
  influencer: Influencer;
}

const InfluencerCard = ({ influencer }: InfluencerCardProps) => {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return require('lucide-react').Instagram;
      case 'youtube': return require('lucide-react').Youtube;
      case 'twitter': return require('lucide-react').Twitter;
      case 'linkedin': return require('lucide-react').Linkedin;
      case 'tiktok': return require('lucide-react').Users;
      default: return require('lucide-react').Globe;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram': return 'from-purple-500 to-pink-500';
      case 'youtube': return 'from-red-500 to-red-600';
      case 'twitter': return 'from-blue-400 to-blue-500';
      case 'linkedin': return 'from-blue-600 to-blue-700';
      case 'tiktok': return 'from-gray-800 to-black';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <Card className="group bg-white shadow-sm border-gray-200 hover:shadow-xl hover:border-gray-300 hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden">
      <CardContent className="p-0">
        {/* Influencer Identity */}
        <div className="p-6 pb-4">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <Avatar className="h-16 w-16">
                <AvatarImage src={influencer.image} alt={influencer.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-lg">
                  {influencer.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-xl text-gray-900 mb-1">{influencer.name}</h3>
              <p className="text-sm text-gray-600 italic line-clamp-2 mb-2">{influencer.bio}</p>
              <div className="flex items-center text-xs text-gray-500">
                <MapPin className="h-3 w-3 mr-1" />
                {influencer.location}
              </div>
            </div>
          </div>
        </div>

        {/* Platform Overview */}
        <div className="px-6 pb-4">
          <div className="space-y-3">
            {influencer.platforms.slice(0, 3).map((platform) => (
              <PlatformPill key={platform.name} platform={platform} />
            ))}
            {influencer.platforms.length > 3 && (
              <div className="flex items-center justify-center p-2 text-xs text-gray-500 bg-gray-50 rounded-lg">
                +{influencer.platforms.length - 3} more platforms
              </div>
            )}
          </div>
        </div>

        {/* Aggregated Stats */}
        <div className="px-6 pb-4 border-t border-gray-100 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="font-bold text-lg text-gray-900">{influencer.totalFollowers}</p>
              <p className="text-xs text-gray-500">Total Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg text-gray-900">{influencer.avgEngagement}</p>
              <p className="text-xs text-gray-500">Avg Engagement</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {renderStars(influencer.rating)}
              <span className="text-xs text-gray-600 ml-1">{influencer.rating}</span>
            </div>
            <div className="text-xs text-gray-500">
              {influencer.languages.join(', ')}
            </div>
          </div>
        </div>

        {/* Niche Tags */}
        <div className="px-6 pb-4">
          <div className="flex flex-wrap gap-2">
            {influencer.niches.slice(0, 3).map((niche) => (
              <Badge key={niche} variant="secondary" className="text-xs px-2 py-1 bg-blue-50 text-blue-700 border-blue-200">
                #{niche.toLowerCase()}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 pt-2 border-t border-gray-100">
          <div className="flex space-x-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1 h-9">
                  <Eye className="h-4 w-4 mr-2" />
                  View Profile
                </Button>
              </DialogTrigger>
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
            </Dialog>
            <Button size="sm" className="flex-1 h-9 bg-blue-600 hover:bg-blue-700">
              <Heart className="h-4 w-4 mr-2" />
              Add to Campaign
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfluencerCard;
