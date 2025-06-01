
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";

const PaymentMethods = () => {
  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Payment Methods
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <CreditCard className="h-5 w-5 text-gray-400" />
            <div>
              <p className="font-medium text-sm">•••• 4242</p>
              <p className="text-xs text-gray-600">Expires 12/25</p>
            </div>
          </div>
          <Badge variant="outline">Primary</Badge>
        </div>
        <Button variant="outline" className="w-full">
          Add Payment Method
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentMethods;
