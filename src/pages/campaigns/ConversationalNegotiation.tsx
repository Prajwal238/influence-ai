
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CampaignLayout from "@/components/layout/CampaignLayout";
import ConversationalAgent, { Message, ActionButton } from "@/components/chat/ConversationalAgent";
import ChatHistoryPanel from "@/components/chat/ChatHistoryPanel";

const ConversationalNegotiation = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [negotiationStep, setNegotiationStep] = useState(0);

  useEffect(() => {
    const initialMessage: Message = {
      id: '1',
      type: 'agent',
      content: "Hi! I'm your Negotiation Agent. I've received 3 positive replies from creators. Would you like me to handle rate negotiation automatically within your budget range of $500–$1,000 per creator?",
      timestamp: new Date(),
      actionButtons: [
        { id: 'auto-negotiate', label: 'Yes, proceed automatically', variant: 'default' as const },
        { id: 'manual-review', label: 'Let me review each one', variant: 'outline' as const }
      ]
    };
    setMessages([initialMessage]);
  }, []);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      handleAgentResponse(content);
      setIsTyping(false);
    }, 2000);
  };

  const handleAgentResponse = (userInput: string) => {
    let agentMessage: Message;

    switch (negotiationStep) {
      case 1: // After auto-negotiation
        agentMessage = {
          id: Date.now().toString(),
          type: 'agent',
          content: "Perfect! All negotiations completed successfully. Here's the summary:\n\n✅ Sarah Johnson - $800 for 2 Instagram posts\n✅ Emma Rodriguez - $950 for 3 reels + 1 post\n✅ Maria Santos - $750 for 1 post + 2 stories\n\nTotal cost: $2,500 (within budget). Ready to proceed to contracts?",
          timestamp: new Date(),
          actionButtons: [
            { id: 'proceed-contracts', label: 'Proceed to Contracts', variant: 'default' as const },
            { id: 'renegotiate', label: 'Renegotiate Rates', variant: 'outline' as const }
          ]
        };
        break;

      default:
        agentMessage = {
          id: Date.now().toString(),
          type: 'agent',
          content: "I understand. How would you like to proceed with the negotiations?",
          timestamp: new Date()
        };
    }

    setMessages(prev => [...prev, agentMessage]);
  };

  const handleActionClick = (actionId: string, messageId: string) => {
    let responseMessage: Message;

    switch (actionId) {
      case 'auto-negotiate':
        setIsTyping(true);
        setTimeout(() => {
          responseMessage = {
            id: Date.now().toString(),
            type: 'agent',
            content: "🤝 Negotiating with creators...\n\n💬 Sarah: Proposed $800 for 2 posts → Accepted!\n💬 Emma: Proposed $950 for content package → Accepted!\n💬 Maria: Proposed $750 for post + stories → Accepted!\n\nAll deals secured! 🎉",
            timestamp: new Date(),
            actionButtons: [
              { id: 'view-summary', label: 'View Full Summary', variant: 'default' as const }
            ]
          };
          setMessages(prev => [...prev, responseMessage]);
          setNegotiationStep(1);
          setIsTyping(false);
        }, 3000);
        return;

      case 'manual-review':
        responseMessage = {
          id: Date.now().toString(),
          type: 'agent',
          content: "No problem! Here are the individual conversations:\n\n📱 Sarah Johnson: 'I can do $500 for the Instagram post and story'\n📱 Emma Rodriguez: 'When would you need the content delivered?'\n📱 Maria Santos: 'My rate is $600 for 1 post + 2 stories'\n\nWhich creator would you like to respond to first?",
          timestamp: new Date(),
          actionButtons: [
            { id: 'respond-sarah', label: 'Respond to Sarah', variant: 'outline' as const },
            { id: 'respond-emma', label: 'Respond to Emma', variant: 'outline' as const },
            { id: 'respond-maria', label: 'Respond to Maria', variant: 'outline' as const }
          ]
        };
        break;

      case 'view-summary':
        responseMessage = {
          id: Date.now().toString(),
          type: 'agent',
          content: "🎯 Negotiation Complete!\n\n💰 Total Budget Used: $2,500 / $3,000\n📊 Success Rate: 100% (3/3 creators agreed)\n⏱️ Average Response Time: 2.5 hours\n\nAll contracts are ready for signature. Shall we proceed?",
          timestamp: new Date(),
          actionButtons: [
            { id: 'proceed-contracts', label: 'Proceed to Contracts', variant: 'default' as const }
          ]
        };
        break;

      case 'proceed-contracts':
        window.location.href = `/campaigns/${id}/contracts`;
        return;

      case 'respond-sarah':
        responseMessage = {
          id: Date.now().toString(),
          type: 'agent',
          content: "Here's Sarah's conversation thread. I can suggest responses based on market rates and your budget:",
          timestamp: new Date(),
          actionButtons: [
            { id: 'accept-sarah', label: 'Accept $500', variant: 'default' as const },
            { id: 'counter-sarah', label: 'Counter offer', variant: 'outline' as const }
          ]
        };
        break;

      default:
        responseMessage = {
          id: Date.now().toString(),
          type: 'agent',
          content: "I understand. How would you like me to handle this negotiation?",
          timestamp: new Date()
        };
    }

    setMessages(prev => [...prev, responseMessage]);
  };

  const chatSessions = [
    {
      id: '1',
      agentName: 'Negotiation Agent',
      stage: 'negotiation',
      messages: messages,
      isActive: true
    }
  ];

  return (
    <>
      <CampaignLayout>
        <div className={`h-[calc(100vh-80px)] transition-all duration-300 ${isPanelOpen ? 'pr-80' : ''}`}>
          <div className="border-b border-gray-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Negotiation Agent</h1>
                <p className="text-gray-600 text-sm">Let's negotiate the best deals with your creators</p>
              </div>
            </div>
          </div>

          <div className="h-[calc(100%-80px)]">
            <ConversationalAgent
              agentName="Negotiation Agent"
              messages={messages}
              onSendMessage={handleSendMessage}
              onActionClick={handleActionClick}
              isTyping={isTyping}
              placeholder="Ask about negotiation strategies or specific deals..."
            />
          </div>
        </div>
      </CampaignLayout>

      <ChatHistoryPanel
        sessions={chatSessions}
        isOpen={isPanelOpen}
        onToggle={() => setIsPanelOpen(!isPanelOpen)}
        onSessionSelect={(sessionId) => console.log('Selected session:', sessionId)}
      />
    </>
  );
};

export default ConversationalNegotiation;
