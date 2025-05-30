
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CampaignLayout from "@/components/layout/CampaignLayout";
import AgentPanel from "@/components/agents/AgentPanel";
import { Search, Filter, Plus, Users, Heart, Eye, Instagram, Globe, MessageSquare } from "lucide-react";

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
      socialHandles: {
        instagram: "@sarahjohnson",
        twitter: "@sarah_j_fashion",
        tiktok: "@sarahjohnsonofficial",
        youtube: "Sarah Johnson Fashion"
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
      socialHandles: {
        instagram: "@mikechen",
        twitter: "@mikechen_tech",
        linkedin: "mike-chen-tech"
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
      socialHandles: {
        instagram: "@emmarodriguez",
        twitter: "@emma_lifestyle",
        tiktok: "@emmarodriguezlife",
        youtube: "Emma Rodriguez Lifestyle"
      }
    },
  ];

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="h-4 w-4" />;
      case 'twitter': return <MessageSquare className="h-4 w-4" />;
      case 'tiktok': return <Users className="h-4 w-4" />;
      case 'youtube': return <Globe className="h-4 w-4" />;
      case 'linkedin': return <Globe className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
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
            <Card key={influencer.id} className="bg-white shadow-sm border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{influencer.name}</h3>
                      {influencer.isVerified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{influencer.handle}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Followers</span>
                    <span className="font-medium">{influencer.followers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Engagement</span>
                    <span className="font-medium">{influencer.engagement}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Niche</span>
                    <Badge variant="secondary">{influencer.niche}</Badge>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>{influencer.name}'s Social Handles</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3">
                        {Object.entries(influencer.socialHandles).map(([platform, handle]) => (
                          <div key={platform} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                            {getSocialIcon(platform)}
                            <div>
                              <p className="font-medium capitalize">{platform}</p>
                              <p className="text-sm text-gray-600">{handle}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
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
