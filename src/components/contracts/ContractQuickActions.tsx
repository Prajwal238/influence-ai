
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

export const ContractQuickActions = () => {
  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          <FileText className="h-4 w-4 mr-2" />
          New Contract
        </Button>
        <Button variant="outline" className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Bulk Download
        </Button>
        <Button variant="outline" className="w-full">
          Template Settings
        </Button>
      </CardContent>
    </Card>
  );
};
