import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContractData } from "@/types/contract";

interface ContractPreviewProps {
  contract: ContractData;
}

export const ContractPreview = ({ contract }: ContractPreviewProps) => {
  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Contract Preview - {contract.influencer.name}
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
                This agreement is between ABC ("Company") and {contract.influencer.name} ("Influencer").
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">2. INFLUENCER DETAILS</h4>
              <ul className="text-gray-700 ml-4 list-disc">
                <li>Name: {contract.influencer.name}</li>
                <li>Location: {contract.influencer.location}</li>
                <li>Total Followers: {contract.influencer.totalFollowers}</li>
                <li>Engagement Rate: {contract.influencer.avgEngagement}</li>
                <li>Platforms: {contract.influencer.platforms.map(p => p.name).join(", ")}</li>
                <li>Niches: {contract.influencer.niches.join(", ")}</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">3. DELIVERABLES</h4>
              <ul className="text-gray-700 ml-4 list-disc">
                <li>{contract.deliverables}</li>
                <li>Content to be delivered by {contract.deadline}</li>
                <li>Content must feature summer collection products</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">4. COMPENSATION & TERMS</h4>
              <p className="text-gray-700 mb-2">
                Total compensation: {contract.value}, to be paid within 30 days of content delivery.
              </p>
              {contract.negotiationTerms && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mt-2">
                  <p className="text-blue-800 text-sm">
                    <strong>Negotiated Terms:</strong> {contract.negotiationTerms}
                  </p>
                </div>
              )}
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
                <div className="border-b border-gray-400 h-8 relative">
                  <div className="absolute bottom-2 left-0 text-gray-500 italic font-signature text-lg">
                    ABC
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Authorized Signatory</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Influencer Signature</p>
                <div className="border-b border-gray-400 h-8"></div>
                <p className="text-xs text-gray-500 mt-1">{contract.influencer.name}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
