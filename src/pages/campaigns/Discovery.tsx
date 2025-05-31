
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import CampaignLayout from "@/components/layout/CampaignLayout";
import AgentPanel from "@/components/agents/AgentPanel";
import { Search, Filter, Plus, Users, Heart, Eye, Instagram, Globe, MessageSquare, Verified, ExternalLink } from "lucide-react";

const Discovery = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const influencers = [
    {
      id: 1,
      name: "Sarah Johnson",
      handle: "@sarahjohnson",
      followers: "125K",
      engagement: "3.2%",
      niche: "Fashion",
      image: "/api/placeholder/64/64",
      isVerified: true,
      bio: "Fashion enthusiast & lifestyle creator",
      location: "New York, NY",
      socialHandles: {
        instagram: { handle: "@sarahjohnson", followers: "125K", verified: true },
        twitter: { handle: "@sarah_j_fashion", followers: "45K", verified: false },
        tiktok: { handle: "@sarahjohnsonofficial", followers: "300K", verified: true },
        youtube: { handle: "Sarah Johnson Fashion", followers: "89K", verified: false }
      }
    },
    {
      id: 2,
      name: "Mike Chen",
      handle: "@mikechen",
      followers: "89K",
      engagement: "4.1%",
      niche: "Tech",
      image: "/api/placeholder/64/64",
      isVerified: false,
      bio: "Tech reviewer & software engineer",
      location: "San Francisco, CA",
      socialHandles: {
        instagram: { handle: "@mikechen", followers: "89K", verified: false },
        twitter: { handle: "@mikechen_tech", followers: "156K", verified: true },
        linkedin: { handle: "mike-chen-tech", followers: "78K", verified: false }
      }
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      handle: "@emmarodriguez",
      followers: "200K",
      engagement: "2.8%",
      niche: "Lifestyle",
      image: "/api/placeholder/64/64",
      isVerified: true,
      bio: "Lifestyle blogger & wellness coach",
      location: "Los Angeles, CA",
      socialHandles: {
        instagram: { handle: "@emmarodriguez", followers: "200K", verified: true },
        twitter: { handle: "@emma_lifestyle", followers: "95K", verified: false },
        tiktok: { handle: "@emmarodriguezlife", followers: "450K", verified: true },
        youtube: { handle: "Emma Rodriguez Lifestyle", followers: "167K", verified: true }
      }
    },
  ];

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="h-3.5 w-3.5" />;
      case 'twitter': return <MessageSquare className="h-3.5 w-3.5" />;
      case 'tiktok': return <Users className="h-3.5 w-3.5" />;
      case 'youtube': return <Globe className="h-3.5 w-3.5" />;
      case 'linkedin': return <Globe className="h-3.5 w-3.5" />;
      default: return <Globe className="h-3.5 w-3.5" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'twitter': return 'bg-blue-500';
      case 'tiktok': return 'bg-black';
      case 'youtube': return 'bg-red-500';
      case 'linkedin': return 'bg-blue-700';
      default: return 'bg-gray-500';
    }
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {influencers.map((influencer) => (
            <Card key={influencer.id} className="group bg-white shadow-sm border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200 overflow-hidden">
              <CardContent className="p-0">
                {/* Header with Avatar and Basic Info */}
                <div className="p-5 pb-4">
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-gray-400" />
                      </div>
                      {influencer.isVerified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <Verified className="h-3 w-3 text-white fill-current" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{influencer.name}</h3>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{influencer.handle}</p>
                      <p className="text-xs text-gray-600 line-clamp-2">{influencer.bio}</p>
                    </div>
                  </div>
                </div>

                {/* Social Platforms Row */}
                <div className="px-5 pb-4">
                  <div className="flex items-center space-x-2">
                    {Object.entries(influencer.socialHandles).slice(0, 4).map(([platform, data]) => (
                      <HoverCard key={platform}>
                        <HoverCardTrigger asChild>
                          <div className={`relative flex items-center justify-center w-8 h-8 rounded-lg ${getPlatformColor(platform)} cursor-pointer hover:scale-105 transition-transform duration-150`}>
                            {getSocialIcon(platform)}
                            {data.verified && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                                <Verified className="h-2 w-2 text-blue-500 fill-current" />
                              </div>
                            )}
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-64 p-3" side="top">
                          <div className="flex items-center space-x-3">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${getPlatformColor(platform)}`}>
                              {getSocialIcon(platform)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-1">
                                <p className="font-medium text-sm capitalize">{platform}</p>
                                {data.verified && (
                                  <Verified className="h-3 w-3 text-blue-500 fill-current" />
                                )}
                              </div>
                              <p className="text-xs text-gray-600">{data.handle}</p>
                              <p className="text-xs text-gray-500">{data.followers} followers</p>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                    {Object.keys(influencer.socialHandles).length > 4 && (
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-500 text-xs font-medium">
                        +{Object.keys(influencer.socialHandles).length - 4}
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="px-5 pb-4 border-t border-gray-50 pt-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{influencer.followers}</p>
                      <p className="text-xs text-gray-500">Followers</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{influencer.engagement}</p>
                      <p className="text-xs text-gray-500">Engagement</p>
                    </div>
                    <div>
                      <Badge variant="secondary" className="text-xs px-2 py-1">{influencer.niche}</Badge>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-5 pb-5">
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          View Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-gray-400" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span>{influencer.name}</span>
                                {influencer.isVerified && (
                                  <Verified className="h-4 w-4 text-blue-500 fill-current" />
                                )}
                              </div>
                              <p className="text-sm text-gray-500 font-normal">{influencer.location}</p>
                            </div>
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p className="text-sm text-gray-600">{influencer.bio}</p>
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm">Social Platforms</h4>
                            {Object.entries(influencer.socialHandles).map(([platform, data]) => (
                              <div key={platform} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                <div className="flex items-center space-x-3">
                                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${getPlatformColor(platform)}`}>
                                    {getSocialIcon(platform)}
                                  </div>
                                  <div>
                                    <div className="flex items-center space-x-2">
                                      <p className="font-medium capitalize text-sm">{platform}</p>
                                      {data.verified && (
                                        <Verified className="h-3 w-3 text-blue-500 fill-current" />
                                      )}
                                    </div>
                                    <p className="text-xs text-gray-600">{data.handle} • {data.followers}</p>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <ExternalLink className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" className="flex-1 h-8 text-xs bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-3 w-3 mr-1" />
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
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-900">
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-800 mb-4">
              Based on your campaign goals, we recommend focusing on micro-influencers 
              in the fashion niche with high engagement rates.
            </p>
            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
              View Recommendations
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Agent Panel */}
      <AgentPanel agentName="Discovery Agent" agentType="discovery" />
    </CampaignLayout>
  );
};

export default Discovery;
