
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe } from "lucide-react";

const AIRecommendations = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Globe className="h-4 w-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 mb-1">
              AI Recommendations
            </h3>
            <p className="text-xs text-blue-800 mb-2 line-clamp-2">
              Focus on micro-influencers in fashion with high engagement rates and verified platforms.
            </p>
          </div>
          <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100 text-xs px-3 py-1">
            View All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRecommendations;
