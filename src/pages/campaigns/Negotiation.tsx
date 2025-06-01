
import { useState } from "react";
import CampaignLayout from "@/components/layout/CampaignLayout";
import NegotiationThreadsList from "@/components/negotiation/NegotiationThreadsList";
import NegotiationChatPanel from "@/components/negotiation/NegotiationChatPanel";
import NegotiationSidePanel from "@/components/negotiation/NegotiationSidePanel";
import { useInfluencerData } from "@/hooks/useInfluencerData";
import { NegotiationThread, NegotiationMessage, AgentStatus } from "@/types/outreach";

const Negotiation = () => {
  const [selectedThread, setSelectedThread] = useState<NegotiationThread | undefined>();
  const { influencers } = useInfluencerData();

  // Create mock negotiation threads from available influencers
  const createMockThreads = (): NegotiationThread[] => {
    const selectedInfluencers = influencers.slice(0, 5); // Use first 5 influencers
    
    return selectedInfluencers.map((influencer, index) => {
      const platforms = ['instagram', 'email', 'voice'] as const;
      const agentStatuses: AgentStatus[] = ['polling', 'chatting', 'waitingPhone', 'calling', 'complete'];
      const platform = platforms[index % platforms.length];
      const agentStatus = agentStatuses[index % agentStatuses.length];
      
      const baseMessages: NegotiationMessage[] = [
        {
          id: `${influencer.id}_1`,
          from: "agent",
          content: `Hi ${influencer.name}! We'd love to collaborate with you on our upcoming campaign. Your ${influencer.niches[0]?.toLowerCase() || 'content'} work is exactly what we're looking for. Would you be interested in discussing rates?`,
          timestamp: new Date(Date.now() - (index + 1) * 2 * 60 * 60 * 1000).toISOString(),
          platform: platform
        },
        {
          id: `${influencer.id}_2`,
          from: "creator",
          content: "Hi! Yes, I'm definitely interested. What did you have in mind for the collaboration?",
          timestamp: new Date(Date.now() - (index + 1) * 90 * 60 * 1000).toISOString(),
          platform: platform
        }
      ];

      // Add more messages for active threads
      if (agentStatus === 'chatting') {
        baseMessages.push(
          {
            id: `${influencer.id}_3`,
            from: "agent",
            content: `We're looking at $${500 + index * 100} for 3 posts and 5 stories. Would that work for you?`,
            timestamp: new Date(Date.now() - (index + 1) * 60 * 60 * 1000).toISOString(),
            platform: platform
          },
          {
            id: `${influencer.id}_4`,
            from: "creator",
            content: "That sounds fair! Can we discuss the content requirements in more detail?",
            timestamp: new Date(Date.now() - (index + 1) * 45 * 60 * 1000).toISOString(),
            platform: platform
          }
        );
      }

      return {
        creatorId: influencer.id.toString(),
        name: influencer.name,
        handle: `@${influencer.name.toLowerCase().replace(/\s+/g, '')}`,
        platform: platform,
        avatar: influencer.image,
        influencerId: influencer.id,
        status: 'replied' as const,
        agentStatus: agentStatus,
        controlMode: 'agent' as const,
        contact: {
          email: `${influencer.name.toLowerCase().replace(/\s+/g, '.')}@email.com`,
          phone: Math.random() > 0.3 ? `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}` : undefined
        },
        lastActivity: new Date(Date.now() - index * 30 * 60 * 1000).toISOString(),
        messages: baseMessages
      };
    });
  };

  const negotiationThreads = createMockThreads();

  // Auto-select first non-complete thread
  if (!selectedThread && negotiationThreads.length > 0) {
    const firstActiveThread = negotiationThreads.find(t => t.agentStatus !== 'complete') || negotiationThreads[0];
    setSelectedThread(firstActiveThread);
  }

  const handleSelectThread = (thread: NegotiationThread) => {
    setSelectedThread(thread);
  };

  const handleSendMessage = (content: string, platform: string) => {
    if (!selectedThread) return;

    const newMessage: NegotiationMessage = {
      id: `msg-${Date.now()}`,
      from: 'user',
      content,
      timestamp: new Date().toISOString(),
      platform: platform as 'instagram' | 'email' | 'voice'
    };

    // Update selected thread
    const updatedThread: NegotiationThread = {
      ...selectedThread,
      messages: [...selectedThread.messages, newMessage],
      lastActivity: new Date().toISOString()
    };
    setSelectedThread(updatedThread);
  };

  const handleStatusChange = (newStatus: AgentStatus) => {
    if (!selectedThread) return;

    const updatedThread: NegotiationThread = {
      ...selectedThread,
      agentStatus: newStatus
    };
    setSelectedThread(updatedThread);
  };

  const handleAIResponse = () => {
    console.log('AI Response clicked - API integration coming soon');
    // TODO: Integrate with AI response API when provided
  };

  const handlePoll = () => {
    console.log('Poll clicked - API integration coming soon');
    // TODO: Integrate with poll API when provided
  };

  return (
    <CampaignLayout>
      <div className="min-h-screen bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-[#1D1D1F] font-sans tracking-tight">
              Negotiation
            </h1>
            <p className="text-[#6E6E73] font-sans mt-2 text-lg">
              AI-powered negotiations with real-time agent control
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
            {/* Threads List - 3 columns */}
            <div className="col-span-12 lg:col-span-3">
              <NegotiationThreadsList
                threads={negotiationThreads}
                selectedThreadId={selectedThread?.creatorId}
                onSelectThread={handleSelectThread}
              />
            </div>

            {/* Chat & Control Panel - 5 columns */}
            <div className="col-span-12 lg:col-span-5">
              <NegotiationChatPanel
                selectedThread={selectedThread}
                onSendMessage={handleSendMessage}
                onStatusChange={handleStatusChange}
                onAIResponse={handleAIResponse}
                onPoll={handlePoll}
              />
            </div>

            {/* Side Panel - 4 columns */}
            <div className="col-span-12 lg:col-span-4">
              <NegotiationSidePanel
                selectedThread={selectedThread}
              />
            </div>
          </div>
        </div>
      </div>
    </CampaignLayout>
  );
};

export default Negotiation;
