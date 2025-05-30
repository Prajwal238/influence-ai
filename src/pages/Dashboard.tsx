
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/layout/Navigation";
import { Plus, Search, Filter, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const campaigns = [
    {
      id: "1",
      name: "Summer Fashion 2024",
      stage: "Discovery",
      progress: 25,
      lastUpdated: "2 hours ago",
      status: "active"
    },
    {
      id: "2", 
      name: "Tech Product Launch",
      stage: "Outreach",
      progress: 45,
      lastUpdated: "1 day ago",
      status: "active"
    },
    {
      id: "3",
      name: "Fitness Brand Collaboration",
      stage: "Negotiation",
      progress: 70,
      lastUpdated: "3 hours ago",
      status: "active"
    },
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Discovery": return "bg-blue-100 text-blue-800";
      case "Outreach": return "bg-yellow-100 text-yellow-800";
      case "Negotiation": return "bg-purple-100 text-purple-800";
      case "Contracts": return "bg-orange-100 text-orange-800";
      case "Payments": return "bg-green-100 text-green-800";
      case "Reporting": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                Welcome back to FlowAI
              </h1>
              <p className="text-gray-600">
                Manage your influencer campaigns with AI-powered automation
              </p>
            </div>
            <Link to="/dashboard/new-campaign/step-1">
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-sm">
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </Link>
          </div>

          {/* Search and Filter */}
          <div className="flex space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search campaigns..." 
                className="pl-10 bg-white border-gray-200"
              />
            </div>
            <Button variant="outline" className="border-gray-200">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-sm border-gray-200">
            <CardContent className="p-6">
              <div className="text-2xl font-semibold text-gray-900 mb-1">12</div>
              <div className="text-sm text-gray-600">Active Campaigns</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-gray-200">
            <CardContent className="p-6">
              <div className="text-2xl font-semibold text-gray-900 mb-1">87%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-gray-200">
            <CardContent className="p-6">
              <div className="text-2xl font-semibold text-gray-900 mb-1">2.4M</div>
              <div className="text-sm text-gray-600">Total Reach</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-gray-200">
            <CardContent className="p-6">
              <div className="text-2xl font-semibold text-gray-900 mb-1">$47K</div>
              <div className="text-sm text-gray-600">Revenue Generated</div>
            </CardContent>
          </Card>
        </div>

        {/* Campaigns List */}
        <Card className="bg-white shadow-sm border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Active Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div 
                  key={campaign.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                      <Badge className={getStageColor(campaign.stage)}>
                        {campaign.stage}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{campaign.progress}% Complete</span>
                      <span>•</span>
                      <span>Updated {campaign.lastUpdated}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${campaign.progress}%` }}
                      ></div>
                    </div>
                    <Link to={`/campaigns/${campaign.id}/discovery`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
