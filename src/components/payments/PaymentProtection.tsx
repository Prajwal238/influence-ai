
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PaymentProtection = () => {
  return (
    <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-yellow-900">
          Payment Protection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-yellow-800 text-sm mb-3">
          All payments are secured with escrow protection until content delivery is confirmed.
        </p>
        <Button variant="outline" size="sm" className="border-yellow-300 text-yellow-700">
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentProtection;
