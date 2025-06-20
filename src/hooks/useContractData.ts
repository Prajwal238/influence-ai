
import { useState, useEffect } from "react";
import { ContractData } from "@/types/contract";
import { useInfluencerData } from "@/hooks/useInfluencerData";
import { useContractAPI, APIContractData } from "@/hooks/useContractAPI";

// Create a default influencer structure for contracts without matching influencer data
const createDefaultInfluencer = (name: string) => ({
  apiId: name.toLowerCase().replace(/\s+/g, '_'),
  name: name,
  location: "Unknown",
  bio: `${name} - Contract participant`,
  totalFollowers: "N/A",
  avgEngagement: "N/A",
  rating: 0,
  niches: [] as string[],
  platforms: [{
    name: "instagram",
    handle: `@${name.toLowerCase().replace(/\s+/g, '')}`,
    followers: 0,
    engagementRate: 0,
    pastCollaborations: []
  }]
});

export const useContractData = () => {
  const { campaignInfluencers, loading: influencersLoading } = useInfluencerData();
  const { apiContracts, loading: contractsLoading, error } = useContractAPI();
  const [contracts, setContracts] = useState<ContractData[]>([]);
  const [selectedContract, setSelectedContract] = useState<ContractData | null>(null);

  const loading = influencersLoading || contractsLoading;

  // Convert API contracts to ContractData format
  const convertAPIContractToContractData = (apiContract: APIContractData): ContractData => {
    // Try to find the influencer data for this contract, or create a default one
    let influencer = campaignInfluencers.find(inf => inf.name === apiContract.influencerName);
    
    if (!influencer) {
      console.log(`Creating default influencer data for ${apiContract.influencerName}`);
      influencer = createDefaultInfluencer(apiContract.influencerName);
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
    let value = "Amount not specified"; // default fallback
    
    if (valueMatch) {
      const amount = parseInt(valueMatch[1].replace(/,/g, ''));
      const isThousand = apiContract.negotiationTerms.toLowerCase().includes('thousand');
      const finalAmount = isThousand ? amount * 1000 : amount;
      value = `₹${finalAmount.toLocaleString()}`;
    }

    // Extract deliverables from negotiation terms
    let deliverables = "As per negotiation terms";
    const terms = apiContract.negotiationTerms.toLowerCase();
    
    const deliverablesList = [];
    if (terms.includes('youtube')) deliverablesList.push('YouTube Video');
    if (terms.includes('reel')) deliverablesList.push('Instagram Reels');
    if (terms.includes('post')) deliverablesList.push('Instagram Post');
    if (terms.includes('story')) deliverablesList.push('Instagram Story');
    
    if (deliverablesList.length > 0) {
      deliverables = deliverablesList.join(' + ');
    }

    return {
      id: apiContract._id,
      influencer,
      status,
      deliverables,
      value,
      deadline: "As per agreement",
      signedDate: status === "signed" ? new Date(apiContract.updatedAt).toLocaleDateString() : undefined,
      sentDate: status === "pending" ? new Date(apiContract.createdAt).toLocaleDateString() : undefined,
      negotiationTerms: apiContract.negotiationTerms,
    };
  };

  // Generate contract data from API contracts - display ALL contracts from API
  useEffect(() => {
    if (apiContracts.length > 0) {
      console.log('Displaying all API contracts data:', apiContracts.length, 'contracts');
      const convertedContracts = apiContracts.map(convertAPIContractToContractData);
      
      setContracts(convertedContracts);
      
      // Set first contract as selected by default
      if (convertedContracts.length > 0) {
        setSelectedContract(convertedContracts[0]);
      }
    } else if (!contractsLoading) {
      console.log('No API contracts found, displaying empty list');
      setContracts([]);
      setSelectedContract(null);
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
