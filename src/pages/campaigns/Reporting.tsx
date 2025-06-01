import CampaignLayout from "@/components/layout/CampaignLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, Eye, Heart, MessageCircle, Share, DollarSign, CheckCircle } from "lucide-react";
import { useCampaignProgress } from "@/hooks/useCampaignProgress";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Reporting = () => {
  const { id } = useParams();
  const campaignId = id || '';
  const { progress, markCampaignComplete } = useCampaignProgress(campaignId);
  const { toast } = useToast();

  const kpiData = [
    { name: "Total Reach", value: "2.4M", change: "+12%", icon: Eye, color: "blue" },
    { name: "Engagement", value: "186K", change: "+8%", icon: Heart, color: "red" },
    { name: "Comments", value: "12.5K", change: "+15%", icon: MessageCircle, color: "green" },
    { name: "Shares", value: "8.9K", change: "+22%", icon: Share, color: "purple" },
  ];

  const impressionsData = [
    { date: "Jul 1", impressions: 45000, reach: 38000 },
    { date: "Jul 8", impressions: 52000, reach: 45000 },
    { date: "Jul 15", impressions: 67000, reach: 58000 },
    { date: "Jul 22", impressions: 78000, reach: 67000 },
    { date: "Jul 29", impressions: 85000, reach: 72000 },
    { date: "Aug 5", impressions: 92000, reach: 79000 },
  ];

  const engagementData = [
    { platform: "Instagram", likes: 45000, comments: 2300, shares: 1200 },
    { platform: "TikTok", likes: 78000, comments: 4500, shares: 2100 },
    { platform: "YouTube", likes: 23000, comments: 1800, shares: 890 },
  ];

  const getIconColor = (color: string) => {
    switch (color) {
      case "blue": return "text-blue-600";
      case "red": return "text-red-600";
      case "green": return "text-green-600";
      case "purple": return "text-purple-600";
      default: return "text-gray-600";
    }
  };

  const handleMarkComplete = () => {
    markCampaignComplete();
    toast({
      title: "Campaign Completed!",
      description: "Your campaign has been marked as 100% complete.",
    });
  };

  const isCampaignComplete = progress?.isFullyCompleted || false;

  return (
    <CampaignLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Campaign Performance
            </h1>
            <p className="text-gray-600">
              Track and analyze your campaign metrics across all channels
            </p>
          </div>
          
          {/* Campaign Completion Button */}
          {!isCampaignComplete && (
            <Button 
              onClick={handleMarkComplete}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark Campaign Complete
            </Button>
          )}
          
          {isCampaignComplete && (
            <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg">
              <CheckCircle className="h-4 w-4" />
              <span className="font-medium">Campaign Completed</span>
            </div>
          )}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {kpiData.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Card key={kpi.name} className="bg-white shadow-sm border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`h-5 w-5 ${getIconColor(kpi.color)}`} />
                    <Badge variant="outline" className="text-green-700 bg-green-50">
                      {kpi.change}
                    </Badge>
                  </div>
                  <div className="text-2xl font-semibold text-gray-900 mb-1">
                    {kpi.value}
                  </div>
                  <div className="text-sm text-gray-600">{kpi.name}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Reporting Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="impressions">Impressions</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="roi">ROI</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-sm border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Performance Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={impressionsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="impressions" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                        name="Impressions"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="reach" 
                        stroke="#EF4444" 
                        strokeWidth={2}
                        name="Reach"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Platform Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="platform" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="likes" fill="#3B82F6" name="Likes" />
                      <Bar dataKey="comments" fill="#EF4444" name="Comments" />
                      <Bar dataKey="shares" fill="#10B981" name="Shares" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-indigo-900">
                  AI Performance Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-indigo-800 mb-4">
                  Your campaign is performing 18% above industry benchmarks. The content 
                  from Sarah Johnson generated the highest engagement rates, particularly 
                  her Instagram story which had a 4.2% engagement rate.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white bg-opacity-50 rounded-lg p-3">
                    <p className="text-sm text-indigo-700">Top Performer</p>
                    <p className="font-medium text-indigo-900">@sarahjohnson</p>
                  </div>
                  <div className="bg-white bg-opacity-50 rounded-lg p-3">
                    <p className="text-sm text-indigo-700">Best Content Type</p>
                    <p className="font-medium text-indigo-900">Instagram Stories</p>
                  </div>
                  <div className="bg-white bg-opacity-50 rounded-lg p-3">
                    <p className="text-sm text-indigo-700">Peak Engagement Time</p>
                    <p className="font-medium text-indigo-900">7-9 PM EST</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impressions" className="space-y-6">
            <Card className="bg-white shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Impressions & Reach Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={impressionsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="impressions" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      name="Impressions"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="reach" 
                      stroke="#EF4444" 
                      strokeWidth={3}
                      name="Reach"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <Card className="bg-white shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Engagement by Platform
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="platform" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="likes" fill="#3B82F6" name="Likes" />
                    <Bar dataKey="comments" fill="#EF4444" name="Comments" />
                    <Bar dataKey="shares" fill="#10B981" name="Shares" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roi" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white shadow-sm border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-gray-600">Total Investment</span>
                  </div>
                  <div className="text-2xl font-semibold text-gray-900">$1,900</div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-gray-600">Revenue Generated</span>
                  </div>
                  <div className="text-2xl font-semibold text-gray-900">$7,200</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-green-700">ROI</span>
                  </div>
                  <div className="text-2xl font-semibold text-green-900">279%</div>
                  <div className="text-sm text-green-700">3.79x return</div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  ROI Breakdown by Influencer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Sarah Johnson</h4>
                      <p className="text-sm text-gray-600">@sarahjohnson</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">+$2,800</p>
                      <p className="text-sm text-gray-600">560% ROI</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Emma Rodriguez</h4>
                      <p className="text-sm text-gray-600">@emmarodriguez</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">+$3,200</p>
                      <p className="text-sm text-gray-600">400% ROI</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Mike Chen</h4>
                      <p className="text-sm text-gray-600">@mikechen</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">+$1,200</p>
                      <p className="text-sm text-gray-600">200% ROI</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CampaignLayout>
  );
};

export default Reporting;
