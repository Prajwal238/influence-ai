
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Send } from "lucide-react";
import { ContractData } from "@/types/contract";
import { getStatusIcon, getStatusColor } from "@/utils/contractUtils";

interface ContractListProps {
  contracts: ContractData[];
  selectedContract: ContractData | null;
  onViewContract: (contract: ContractData) => void;
}

export const ContractList = ({ contracts, selectedContract, onViewContract }: ContractListProps) => {
  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          Campaign Contracts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contracts.map((contract) => {
            const StatusIcon = getStatusIcon(contract.status);
            
            return (
              <div 
                key={contract.id} 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedContract?.id === contract.id 
                    ? 'border-blue-300 bg-blue-50' 
                    : 'border-gray-100 hover:border-gray-200'
                }`}
                onClick={() => onViewContract(contract)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <StatusIcon className="h-4 w-4 text-green-500" />
                    <div>
                      <h4 className="font-medium text-gray-900">{contract.influencer.name}</h4>
                      <p className="text-sm text-gray-600">
                        {contract.influencer.platforms[0]?.handle || '@' + contract.influencer.name.toLowerCase().replace(' ', '')}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(contract.status)}>
                    {contract.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-600">Value</span>
                    <p className="font-medium">{contract.value}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Deliverables</span>
                    <p className="font-medium">{contract.deliverables}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Deadline</span>
                    <p className="font-medium">{contract.deadline}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      {contract.status === "signed" ? "Signed" : "Status"}
                    </span>
                    <p className="font-medium">
                      {contract.status === "signed" ? contract.signedDate : 
                       contract.status === "pending" ? `Sent ${contract.sentDate}` :
                       "Draft"}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewContract(contract);
                    }}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  {contract.status === "draft" && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Send className="h-4 w-4 mr-1" />
                      Send
                    </Button>
                  )}
                  {contract.status === "pending" && (
                    <Button variant="outline" size="sm">
                      Resend
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
