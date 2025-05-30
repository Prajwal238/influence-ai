
import CampaignLayout from "@/components/layout/CampaignLayout";
import AgentPanel from "@/components/agents/AgentPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, MessageSquare, DollarSign, Calendar, Package } from "lucide-react";

const Negotiation = () => {
  const negotiations = [
    {
      id: 1,
      influencer: "Sarah Johnson",
      handle: "@sarahjohnson",
      status: "active",
      lastMessage: "I can do $500 for the Instagram post and story",
      timeAgo: "2 hours ago",
      offer: "$500",
      deliverables: "1 Post + 1 Story"
    },
    {
      id: 2,
      influencer: "Emma Rodriguez", 
      handle: "@emmarodriguez",
      status: "pending",
      lastMessage: "When would you need the content delivered?",
      timeAgo: "1 day ago",
      offer: "$800",
      deliverables: "2 Posts + 3 Stories"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <CampaignLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Negotiations */}
        <div className="space-y-6">
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Active Negotiations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {negotiations.map((nego) => (
                  <div key={nego.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{nego.influencer}</h4>
                        <p className="text-sm text-gray-600">{nego.handle}</p>
                      </div>
                      <Badge className={getStatusColor(nego.status)}>
                        {nego.status}
                      </Badge>
                    </div>
                    
                    <div className="bg-gray-50 rounded p-3 mb-3">
                      <p className="text-sm text-gray-800">{nego.lastMessage}</p>
                      <p className="text-xs text-gray-500 mt-1">{nego.timeAgo}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{nego.offer}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Package className="h-4 w-4 text-gray-400" />
                          <span>{nego.deliverables}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Negotiation Assistant */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-purple-900">
                AI Negotiation Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-800 text-sm mb-4">
                Based on market rates and influencer performance, here are suggested responses:
              </p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full text-left justify-start border-purple-300 text-purple-700">
                  "That sounds reasonable, let's finalize the details"
                </Button>
                <Button variant="outline" size="sm" className="w-full text-left justify-start border-purple-300 text-purple-700">
                  "Could we add a reel for $200 more?"
                </Button>
                <Button variant="outline" size="sm" className="w-full text-left justify-start border-purple-300 text-purple-700">
                  "Our budget is $400, can we meet in the middle?"
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Window */}
        <div>
          <Card className="bg-white shadow-sm border-gray-200 h-[600px] flex flex-col">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Sarah Johnson
                  </CardTitle>
                  <p className="text-sm text-gray-600">@sarahjohnson</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white rounded-lg p-3 max-w-xs">
                    <p className="text-sm">Hi Sarah! We'd love to collaborate with you on our summer campaign. Are you interested?</p>
                    <p className="text-xs opacity-75 mt-1">2:30 PM</p>
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm">Hi! Yes, I'd be interested. What did you have in mind?</p>
                    <p className="text-xs text-gray-500 mt-1">2:45 PM</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white rounded-lg p-3 max-w-xs">
                    <p className="text-sm">We're looking for 1 Instagram post and 1 story featuring our new summer collection. What would your rate be?</p>
                    <p className="text-xs opacity-75 mt-1">3:00 PM</p>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm">I can do $500 for the Instagram post and story. When would you need it by?</p>
                    <p className="text-xs text-gray-500 mt-1">5:30 PM</p>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="border-t border-gray-100 p-4">
                <div className="flex space-x-2">
                  <Input 
                    placeholder="Type your message..." 
                    className="flex-1"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Agent Panel */}
      <AgentPanel agentName="Negotiation Agent" agentType="negotiation" />
    </CampaignLayout>
  );
};

export default Negotiation;
