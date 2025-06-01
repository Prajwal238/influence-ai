
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContractData } from "@/types/contract";

interface ContractStatsProps {
  contracts: ContractData[];
}

export const ContractStats = ({ contracts }: ContractStatsProps) => {
  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Contract Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Total Contracts</span>
          <span className="font-medium">{contracts.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Signed</span>
          <span className="font-medium text-green-600">
            {contracts.filter(c => c.status === "signed").length}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Pending</span>
          <span className="font-medium text-yellow-600">
            {contracts.filter(c => c.status === "pending").length}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Draft</span>
          <span className="font-medium text-gray-600">
            {contracts.filter(c => c.status === "draft").length}
          </span>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Total Value</span>
          <span className="font-medium">
            ${contracts.reduce((sum, c) => sum + parseInt(c.value.replace('$', '')), 0)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
