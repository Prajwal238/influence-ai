
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { DollarSign, TrendingUp } from "lucide-react";

interface ReportingChartsProps {
  impressionsData: any[];
  engagementData: any[];
}

const ReportingCharts = ({ impressionsData, engagementData }: ReportingChartsProps) => {
  return {
    OverviewCharts: () => (
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
    ),

    ImpressionsChart: () => (
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
    ),

    EngagementChart: () => (
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
    ),

    ROISection: () => (
      <>
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
      </>
    )
  };
};

export default ReportingCharts;
