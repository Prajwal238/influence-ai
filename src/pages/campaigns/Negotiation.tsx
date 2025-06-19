
import { useParams } from "react-router-dom";
import CampaignLayout from "@/components/layout/CampaignLayout";
import NegotiationContent from "@/components/negotiation/NegotiationContent";
import NegotiationLoadingState from "@/components/negotiation/NegotiationLoadingState";
import NegotiationErrorState from "@/components/negotiation/NegotiationErrorState";
import { useNegotiationState } from "@/hooks/useNegotiationState";

const Negotiation = () => {
  const { id: campaignId } = useParams<{ id: string }>();
  
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
    handlePoll,
    handleCall
  } = useNegotiationState(campaignId);

  if (loading) {
    return <NegotiationLoadingState />;
  }

  if (error) {
    return <NegotiationErrorState error={error} />;
  }

  return (
    <CampaignLayout>
      <div className="h-[calc(100vh-200px)]">
        <NegotiationContent
          selectedThread={selectedThread}
          negotiationThreads={negotiationThreads}
          onSelectThread={handleSelectThread}
          onSendMessage={handleSendMessage}
          onStatusChange={handleStatusChange}
          onAIResponse={handleAIResponse}
          onPoll={handlePoll}
          onCall={handleCall}
          aiResponseInput={aiResponseInput}
          onAiResponseInputChange={setAiResponseInput}
        />
      </div>
    </CampaignLayout>
  );
};

export default Negotiation;
