
import CampaignLayout from "@/components/layout/CampaignLayout";
import NegotiationContent from "@/components/negotiation/NegotiationContent";
import NegotiationLoadingState from "@/components/negotiation/NegotiationLoadingState";
import NegotiationErrorState from "@/components/negotiation/NegotiationErrorState";
import { useNegotiationState } from "@/hooks/useNegotiationState";

const Negotiation = () => {
  const {
    selectedThread,
    negotiationThreads,
    loading,
    error,
    aiResponseInput,
    setAiResponseInput,
    handleSelectThread,
    handleSendMessage,
    handleStatusChange,
    handleAIResponse,
    handlePoll
  } = useNegotiationState();

  if (loading) {
    return <NegotiationLoadingState />;
  }

  if (error) {
    return <NegotiationErrorState error={error} />;
  }

  return (
    <CampaignLayout>
      <NegotiationContent
        selectedThread={selectedThread}
        negotiationThreads={negotiationThreads}
        onSelectThread={handleSelectThread}
        onSendMessage={handleSendMessage}
        onStatusChange={handleStatusChange}
        onAIResponse={handleAIResponse}
        onPoll={handlePoll}
        aiResponseInput={aiResponseInput}
        onAiResponseInputChange={setAiResponseInput}
      />
    </CampaignLayout>
  );
};

export default Negotiation;
