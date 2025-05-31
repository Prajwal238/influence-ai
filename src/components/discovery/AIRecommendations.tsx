
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe } from "lucide-react";

const AIRecommendations = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Globe className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              AI Recommendations
            </h3>
            <p className="text-blue-800 mb-4">
              Based on your campaign goals, we recommend focusing on micro-influencers 
              in the fashion niche with high engagement rates and verified social platforms.
            </p>
            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
              View Recommendations
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRecommendations;
