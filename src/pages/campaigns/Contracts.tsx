
import CampaignLayout from "@/components/layout/CampaignLayout";
import { ContractList } from "@/components/contracts/ContractList";
import { ContractPreview } from "@/components/contracts/ContractPreview";
import { ContractStats } from "@/components/contracts/ContractStats";
import { ContractQuickActions } from "@/components/contracts/ContractQuickActions";
import { ContractLegalCompliance } from "@/components/contracts/ContractLegalCompliance";
import { useContractData } from "@/hooks/useContractData";

const Contracts = () => {
  const { contracts, selectedContract, loading, handleViewContract } = useContractData();

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
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contract List */}
          <ContractList 
            contracts={contracts}
            selectedContract={selectedContract}
            onViewContract={handleViewContract}
          />

          {/* Contract Preview - moved here */}
          {selectedContract && (
            <ContractPreview contract={selectedContract} />
          )}
        </div>

        {/* Sidebar - Quick Actions & Stats */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <ContractQuickActions />

          {/* Contract Stats */}
          <ContractStats contracts={contracts} />

          {/* Legal Compliance */}
          <ContractLegalCompliance />
        </div>
      </div>
    </CampaignLayout>
  );
};

export default Contracts;
