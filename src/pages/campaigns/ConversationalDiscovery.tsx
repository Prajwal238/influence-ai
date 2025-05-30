
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CampaignLayout from "@/components/layout/CampaignLayout";
import ConversationalAgent, { Message, ActionButton, MessageCard } from "@/components/chat/ConversationalAgent";
import ChatHistoryPanel from "@/components/chat/ChatHistoryPanel";

const ConversationalDiscovery = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [foundCreators, setFoundCreators] = useState<any[]>([]);

  useEffect(() => {
    // Initial agent greeting
    const initialMessage: Message = {
      id: '1',
      type: 'agent',
      content: "Hi! I'm your Discovery Agent. Tell me what kind of creators you want for this campaign. For example: 'US tech reviewers with 100K+ subscribers' or 'European fashion micro-influencers, 50K–200K followers'.",
      timestamp: new Date(),
      actionButtons: []
    };
    setMessages([initialMessage]);
  }, []);

  const mockCreators = [
    {
      id: 1,
      name: "Sarah Johnson",
      handle: "@sarahjohnson",
      followers: "125K",
      engagement: "3.2",
      niche: "Fashion",
      trustScore: "9.2"
    },
    {
      id: 2,
      name: "Emma Rodriguez",
      handle: "@emmarodriguez",
      followers: "89K",
      engagement: "4.1",
      niche: "Fashion",
      trustScore: "8.8"
    },
    {
      id: 3,
      name: "Maria Santos",
      handle: "@mariasantos",
      followers: "156K",
      engagement: "3.8",
      niche: "Fashion",
      trustScore: "9.0"
    }
  ];

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate agent processing
    setTimeout(() => {
      handleAgentResponse(content);
      setIsTyping(false);
    }, 2000);
  };

  const handleAgentResponse = (userInput: string) => {
    let agentMessage: Message;

    if (foundCreators.length === 0) {
      // First search
      const creatorsToShow = mockCreators.slice(0, 3);
      setFoundCreators(creatorsToShow);

      const creatorCards: MessageCard[] = creatorsToShow.map(creator => ({
        id: creator.id.toString(),
        type: 'creator',
        data: creator
      }));

      agentMessage = {
        id: Date.now().toString(),
        type: 'agent',
        content: `Perfect! I found ${creatorsToShow.length} creators matching your criteria. Here are the top performers:`,
        timestamp: new Date(),
        actionButtons: [
          { id: 'filter-engagement', label: 'Filter by engagement > 3%', variant: 'outline' as const },
          { id: 'show-more', label: 'Show more micro-influencers', variant: 'outline' as const },
          { id: 'add-selected', label: 'Add selected to campaign', variant: 'default' as const }
        ],
        cards: creatorCards
      };
    } else {
      // Follow-up responses
      agentMessage = {
        id: Date.now().toString(),
        type: 'agent',
        content: "Great choice! I can help you find more creators or refine your current selection. What would you like to do next?",
        timestamp: new Date(),
        actionButtons: [
          { id: 'find-more', label: 'Find More Creators', variant: 'outline' as const },
          { id: 'proceed-outreach', label: 'Proceed to Outreach', variant: 'default' as const }
        ]
      };
    }

    setMessages(prev => [...prev, agentMessage]);
  };

  const handleActionClick = (actionId: string, messageId: string) => {
    let responseMessage: Message;

    switch (actionId) {
      case 'filter-engagement':
        const filteredCreators = foundCreators.filter(c => parseFloat(c.engagement) > 3);
        const filteredCards: MessageCard[] = filteredCreators.map(creator => ({
          id: `filtered-${creator.id}`,
          type: 'creator',
          data: creator
        }));

        responseMessage = {
          id: Date.now().toString(),
          type: 'agent',
          content: `Filtered to show only creators with >3% engagement. Found ${filteredCreators.length} high-engagement creators:`,
          timestamp: new Date(),
          cards: filteredCards,
          actionButtons: [
            { id: 'add-selected', label: 'Add selected to campaign', variant: 'default' as const }
          ]
        };
        break;

      case 'show-more':
        responseMessage = {
          id: Date.now().toString(),
          type: 'agent',
          content: "I'm searching for more micro-influencers in the fashion niche. Here are additional matches:",
          timestamp: new Date(),
          cards: [mockCreators[2]].map(creator => ({
            id: `more-${creator.id}`,
            type: 'creator',
            data: creator
          })),
          actionButtons: [
            { id: 'add-selected', label: 'Add selected to campaign', variant: 'default' as const }
          ]
        };
        break;

      case 'add-selected':
        responseMessage = {
          id: Date.now().toString(),
          type: 'agent',
          content: "Excellent! I've added 3 creators to your campaign. Ready to start outreach?",
          timestamp: new Date(),
          actionButtons: [
            { id: 'proceed-outreach', label: 'Proceed to Outreach', variant: 'default' as const },
            { id: 'find-more', label: 'Find More Creators', variant: 'outline' as const }
          ]
        };
        break;

      case 'proceed-outreach':
        window.location.href = `/campaigns/${id}/outreach`;
        return;

      case 'find-more':
        responseMessage = {
          id: Date.now().toString(),
          type: 'agent',
          content: "Sure! Tell me more about what you're looking for. Any specific requirements or preferences?",
          timestamp: new Date()
        };
        break;

      default:
        responseMessage = {
          id: Date.now().toString(),
          type: 'agent',
          content: "I understand. How else can I help you find the perfect creators?",
          timestamp: new Date()
        };
    }

    setMessages(prev => [...prev, responseMessage]);
  };

  const chatSessions = [
    {
      id: '1',
      agentName: 'Discovery Agent',
      stage: 'discovery',
      messages: messages,
      isActive: true
    }
  ];

  return (
    <>
      <CampaignLayout>
        <div className={`h-[calc(100vh-80px)] transition-all duration-300 ${isPanelOpen ? 'pr-80' : ''}`}>
          {/* Header */}
          <div className="border-b border-gray-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Discovery Agent</h1>
                <p className="text-gray-600 text-sm">Let's find the perfect creators for your campaign</p>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="h-[calc(100%-80px)]">
            <ConversationalAgent
              agentName="Discovery Agent"
              messages={messages}
              onSendMessage={handleSendMessage}
              onActionClick={handleActionClick}
              isTyping={isTyping}
              placeholder="Describe the creators you're looking for..."
            />
          </div>
        </div>
      </CampaignLayout>

      {/* Chat History Panel */}
      <ChatHistoryPanel
        sessions={chatSessions}
        isOpen={isPanelOpen}
        onToggle={() => setIsPanelOpen(!isPanelOpen)}
        onSessionSelect={(sessionId) => console.log('Selected session:', sessionId)}
      />
    </>
  );
};

export default ConversationalDiscovery;
