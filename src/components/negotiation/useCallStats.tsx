
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { buildApiUrl } from "@/config/api";
import { CallStatsData, CallStatsProps } from "./CallStatsTypes";

export const useCallStats = ({ selectedThread, campaignId }: CallStatsProps) => {
  const [callData, setCallData] = useState<CallStatsData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchCallStats = async () => {
    if (!selectedThread || !campaignId) return;

    try {
      setLoading(true);
      
      const token = localStorage.getItem('jwt_token') || '';
      const response = await fetch(
        buildApiUrl(`/api/getConversation/${campaignId}/${selectedThread.creatorId}`),
        {
          headers: {
            'Authorization': token,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch call stats');
      }

      const data: CallStatsData = await response.json();
      
      // Ensure transcript is always an array
      const normalizedData = {
        ...data,
        transcript: Array.isArray(data.transcript) ? data.transcript : [],
        callDurationSeconds: data.callDurationSeconds || 0,
        status: data.status || 'unknown',
        influencerInterest: data.influencerInterest || 'Unknown'
      };
      
      setCallData(normalizedData);
      
      toast({
        title: "Call stats loaded",
        description: "Successfully fetched conversation transcript",
      });
    } catch (err) {
      console.error('Error fetching call stats:', err);
      toast({
        title: "Failed to load call stats",
        description: "Could not fetch conversation data",
        variant: "destructive"
      });
      
      // Set empty data structure to prevent further errors
      setCallData({
        transcript: [],
        status: 'error',
        influencerInterest: 'Unknown',
        callDurationSeconds: 0
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedThread && campaignId) {
      fetchCallStats();
    }
  }, [selectedThread, campaignId]);

  return { callData, loading, fetchCallStats };
};
