
import { useState } from "react";
import CampaignLayout from "@/components/layout/CampaignLayout";
import ThreadsList from "@/components/negotiation/ThreadsList";
import ChatWindow from "@/components/negotiation/ChatWindow";
import AgentSidePanel from "@/components/negotiation/AgentSidePanel";

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

// Mock data - replace with actual API calls
const mockThreads: Thread[] = [
  {
    creatorId: "1",
    name: "Sarah Johnson",
    handle: "@sarahjfitness",
    platform: "instagram",
    avatar: "/api/placeholder/40/40",
    messages: [
      {
        id: "1",
        from: "agent",
        content: "Hi Sarah! We'd love to collaborate with you on our upcoming fitness campaign. Would you be interested in discussing rates?",
        timestamp: "2024-01-15T10:00:00Z",
        platform: "instagram"
      },
      {
        id: "2",
        from: "creator",
        content: "Hi! Yes, I'm definitely interested. What did you have in mind for the collaboration?",
        timestamp: "2024-01-15T10:30:00Z",
        platform: "instagram"
      },
      {
        id: "3",
        from: "agent",
        content: "We're looking at $500 for 3 posts and 5 stories. Would that work for you?",
        timestamp: "2024-01-15T11:00:00Z",
        platform: "instagram"
      },
      {
        id: "4",
        from: "creator",
        content: "That sounds fair! Can we discuss the content requirements in more detail?",
        timestamp: "2024-01-15T11:15:00Z",
        platform: "instagram"
      }
    ]
  },
  {
    creatorId: "2",
    name: "Mike Chen",
    handle: "@mikechentech",
    platform: "email",
    avatar: "/api/placeholder/40/40",
    messages: [
      {
        id: "5",
        from: "agent",
        content: "Hello Mike, we've been following your tech content and would love to partner with you for our product launch.",
        timestamp: "2024-01-14T15:00:00Z",
        platform: "email"
      },
      {
        id: "6",
        from: "creator",
        content: "Thanks for reaching out! I'd be happy to learn more about the partnership opportunity.",
        timestamp: "2024-01-14T16:30:00Z",
        platform: "email"
      }
    ]
  },
  {
    creatorId: "3",
    name: "Emma Rodriguez",
    handle: "@emmalifestyle",
    platform: "voice",
    avatar: "/api/placeholder/40/40",
    messages: [
      {
        id: "7",
        from: "agent",
        content: "Hi Emma! We left you a voice message about our lifestyle brand collaboration. Please let us know your thoughts!",
        timestamp: "2024-01-13T09:00:00Z",
        platform: "voice"
      },
      {
        id: "8",
        from: "creator",
        content: "Thanks for the voice note! I'm interested and would like to schedule a call to discuss further.",
        timestamp: "2024-01-13T12:00:00Z",
        platform: "voice"
      }
    ]
  }
];

const Negotiation = () => {
  const [selectedThread, setSelectedThread] = useState<Thread | undefined>();
  const [threads, setThreads] = useState<Thread[]>(mockThreads);
  const [isAgentCollapsed, setIsAgentCollapsed] = useState(false);

  const handleSelectThread = (thread: Thread) => {
    setSelectedThread(thread);
  };

  const handleSendMessage = (content: string, platform: string) => {
    if (!selectedThread) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      from: 'agent',
      content,
      timestamp: new Date().toISOString(),
      platform: platform as 'instagram' | 'email' | 'voice'
    };

    setThreads(prevThreads =>
      prevThreads.map(thread =>
        thread.creatorId === selectedThread.creatorId
          ? { ...thread, messages: [...thread.messages, newMessage] }
          : thread
      )
    );

    // Update selected thread
    setSelectedThread(prev =>
      prev ? { ...prev, messages: [...prev.messages, newMessage] } : prev
    );
  };

  return (
    <CampaignLayout>
      <div className="min-h-screen bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-[#1D1D1F] font-['SF_Pro_Display']">
              Negotiation
            </h1>
            <p className="text-[#6E6E73] font-['SF_Pro_Text'] mt-1">
              Manage conversations and close deals with creators
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
            {/* Threads List - 3 columns */}
            <div className="col-span-12 lg:col-span-3">
              <ThreadsList
                threads={threads}
                selectedThreadId={selectedThread?.creatorId}
                onSelectThread={handleSelectThread}
              />
            </div>

            {/* Chat Window - 6 columns */}
            <div className="col-span-12 lg:col-span-6">
              <ChatWindow
                selectedThread={selectedThread}
                onSendMessage={handleSendMessage}
              />
            </div>

            {/* Agent Side Panel - 3 columns */}
            <div className="col-span-12 lg:col-span-3">
              <AgentSidePanel
                isCollapsed={isAgentCollapsed}
                onToggleCollapse={() => setIsAgentCollapsed(!isAgentCollapsed)}
              />
            </div>
          </div>
        </div>
      </div>
    </CampaignLayout>
  );
};

export default Negotiation;
