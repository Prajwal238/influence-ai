
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OutreachStats = () => {
  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Quick Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Messages Sent</span>
            <span className="font-medium">24</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Reply Rate</span>
            <span className="font-medium">67%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Positive Responses</span>
            <span className="font-medium">14</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutreachStats;
