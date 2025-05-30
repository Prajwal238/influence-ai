
import CampaignLayout from "@/components/layout/CampaignLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Send, CheckCircle, Clock, AlertCircle } from "lucide-react";

const Contracts = () => {
  const contracts = [
    {
      id: 1,
      influencer: "Sarah Johnson",
      handle: "@sarahjohnson",
      status: "signed",
      deliverables: "1 Post + 1 Story",
      value: "$500",
      deadline: "Aug 15, 2024",
      signedDate: "Jul 28, 2024"
    },
    {
      id: 2,
      influencer: "Emma Rodriguez",
      handle: "@emmarodriguez", 
      status: "pending",
      deliverables: "2 Posts + 3 Stories",
      value: "$800",
      deadline: "Aug 20, 2024",
      sentDate: "Jul 30, 2024"
    },
    {
      id: 3,
      influencer: "Mike Chen",
      handle: "@mikechen",
      status: "draft",
      deliverables: "1 Reel + 2 Stories",
      value: "$600",
      deadline: "Aug 25, 2024"
    },
  ];

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
                  <div key={contract.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(contract.status)}
                        <div>
                          <h4 className="font-medium text-gray-900">{contract.influencer}</h4>
                          <p className="text-sm text-gray-600">{contract.handle}</p>
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
                      <Button variant="outline" size="sm">
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

          {/* Contract Template */}
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Contract Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 min-h-[400px]">
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
                      This agreement is between FlowAI Brand ("Company") and Sarah Johnson ("Influencer").
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">2. DELIVERABLES</h4>
                    <ul className="text-gray-700 ml-4 list-disc">
                      <li>1 Instagram post featuring summer collection</li>
                      <li>1 Instagram story with product tags</li>
                      <li>Content to be delivered by August 15, 2024</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">3. COMPENSATION</h4>
                    <p className="text-gray-700">
                      Total compensation: $500 USD, to be paid within 30 days of content delivery.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">4. CONTENT REQUIREMENTS</h4>
                    <ul className="text-gray-700 ml-4 list-disc">
                      <li>Content must align with brand guidelines</li>
                      <li>Include specified hashtags and mentions</li>
                      <li>Content approval required before posting</li>
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
        </div>

        {/* Quick Actions & Stats */}
        <div className="space-y-6">
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

          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Contract Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Contracts</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Signed</span>
                <span className="font-medium text-green-600">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="font-medium text-yellow-600">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Draft</span>
                <span className="font-medium text-gray-600">1</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Value</span>
                <span className="font-medium">$1,900</span>
              </div>
            </CardContent>
          </Card>

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
