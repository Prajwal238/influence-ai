
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, Instagram, Mail, Phone } from "lucide-react";

interface BulkMessagingProgressProps {
  isActive: boolean;
  progress: number;
  completed: number;
  total: number;
  platformBreakdown: {
    instagram: { sent: number; total: number };
    email: { sent: number; total: number };
    whatsapp: { sent: number; total: number };
  };
}

const BulkMessagingProgress = ({ 
  isActive, 
  progress, 
  completed, 
  total, 
  platformBreakdown 
}: BulkMessagingProgressProps) => {
  if (!isActive) return null;

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram": return <Instagram className="h-3 w-3" />;
      case "email": return <Mail className="h-3 w-3" />;
      case "whatsapp": return <Phone className="h-3 w-3" />;
      default: return null;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "instagram": return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
      case "email": return "bg-blue-500 text-white";
      case "whatsapp": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-blue-900 flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Bulk Messaging in Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div>
          <div className="flex justify-between text-sm text-blue-800 mb-2">
            <span>Overall Progress</span>
            <span>{completed}/{total} sent</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Platform Breakdown */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-blue-900">Platform Breakdown</h4>
          {Object.entries(platformBreakdown).map(([platform, stats]) => (
            stats.total > 0 && (
              <div key={platform} className="flex items-center justify-between p-2 bg-white rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(platform)}`}>
                    {getPlatformIcon(platform)}
                    <span className="capitalize">{platform}</span>
                  </div>
                  <span className="text-sm text-gray-600">{stats.sent}/{stats.total}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {stats.sent === stats.total ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
              </div>
            )
          ))}
        </div>

        {/* Status */}
        <div className="flex items-center space-x-2 p-2 bg-white rounded-lg">
          <AlertCircle className="h-4 w-4 text-blue-500" />
          <span className="text-sm text-blue-800">
            Messages are being sent with AI personalization for each influencer
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkMessagingProgress;
