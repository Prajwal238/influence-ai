
import { useState, useEffect } from "react";
import CampaignLayout from "@/components/layout/CampaignLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Send, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useInfluencerData } from "@/hooks/useInfluencerData";
import { Influencer } from "@/types/influencer";

interface ContractData {
  id: string;
  influencer: Influencer;
  status: "signed" | "pending" | "draft";
  deliverables: string;
  value: string;
  deadline: string;
  signedDate?: string;
  sentDate?: string;
}

const Contracts = () => {
  const { campaignInfluencers, loading } = useInfluencerData();
  const [contracts, setContracts] = useState<ContractData[]>([]);
  const [selectedContract, setSelectedContract] = useState<ContractData | null>(null);

  // Generate contract data from campaign influencers
  useEffect(() => {
    if (campaignInfluencers.length > 0) {
      const generatedContracts: ContractData[] = campaignInfluencers.map((influencer, index) => {
        const statuses: Array<"signed" | "pending" | "draft"> = ["signed", "pending", "draft"];
        const status = statuses[index % 3];
        
        // Generate deliverables based on platforms
        const platforms = influencer.platforms.map(p => p.name).join(", ");
        const deliverables = `1 Post + 1 Story on ${platforms}`;
        
        // Generate value based on follower count
        const totalFollowers = parseInt(influencer.totalFollowers.replace(/[^\d]/g, ''));
        const baseRate = Math.max(200, Math.min(1000, totalFollowers / 1000));
        const value = `$${Math.round(baseRate)}`;

        return {
          id: influencer.apiId,
          influencer,
          status,
          deliverables,
          value,
          deadline: "Aug 25, 2024",
          signedDate: status === "signed" ? "Jul 28, 2024" : undefined,
          sentDate: status === "pending" ? "Jul 30, 2024" : undefined,
        };
      });

      setContracts(generatedContracts);
      
      // Set first contract as selected by default
      if (generatedContracts.length > 0) {
        setSelectedContract(generatedContracts[0]);
      }
    }
  }, [campaignInfluencers]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "signed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "draft": return <AlertCircle className="h-4 w-4 text-gray-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "signed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewContract = (contract: ContractData) => {
    setSelectedContract(contract);
  };

  if (loading) {
    return (
      <CampaignLayout>
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">Loading contracts...</p>
        </div>
      </CampaignLayout>
    );
  }

  if (contracts.length === 0) {
    return (
      <CampaignLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-gray-500 mb-4">No influencers found in this campaign</p>
            <p className="text-sm text-gray-400">Add influencers to the campaign to generate contracts</p>
          </div>
        </div>
      </CampaignLayout>
    );
  }

  return (
    <CampaignLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contract List */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Campaign Contracts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contracts.map((contract) => (
                  <div 
                    key={contract.id} 
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedContract?.id === contract.id 
                        ? 'border-blue-300 bg-blue-50' 
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                    onClick={() => handleViewContract(contract)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(contract.status)}
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
                          handleViewContract(contract);
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
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contract Preview & Quick Actions */}
        <div className="space-y-6">
          {/* Contract Preview */}
          {selectedContract && (
            <Card className="bg-white shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Contract Preview - {selectedContract.influencer.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 min-h-[400px] max-h-[500px] overflow-y-auto">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      INFLUENCER COLLABORATION AGREEMENT
                    </h3>
                    <p className="text-gray-600">Campaign: Summer Fashion 2024</p>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">1. PARTIES</h4>
                      <p className="text-gray-700">
                        This agreement is between FlowAI Brand ("Company") and {selectedContract.influencer.name} ("Influencer").
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">2. INFLUENCER DETAILS</h4>
                      <ul className="text-gray-700 ml-4 list-disc">
                        <li>Name: {selectedContract.influencer.name}</li>
                        <li>Location: {selectedContract.influencer.location}</li>
                        <li>Total Followers: {selectedContract.influencer.totalFollowers}</li>
                        <li>Engagement Rate: {selectedContract.influencer.avgEngagement}</li>
                        <li>Platforms: {selectedContract.influencer.platforms.map(p => p.name).join(", ")}</li>
                        <li>Niches: {selectedContract.influencer.niches.join(", ")}</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">3. DELIVERABLES</h4>
                      <ul className="text-gray-700 ml-4 list-disc">
                        <li>{selectedContract.deliverables}</li>
                        <li>Content to be delivered by {selectedContract.deadline}</li>
                        <li>Content must feature summer collection products</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">4. COMPENSATION</h4>
                      <p className="text-gray-700">
                        Total compensation: {selectedContract.value} USD, to be paid within 30 days of content delivery.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">5. CONTENT REQUIREMENTS</h4>
                      <ul className="text-gray-700 ml-4 list-disc">
                        <li>Content must align with brand guidelines</li>
                        <li>Include specified hashtags and mentions</li>
                        <li>Content approval required before posting</li>
                        <li>Must include FTC disclosure as required by law</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-300">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Company Signature</p>
                        <div className="border-b border-gray-400 h-8"></div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Influencer Signature</p>
                        <div className="border-b border-gray-400 h-8"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
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

          {/* Contract Stats */}
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

          {/* Legal Compliance */}
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
        </div>
      </div>
    </CampaignLayout>
  );
};

export default Contracts;
