
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PaymentStatsProps {
  totalPaid: number;
  totalPending: number;
  totalOverdue: number;
  totalCampaignValue: number;
}

const PaymentStats = ({ totalPaid, totalPending, totalOverdue, totalCampaignValue }: PaymentStatsProps) => {
  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Payment Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Total Paid</span>
          <span className="font-medium text-green-600">
            ${totalPaid.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Pending</span>
          <span className="font-medium text-yellow-600">
            ${totalPending.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Overdue</span>
          <span className="font-medium text-red-600">
            ${totalOverdue.toLocaleString()}
          </span>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Total Campaign Value</span>
          <span className="font-medium">
            ${totalCampaignValue.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentStats;
