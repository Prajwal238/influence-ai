
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CampaignLayout from "@/components/layout/CampaignLayout";
import AgentPanel from "@/components/agents/AgentPanel";
import { Search, Filter, Eye, Star, MapPin, Globe, Users, Heart, Instagram, Youtube, Twitter, Linkedin, ExternalLink, Verified } from "lucide-react";

const Discovery = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const influencers = [
    {
      id: 1,
      name: "Sarah Johnson",
      bio: "Fashion enthusiast & lifestyle creator passionate about sustainable fashion and wellness",
      location: "New York, NY",
      image: "/api/placeholder/64/64",
      totalFollowers: "659K",
      avgEngagement: "3.8%",
      languages: ["English", "Spanish"],
      rating: 4.8,
      niches: ["Fashion", "Lifestyle", "Wellness"],
      platforms: [
        {
          name: "instagram",
          handle: "@sarahjohnson",
          followers: "125K",
          engagement: "3.2%",
          verified: true,
          topBrand: "Nike"
        },
        {
          name: "youtube",
          handle: "Sarah Johnson Fashion",
          followers: "289K",
          engagement: "4.1%",
          verified: false,
          topBrand: "Sephora"
        },
        {
          name: "twitter",
          handle: "@sarah_j_fashion",
          followers: "45K",
          engagement: "2.8%",
          verified: false,
          topBrand: null
        },
        {
          name: "tiktok",
          handle: "@sarahjohnsonofficial",
          followers: "200K",
          engagement: "5.2%",
          verified: true,
          topBrand: "Zara"
        }
      ]
    },
    {
      id: 2,
      name: "Mike Chen",
      bio: "Tech reviewer & software engineer sharing the latest in consumer technology",
      location: "San Francisco, CA",
      image: "/api/placeholder/64/64",
      totalFollowers: "423K",
      avgEngagement: "4.2%",
      languages: ["English", "Mandarin"],
      rating: 4.6,
      niches: ["Tech", "Gaming", "Reviews"],
      platforms: [
        {
          name: "youtube",
          handle: "Mike Chen Tech",
          followers: "189K",
          engagement: "4.5%",
          verified: true,
          topBrand: "Apple"
        },
        {
          name: "twitter",
          handle: "@mikechen_tech",
          followers: "156K",
          engagement: "3.8%",
          verified: true,
          topBrand: "Samsung"
        },
        {
          name: "linkedin",
          handle: "mike-chen-tech",
          followers: "78K",
          engagement: "4.3%",
          verified: false,
          topBrand: "Microsoft"
        }
      ]
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      bio: "Lifestyle blogger & wellness coach helping people live their best life",
      location: "Los Angeles, CA",
      image: "/api/placeholder/64/64",
      totalFollowers: "912K",
      avgEngagement: "3.5%",
      languages: ["English", "Portuguese"],
      rating: 4.9,
      niches: ["Lifestyle", "Wellness", "Travel"],
      platforms: [
        {
          name: "instagram",
          handle: "@emmarodriguez",
          followers: "200K",
          engagement: "2.8%",
          verified: true,
          topBrand: "Lululemon"
        },
        {
          name: "youtube",
          handle: "Emma Rodriguez Lifestyle",
          followers: "167K",
          engagement: "3.9%",
          verified: true,
          topBrand: "Headspace"
        },
        {
          name: "tiktok",
          handle: "@emmarodriguezlife",
          followers: "450K",
          engagement: "4.1%",
          verified: true,
          topBrand: "Alo Yoga"
        },
        {
          name: "twitter",
          handle: "@emma_lifestyle",
          followers: "95K",
          engagement: "2.3%",
          verified: false,
          topBrand: null
        }
      ]
    },
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return Instagram;
      case 'youtube': return Youtube;
      case 'twitter': return Twitter;
      case 'linkedin': return Linkedin;
      case 'tiktok': return Users;
      default: return Globe;
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
    <CampaignLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Influencer Discovery
            </h1>
            <p className="text-gray-600">
              Find and add influencers to your campaign
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white shadow-sm border-gray-200">
          <CardContent className="p-6">
            <div className="flex space-x-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search influencers by name, handle, or niche..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {influencers.map((influencer) => (
            <Card 
              key={influencer.id} 
              className="group bg-white shadow-sm border-gray-200 hover:shadow-xl hover:border-gray-300 hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden"
            >
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
                    {influencer.platforms.slice(0, 3).map((platform) => {
                      const IconComponent = getPlatformIcon(platform.name);
                      return (
                        <div key={platform.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r ${getPlatformColor(platform.name)} text-white`}>
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-1">
                                <p className="font-medium text-sm capitalize">{platform.name}</p>
                                {platform.verified && (
                                  <Verified className="h-3 w-3 text-blue-500 fill-current" />
                                )}
                              </div>
                              <p className="text-xs text-gray-600">{platform.handle}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-sm">{platform.followers}</p>
                            <p className="text-xs text-gray-500">{platform.engagement}</p>
                          </div>
                        </div>
                      );
                    })}
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
          ))}
        </div>

        {/* AI Suggestions */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  AI Recommendations
                </h3>
                <p className="text-blue-800 mb-4">
                  Based on your campaign goals, we recommend focusing on micro-influencers 
                  in the fashion niche with high engagement rates and verified social platforms.
                </p>
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                  View Recommendations
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Panel */}
      <AgentPanel agentName="Discovery Agent" agentType="discovery" />
    </CampaignLayout>
  );
};

export default Discovery;
