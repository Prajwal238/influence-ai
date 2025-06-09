
import { useState, useEffect } from "react";
import { apiClient } from "@/utils/apiClient";
import { useParams } from "react-router-dom";

export interface APIContractData {
  _id: string;
  campaignName: string;
  campaignId: string;
  influencerName: string;
  contractStatus: "tobesigned" | "signed" | "pending";
  negotiationTerms: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const useContractAPI = () => {
  const { id: campaignId } = useParams();
  const [apiContracts, setApiContracts] = useState<APIContractData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContracts = async () => {
      if (!campaignId) return;
      
      try {
        setLoading(true);
        console.log('Fetching contracts for campaign:', campaignId);
        
        const response = await apiClient.get(`/api/${campaignId}/contracts`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch contracts');
        }
        
        const contracts: APIContractData[] = await response.json();
        console.log('Fetched contracts:', contracts);
        setApiContracts(contracts);
        setError(null);
      } catch (err) {
        console.error('Error fetching contracts:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch contracts');
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, [campaignId]);

  return {
    apiContracts,
    loading,
    error,
  };
};
