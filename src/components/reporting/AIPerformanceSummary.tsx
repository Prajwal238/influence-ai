
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AIPerformanceSummary = () => {
  return (
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
  );
};

export default AIPerformanceSummary;
