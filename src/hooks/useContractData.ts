
import { useState, useEffect } from "react";
import { ContractData } from "@/types/contract";
import { useInfluencerData } from "@/hooks/useInfluencerData";
import { useContractAPI, APIContractData } from "@/hooks/useContractAPI";

export const useContractData = () => {
  const { campaignInfluencers, loading: influencersLoading } = useInfluencerData();
  const { apiContracts, loading: contractsLoading, error } = useContractAPI();
  const [contracts, setContracts] = useState<ContractData[]>([]);
  const [selectedContract, setSelectedContract] = useState<ContractData | null>(null);

  const loading = influencersLoading || contractsLoading;

  // Convert API contracts to ContractData format
  const convertAPIContractToContractData = (apiContract: APIContractData): ContractData | null => {
    // Find the influencer data for this contract
    const influencer = campaignInfluencers.find(inf => inf.name === apiContract.influencerName);
    
    if (!influencer) {
      console.warn(`Influencer ${apiContract.influencerName} not found for contract ${apiContract._id}`);
      return null;
    }

    // Map contract status
    const statusMap: Record<string, "signed" | "pending" | "draft"> = {
      'signed': 'signed',
      'tobesigned': 'pending',
      'pending': 'pending',
      'draft': 'draft'
    };

    const status = statusMap[apiContract.contractStatus] || 'draft';

    // Extract value from negotiation terms (basic parsing)
    const valueMatch = apiContract.negotiationTerms.match(/(\d+(?:,\d+)*)\s*(?:thousand\s+)?rupees?/i);
    let value = "$500"; // default fallback
    
    if (valueMatch) {
      const amount = parseInt(valueMatch[1].replace(/,/g, ''));
      const isThousand = apiContract.negotiationTerms.toLowerCase().includes('thousand');
      const finalAmount = isThousand ? amount * 1000 : amount;
      value = `₹${finalAmount.toLocaleString()}`;
    }

    // Extract deliverables from negotiation terms
    let deliverables = "1 Post + 1 Story";
    if (apiContract.negotiationTerms.toLowerCase().includes('youtube')) {
      deliverables += " + 1 YouTube Video";
    }
    if (apiContract.negotiationTerms.toLowerCase().includes('reel')) {
      deliverables += " + Instagram Reels";
    }

    return {
      id: apiContract._id,
      influencer,
      status,
      deliverables,
      value,
      deadline: "Aug 25, 2024",
      signedDate: status === "signed" ? new Date(apiContract.updatedAt).toLocaleDateString() : undefined,
      sentDate: status === "pending" ? new Date(apiContract.createdAt).toLocaleDateString() : undefined,
      negotiationTerms: apiContract.negotiationTerms,
    };
  };

  // Generate contract data from API contracts or fallback to generated data
  useEffect(() => {
    if (apiContracts.length > 0) {
      console.log('Using API contracts data');
      const convertedContracts = apiContracts
        .map(convertAPIContractToContractData)
        .filter(contract => contract !== null) as ContractData[];
      
      setContracts(convertedContracts);
      
      // Set first contract as selected by default
      if (convertedContracts.length > 0) {
        setSelectedContract(convertedContracts[0]);
      }
    } else if (campaignInfluencers.length > 0 && !contractsLoading) {
      console.log('Using generated contracts data as fallback');
      // Fallback to generated contract data when no API contracts are available
      const generatedContracts: ContractData[] = campaignInfluencers.map((influencer, index) => {
        const statuses: Array<"signed" | "pending" | "draft"> = ["signed", "pending", "draft"];
        const status = statuses[index % 3];
        
        const platforms = influencer.platforms.map(p => p.name).join(", ");
        const deliverables = `1 Post + 1 Story on ${platforms}`;
        
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
      
      if (generatedContracts.length > 0) {
        setSelectedContract(generatedContracts[0]);
      }
    }
  }, [apiContracts, campaignInfluencers, contractsLoading]);

  const handleViewContract = (contract: ContractData) => {
    setSelectedContract(contract);
  };

  return {
    contracts,
    selectedContract,
    loading,
    error,
    handleViewContract,
  };
};
