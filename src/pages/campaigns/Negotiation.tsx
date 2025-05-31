
import { useState } from "react";
import CampaignLayout from "@/components/layout/CampaignLayout";
import ThreadsList from "@/components/negotiation/ThreadsList";
import ChatWindow from "@/components/negotiation/ChatWindow";
import FloatingChatButton from "@/components/agents/FloatingChatButton";
import { useOutreachData } from "@/hooks/useOutreachData";

// Re-export types for compatibility with existing components
interface Message {
  id: string;
  from: 'agent' | 'creator';
  content: string;
  timestamp: string;
  platform: 'instagram' | 'email' | 'voice';
}

interface Thread {
  creatorId: string;
  name: string;
  handle: string;
  platform: 'instagram' | 'email' | 'voice';
  messages: Message[];
  avatar?: string;
}

const Negotiation = () => {
  const [selectedThread, setSelectedThread] = useState<Thread | undefined>();
  const { threads, addMessageToThread } = useOutreachData();

  // Only show threads for influencers who have replied
  const repliedThreads = threads.filter(thread => 
    thread.status === 'replied' || thread.messages.length > 1
  );

  const handleSelectThread = (thread: Thread) => {
    setSelectedThread(thread);
  };

  const handleSendMessage = (content: string, platform: string) => {
    if (!selectedThread) return;

    addMessageToThread(selectedThread.creatorId, {
      from: 'agent',
      content,
      timestamp: new Date().toISOString(),
      platform: platform as 'instagram' | 'email' | 'voice'
    });

    // Update selected thread with the new message
    const updatedThread = repliedThreads.find(t => t.creatorId === selectedThread.creatorId);
    if (updatedThread) {
      setSelectedThread(updatedThread);
    }
  };

  return (
    <CampaignLayout>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Negotiation
            </h1>
            <p className="text-gray-600 mt-1">
              Manage conversations and close deals with creators
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
            {/* Threads List - 4 columns */}
            <div className="col-span-12 lg:col-span-4">
              <ThreadsList
                threads={repliedThreads}
                selectedThreadId={selectedThread?.creatorId}
                onSelectThread={handleSelectThread}
              />
            </div>

            {/* Chat Window - 8 columns */}
            <div className="col-span-12 lg:col-span-8">
              <ChatWindow
                selectedThread={selectedThread}
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <FloatingChatButton 
        agentName="Negotiation Agent"
        agentType="negotiation"
      />
    </CampaignLayout>
  );
};

export default Negotiation;
