
import { useState } from "react";
import CampaignLayout from "@/components/layout/CampaignLayout";
import NegotiationThreadsList from "@/components/negotiation/NegotiationThreadsList";
import NegotiationChatPanel from "@/components/negotiation/NegotiationChatPanel";
import NegotiationSidePanel from "@/components/negotiation/NegotiationSidePanel";
import { useOutreachData } from "@/hooks/useOutreachData";
import { NegotiationThread, NegotiationMessage, AgentStatus, ControlMode } from "@/types/outreach";

const Negotiation = () => {
  const [selectedThread, setSelectedThread] = useState<NegotiationThread | undefined>();
  const { threads, addMessageToThread } = useOutreachData();

  // Convert threads to negotiation format with mock agent data
  const negotiationThreads: NegotiationThread[] = threads.map(thread => ({
    creatorId: thread.creatorId,
    name: thread.name,
    handle: thread.handle,
    platform: thread.platform,
    messages: thread.messages.map(msg => ({
      ...msg,
      from: msg.from as 'agent' | 'creator' | 'user'
    })),
    avatar: thread.avatar,
    influencerId: thread.influencerId,
    status: thread.status,
    agentStatus: thread.messages.length > 2 ? 'chatting' : 'polling' as AgentStatus,
    controlMode: 'agent' as ControlMode,
    contact: {
      email: `${thread.handle.replace('@', '')}@email.com`,
      phone: Math.random() > 0.5 ? '+1 (555) 123-4567' : undefined
    },
    lastActivity: new Date().toISOString()
  }));

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
      from: selectedThread.controlMode === 'agent' ? 'agent' : 'user',
      content,
      timestamp: new Date().toISOString(),
      platform: platform as 'instagram' | 'email' | 'voice'
    };

    // Create message for addMessageToThread (without id)
    const messageForThread = {
      content: newMessage.content,
      timestamp: newMessage.timestamp,
      platform: newMessage.platform,
      from: newMessage.from
    };

    addMessageToThread(selectedThread.creatorId, messageForThread);

    // Update selected thread
    const updatedThread: NegotiationThread = {
      ...selectedThread,
      messages: [...selectedThread.messages, newMessage],
      lastActivity: new Date().toISOString()
    };
    setSelectedThread(updatedThread);
  };

  const handleControlToggle = () => {
    if (!selectedThread) return;

    const newControlMode: ControlMode = selectedThread.controlMode === 'agent' ? 'user' : 'agent';
    const updatedThread: NegotiationThread = {
      ...selectedThread,
      controlMode: newControlMode
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

            {/* Chat & Control Panel - 6 columns */}
            <div className="col-span-12 lg:col-span-6">
              <NegotiationChatPanel
                selectedThread={selectedThread}
                onSendMessage={handleSendMessage}
                onControlToggle={handleControlToggle}
                onStatusChange={handleStatusChange}
              />
            </div>

            {/* Side Panel - 3 columns */}
            <div className="col-span-12 lg:col-span-3">
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
