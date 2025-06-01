
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ContractLegalCompliance = () => {
  return (
    <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-green-900">
          Legal Compliance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-green-800 text-sm mb-3">
          All contracts include FTC disclosure requirements and platform-specific guidelines.
        </p>
        <Button variant="outline" size="sm" className="border-green-300 text-green-700">
          Review Guidelines
        </Button>
      </CardContent>
    </Card>
  );
};
