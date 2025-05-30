
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConversationalAgent, { Message, ActionButton, MessageCard } from "../chat/ConversationalAgent";
import ChatHistoryPanel from "../chat/ChatHistoryPanel";
import { toast } from "sonner";

export interface CampaignData {
  name: string;
  description: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  objective: string;
  budget: number;
  kpis: string[];
  autoAdvance: boolean;
  notifyAtEachStage: boolean;
  language: string;
}

const ConversationalCampaignModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [campaignData, setCampaignData] = useState<CampaignData>({
    name: "",
    description: "",
    startDate: undefined,
    endDate: undefined,
    objective: "",
    budget: 0,
    kpis: [],
    autoAdvance: true,
    notifyAtEachStage: true,
    language: "en-US"
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [conversationStep, setConversationStep] = useState(0);

  const isOpen = location.pathname.includes('/new-campaign');

  const handleClose = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial agent greeting
      const initialMessage: Message = {
        id: '1',
        type: 'agent',
        content: "Hi! I'm your Campaign Supervisor Agent. Let's set up your new campaign. What's the campaign name and main goal you're trying to achieve?",
        timestamp: new Date(),
        actionButtons: []
      };
      setMessages([initialMessage]);
    }
  }, [isOpen]);

  const handleSendMessage = (content: string) => {
    // Add user message
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
    }, 1500);
  };

  const handleAgentResponse = (userInput: string) => {
    let agentMessage: Message;

    switch (conversationStep) {
      case 0: // Initial name and goal
        // Parse campaign name and goal from user input
        const nameMatch = userInput.match(/([^—-]+)(?:[—-](.+))?/);
        const campaignName = nameMatch?.[1]?.trim() || userInput.split(' ').slice(0, 3).join(' ');
        const campaignGoal = nameMatch?.[2]?.trim() || "Brand awareness";
        
        setCampaignData(prev => ({ ...prev, name: campaignName, description: campaignGoal }));

        agentMessage = {
          id: Date.now().toString(),
          type: 'agent',
          content: `Perfect! "${campaignName}" sounds great. Now, what's your budget range and preferred campaign dates?`,
          timestamp: new Date(),
          cards: [{
            id: 'review-1',
            type: 'campaign-review',
            data: { name: campaignName, goal: campaignGoal }
          }]
        };
        setConversationStep(1);
        break;

      case 1: // Budget and dates
        // Parse budget from user input
        const budgetMatch = userInput.match(/\$?(\d+(?:,\d{3})*(?:\.\d{2})?)/);
        const budget = budgetMatch ? parseFloat(budgetMatch[1].replace(/,/g, '')) : 10000;
        
        setCampaignData(prev => ({ ...prev, budget }));

        agentMessage = {
          id: Date.now().toString(),
          type: 'agent',
          content: `Excellent! Based on your goal, I recommend tracking Clicks and ROI as key performance indicators. Would you like me to add these KPIs?`,
          timestamp: new Date(),
          actionButtons: [
            { id: 'add-kpis', label: 'Yes, add KPIs', variant: 'default' as const },
            { id: 'customize-kpis', label: 'No, let me customize', variant: 'outline' as const }
          ],
          cards: [{
            id: 'review-2',
            type: 'campaign-review',
            data: { name: campaignData.name, goal: campaignData.description, budget }
          }]
        };
        setConversationStep(2);
        break;

      case 2: // Workflow preferences
        agentMessage = {
          id: Date.now().toString(),
          type: 'agent',
          content: `Perfect! Your campaign is ready to launch. I'll set up auto-advance through stages and enable notifications. Ready to start with Discovery?`,
          timestamp: new Date(),
          actionButtons: [
            { id: 'launch-campaign', label: 'Launch Campaign!', variant: 'default' as const },
            { id: 'review-settings', label: 'Review Settings', variant: 'outline' as const }
          ]
        };
        setConversationStep(3);
        break;

      default:
        agentMessage = {
          id: Date.now().toString(),
          type: 'agent',
          content: "I understand. How else can I help you with your campaign setup?",
          timestamp: new Date()
        };
    }

    setMessages(prev => [...prev, agentMessage]);
  };

  const handleActionClick = async (actionId: string, messageId: string) => {
    switch (actionId) {
      case 'add-kpis':
        setCampaignData(prev => ({ ...prev, kpis: ['clicks', 'roi'] }));
        const kpiMessage: Message = {
          id: Date.now().toString(),
          type: 'agent',
          content: "Great! I've added Clicks and ROI tracking. Now let's set up your workflow preferences.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, kpiMessage]);
        setConversationStep(2);
        break;

      case 'customize-kpis':
        const customMessage: Message = {
          id: Date.now().toString(),
          type: 'agent',
          content: "No problem! You can customize KPIs later. Let's proceed with the basic setup.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, customMessage]);
        setConversationStep(2);
        break;

      case 'launch-campaign':
        try {
          const campaignId = Math.random().toString(36).substr(2, 9);
          toast.success(`Campaign '${campaignData.name}' created successfully!`);
          handleClose();
          setTimeout(() => {
            navigate(`/campaigns/${campaignId}/discovery`);
          }, 100);
        } catch (error) {
          toast.error('Failed to create campaign. Please try again.');
        }
        break;

      case 'review-settings':
        const reviewMessage: Message = {
          id: Date.now().toString(),
          type: 'agent',
          content: "Here's your campaign summary. Everything looks good to proceed!",
          timestamp: new Date(),
          cards: [{
            id: 'final-review',
            type: 'campaign-review',
            data: campaignData
          }],
          actionButtons: [
            { id: 'launch-campaign', label: 'Launch Campaign!', variant: 'default' as const }
          ]
        };
        setMessages(prev => [...prev, reviewMessage]);
        break;
    }
  };

  const chatSessions = [
    {
      id: '1',
      agentName: 'Campaign Supervisor',
      stage: 'creation',
      messages: messages,
      isActive: true
    }
  ];

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-none h-screen w-screen p-0 m-0 rounded-none border-none">
          <div className="h-full flex bg-white">
            {/* Main Chat Area */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${isPanelOpen ? 'pr-80' : ''}`}>
              {/* Header */}
              <div className="border-b border-gray-100 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-semibold text-gray-900">Campaign Supervisor Agent</h1>
                    <p className="text-gray-600 text-sm">Let's create your new campaign together</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleClose}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Chat Interface */}
              <div className="flex-1">
                <ConversationalAgent
                  agentName="Campaign Supervisor"
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  onActionClick={handleActionClick}
                  isTyping={isTyping}
                  placeholder="Tell me about your campaign..."
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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

export default ConversationalCampaignModal;
