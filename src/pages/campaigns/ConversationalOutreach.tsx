
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CampaignLayout from "@/components/layout/CampaignLayout";
import ConversationalAgent, { Message, ActionButton } from "@/components/chat/ConversationalAgent";
import ChatHistoryPanel from "@/components/chat/ChatHistoryPanel";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const ConversationalOutreach = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [outreachStep, setOutreachStep] = useState(0);

  useEffect(() => {
    const initialMessage: Message = {
      id: '1',
      type: 'agent',
      content: "Hi! I'm your Outreach Agent. I'm ready to reach out to your selected creators. Which tone would you prefer for the outreach messages? For example: 'friendly and casual' or 'professional and formal'",
      timestamp: new Date()
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
    }, 1500);
  };

  const handleAgentResponse = (userInput: string) => {
    let agentMessage: Message;

    switch (outreachStep) {
      case 0: // Tone selection
        agentMessage = {
          id: Date.now().toString(),
          type: 'agent',
          content: `Perfect! I'll craft ${userInput.toLowerCase()} messages. What languages should I use? You mentioned you want to reach creators in multiple regions.`,
          timestamp: new Date(),
          actionButtons: [
            { id: 'english-only', label: 'English only', variant: 'outline' as const },
            { id: 'english-spanish', label: 'English and Spanish', variant: 'default' as const },
            { id: 'multiple-languages', label: 'Multiple languages', variant: 'outline' as const }
          ]
        };
        setOutreachStep(1);
        break;

      case 1: // Language confirmation  
        agentMessage = {
          id: Date.now().toString(),
          type: 'agent',
          content: "Great choice! Here's a draft message for your first creator. I can also play it using AI voice:",
          timestamp: new Date(),
          actionButtons: [
            { id: 'play-voice', label: '🔊 Play Voice Preview', variant: 'outline' as const },
            { id: 'edit-message', label: 'Edit Message', variant: 'outline' as const },
            { id: 'send-all', label: 'Send to All Creators', variant: 'default' as const }
          ]
        };
        setOutreachStep(2);
        break;

      case 2: // Final confirmation
        agentMessage = {
          id: Date.now().toString(),
          type: 'agent',
          content: "Messages sent successfully! I'm monitoring responses in real-time. Current stats: 60% open rate, 2 replies received so far.",
          timestamp: new Date(),
          actionButtons: [
            { id: 'view-responses', label: 'View Responses', variant: 'default' as const },
            { id: 'send-followup', label: 'Schedule Follow-up', variant: 'outline' as const }
          ]
        };
        setOutreachStep(3);
        break;

      default:
        agentMessage = {
          id: Date.now().toString(),
          type: 'agent',
          content: "I'm here to help with any outreach questions or adjustments you need!",
          timestamp: new Date()
        };
    }

    setMessages(prev => [...prev, agentMessage]);
  };

  const handleActionClick = (actionId: string, messageId: string) => {
    let responseMessage: Message;

    switch (actionId) {
      case 'english-spanish':
        responseMessage = {
          id: Date.now().toString(),
          type: 'agent',
          content: "Excellent! I'll create personalized messages in both English and Spanish based on each creator's profile and audience.",
          timestamp: new Date()
        };
        setOutreachStep(1);
        break;

      case 'play-voice':
        // Simulate voice preview
        responseMessage = {
          id: Date.now().toString(),
          type: 'agent',
          content: "🎵 *Playing voice preview* - 'Hi Sarah! We love your fashion content and would like to collaborate...' The message sounds natural and engaging!",
          timestamp: new Date(),
          actionButtons: [
            { id: 'send-all', label: 'Sounds good - Send to All', variant: 'default' as const },
            { id: 'edit-message', label: 'Edit Message', variant: 'outline' as const }
          ]
        };
        break;

      case 'send-all':
        responseMessage = {
          id: Date.now().toString(),
          type: 'agent',
          content: "Perfect! Sending personalized messages to all 3 creators now... ✅ Messages sent! I'll track responses and notify you of any replies.",
          timestamp: new Date(),
          actionButtons: [
            { id: 'proceed-negotiation', label: 'Proceed to Negotiation', variant: 'default' as const },
            { id: 'view-analytics', label: 'View Analytics', variant: 'outline' as const }
          ]
        };
        break;

      case 'proceed-negotiation':
        window.location.href = `/campaigns/${id}/negotiation`;
        return;

      case 'view-responses':
        responseMessage = {
          id: Date.now().toString(),
          type: 'agent',
          content: "Here are the responses so far:\n\n✅ Sarah Johnson: 'Interested! What's the rate?'\n✅ Emma Rodriguez: 'Love the brand! When do you need content?'\n⏳ Maria Santos: Message delivered, awaiting response",
          timestamp: new Date(),
          actionButtons: [
            { id: 'proceed-negotiation', label: 'Start Negotiations', variant: 'default' as const }
          ]
        };
        break;

      default:
        responseMessage = {
          id: Date.now().toString(),
          type: 'agent',
          content: "I understand. How else can I help with your outreach?",
          timestamp: new Date()
        };
    }

    setMessages(prev => [...prev, responseMessage]);
  };

  const chatSessions = [
    {
      id: '1',
      agentName: 'Outreach Agent',
      stage: 'outreach',
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
                <h1 className="text-xl font-semibold text-gray-900">Outreach Agent</h1>
                <p className="text-gray-600 text-sm">Let's reach out to your selected creators</p>
              </div>
            </div>
          </div>

          <div className="h-[calc(100%-80px)]">
            <ConversationalAgent
              agentName="Outreach Agent"
              messages={messages}
              onSendMessage={handleSendMessage}
              onActionClick={handleActionClick}
              isTyping={isTyping}
              placeholder="Tell me about your preferred outreach style..."
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

export default ConversationalOutreach;
