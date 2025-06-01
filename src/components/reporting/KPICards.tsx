
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart, MessageCircle, Share } from "lucide-react";

const KPICards = () => {
  const kpiData = [
    { name: "Total Reach", value: "2.4M", change: "+12%", icon: Eye, color: "blue" },
    { name: "Engagement", value: "186K", change: "+8%", icon: Heart, color: "red" },
    { name: "Comments", value: "12.5K", change: "+15%", icon: MessageCircle, color: "green" },
    { name: "Shares", value: "8.9K", change: "+22%", icon: Share, color: "purple" },
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

  return (
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
  );
};

export default KPICards;
