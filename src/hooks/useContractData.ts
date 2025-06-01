
import { useState, useEffect } from "react";
import { ContractData } from "@/types/contract";
import { useInfluencerData } from "@/hooks/useInfluencerData";

export const useContractData = () => {
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

  const handleViewContract = (contract: ContractData) => {
    setSelectedContract(contract);
  };

  return {
    contracts,
    selectedContract,
    loading,
    handleViewContract,
  };
};
