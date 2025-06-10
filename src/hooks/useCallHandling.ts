
import { NegotiationThread } from "@/types/outreach";
import { useNegotiationAPI } from "@/hooks/useNegotiationAPI";
import { useToast } from "@/hooks/use-toast";

export const useCallHandling = () => {
  const { makeCall } = useNegotiationAPI();
  const { toast } = useToast();

  const handleCall = async (
    selectedThread: NegotiationThread | undefined,
    campaignId: string | undefined
  ) => {
    console.log('useCallHandling - handleCall called');
    console.log('selectedThread:', selectedThread?.name);
    console.log('campaignId:', campaignId);
    console.log('phone number:', selectedThread?.contact?.phone);

    if (!selectedThread || !campaignId || !selectedThread.contact?.phone) {
      console.log('Missing required data for call');
      toast({
        title: "Call failed",
        description: "Missing phone number or campaign information",
        variant: "destructive"
      });
      return;
    }

    try {
      console.log('Initiating call...');
      const response = await makeCall(
        campaignId,
        selectedThread.contact.phone,
        selectedThread.name
      );

      if (response.success) {
        toast({
          title: "Call initiated successfully",
          description: `Call started with ${selectedThread.name}`,
        });
        console.log('Call initiated:', response);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.error('Failed to initiate call:', err);
      toast({
        title: "Call failed",
        description: "Failed to initiate the call. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    handleCall
  };
};
