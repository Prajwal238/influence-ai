
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/layout/Navigation";
import { Users, Activity, AlertCircle, CheckCircle, Settings, Database } from "lucide-react";

const Admin = () => {
  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john@company.com",
      role: "Campaign Manager",
      status: "active",
      lastLogin: "2 hours ago"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@company.com", 
      role: "Admin",
      status: "active",
      lastLogin: "1 day ago"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@company.com",
      role: "Viewer",
      status: "inactive",
      lastLogin: "1 week ago"
    },
  ];

  const systemHealth = [
    { metric: "API Response Time", value: "142ms", status: "good" },
    { metric: "Database Performance", value: "98%", status: "good" },
    { metric: "AI Processing Queue", value: "3 pending", status: "warning" },
    { metric: "Payment System", value: "Operational", status: "good" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getHealthIcon = (status: string) => {
    switch (status) {
      case "good": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning": return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "error": return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage users, monitor system health, and configure platform settings
          </p>
        </div>

        {/* System Health Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {systemHealth.map((health, index) => (
            <Card key={index} className="bg-white shadow-sm border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  {getHealthIcon(health.status)}
                  <span className="text-2xl font-semibold text-gray-900">
                    {health.value}
                  </span>
                </div>
                <div className="text-sm text-gray-600">{health.metric}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Management */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-sm border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    User Management
                  </CardTitle>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Users className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant="outline">{user.role}</Badge>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500">Last login: {user.lastLogin}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="bg-white shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                  <Settings className="h-4 w-4 mr-2" />
                  System Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Database className="h-4 w-4 mr-2" />
                  Database Backup
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="h-4 w-4 mr-2" />
                  View Logs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  User Analytics
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Platform Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Users</span>
                  <span className="font-medium">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active Campaigns</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Influencers</span>
                  <span className="font-medium">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Monthly Revenue</span>
                  <span className="font-medium">$45,200</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-red-900">
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-800">3 payments require attention</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-yellow-800">Database backup overdue</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
