
import { useState, useEffect } from "react";
import CampaignLayout from "@/components/layout/CampaignLayout";
import NegotiationThreadsList from "@/components/negotiation/NegotiationThreadsList";
import NegotiationChatPanel from "@/components/negotiation/NegotiationChatPanel";
import NegotiationSidePanel from "@/components/negotiation/NegotiationSidePanel";
import { useNegotiationAPI } from "@/hooks/useNegotiationAPI";
import { NegotiationThread, NegotiationMessage, AgentStatus } from "@/types/outreach";

const Negotiation = () => {
  const [selectedThread, setSelectedThread] = useState<NegotiationThread | undefined>();
  const [negotiationThreads, setNegotiationThreads] = useState<NegotiationThread[]>([]);
  const { fetchAllInfluencerConversations, loading, error } = useNegotiationAPI();

  // Fetch conversations when component mounts
  useEffect(() => {
    const loadConversations = async () => {
      try {
        const threads = await fetchAllInfluencerConversations();
        setNegotiationThreads(threads);
        
        // Auto-select first non-complete thread
        if (threads.length > 0) {
          const firstActiveThread = threads.find(t => t.agentStatus !== 'complete') || threads[0];
          setSelectedThread(firstActiveThread);
        }
      } catch (err) {
        console.error('Failed to load conversations:', err);
      }
    };

    loadConversations();
  }, [fetchAllInfluencerConversations]);

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

    // Update threads list
    setNegotiationThreads(prev => 
      prev.map(thread => 
        thread.creatorId === selectedThread.creatorId ? updatedThread : thread
      )
    );
  };

  const handleStatusChange = (newStatus: AgentStatus) => {
    if (!selectedThread) return;

    const updatedThread: NegotiationThread = {
      ...selectedThread,
      agentStatus: newStatus
    };
    setSelectedThread(updatedThread);

    // Update threads list
    setNegotiationThreads(prev => 
      prev.map(thread => 
        thread.creatorId === selectedThread.creatorId ? updatedThread : thread
      )
    );
  };

  const handleAIResponse = () => {
    console.log('AI Response clicked - API integration coming soon');
    // TODO: Integrate with AI response API when provided
  };

  const handlePoll = () => {
    console.log('Poll clicked - API integration coming soon');
    // TODO: Integrate with poll API when provided
  };

  if (loading) {
    return (
      <CampaignLayout>
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0071E3] mx-auto mb-4"></div>
            <p className="text-[#6E6E73] font-sans">Loading negotiations...</p>
          </div>
        </div>
      </CampaignLayout>
    );
  }

  if (error) {
    return (
      <CampaignLayout>
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 font-sans mb-4">Error loading negotiations: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-[#0071E3] text-white px-4 py-2 rounded-xl"
            >
              Retry
            </button>
          </div>
        </div>
      </CampaignLayout>
    );
  }

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
