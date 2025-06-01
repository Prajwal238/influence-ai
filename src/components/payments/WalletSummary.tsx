
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, CreditCard } from "lucide-react";

interface WalletSummaryProps {
  availableBalance: number;
  pendingPayments: number;
}

const WalletSummary = ({ availableBalance, pendingPayments }: WalletSummaryProps) => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Wallet className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-lg font-semibold text-blue-900">
            Wallet Summary
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-blue-700">Available Balance</p>
          <p className="text-2xl font-semibold text-blue-900">
            ${availableBalance.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-blue-700">Pending Payments</p>
          <p className="text-xl font-medium text-blue-800">
            ${pendingPayments.toLocaleString()}
          </p>
        </div>
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          <CreditCard className="h-4 w-4 mr-2" />
          Add Funds
        </Button>
      </CardContent>
    </Card>
  );
};

export default WalletSummary;
