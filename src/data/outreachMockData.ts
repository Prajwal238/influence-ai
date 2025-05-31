
import { OutreachInfluencer, OutreachEntry, NegotiationThread, NegotiationMessage } from '@/types/outreach';

// Unified mock data - single source of truth
export const mockInfluencers: OutreachInfluencer[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    handle: "@sarahjfitness",
    followers: "125K",
    niche: "Fashion"
  },
  {
    id: 2,
    name: "Mike Chen",
    handle: "@mikechentech",
    followers: "89K",
    niche: "Tech"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    handle: "@emmalifestyle",
    followers: "200K",
    niche: "Lifestyle"
  },
];

// Create initial outreach entries with proper synchronization
export const createInitialOutreachLog = (): OutreachEntry[] => [
  {
    id: 1,
    influencer: "Sarah Johnson",
    handle: "@sarahjfitness",
    status: "replied",
    sentAt: "2 hours ago",
    template: "Fashion Collaboration",
    platform: "instagram",
    influencerId: 1
  },
  {
    id: 2,
    influencer: "Mike Chen",
    handle: "@mikechentech",
    status: "sent",
    sentAt: "1 day ago",
    template: "Tech Partnership",
    platform: "email",
    influencerId: 2
  },
  {
    id: 3,
    influencer: "Emma Rodriguez",
    handle: "@emmalifestyle",
    status: "replied",
    sentAt: "3 hours ago",
    template: "Lifestyle Brand",
    platform: "whatsapp",
    influencerId: 3
  },
];

// Create initial threads based on outreach entries
export const createInitialThreads = (outreachLog: OutreachEntry[]): NegotiationThread[] => {
  return outreachLog
    .filter(entry => entry.status === 'replied')
    .map(entry => {
      const influencer = mockInfluencers.find(inf => inf.id === entry.influencerId);
      if (!influencer) return null;

      const baseMessages: NegotiationMessage[] = [
        {
          id: `${entry.influencerId}_1`,
          from: "agent",
          content: `Hi ${influencer.name}! We'd love to collaborate with you on our upcoming ${influencer.niche.toLowerCase()} campaign. Would you be interested in discussing rates?`,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          platform: entry.platform as 'instagram' | 'email' | 'voice'
        },
        {
          id: `${entry.influencerId}_2`,
          from: "creator",
          content: "Hi! Yes, I'm definitely interested. What did you have in mind for the collaboration?",
          timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
          platform: entry.platform as 'instagram' | 'email' | 'voice'
        }
      ];

      // Add more messages for some threads
      if (entry.influencerId === 1) {
        baseMessages.push(
          {
            id: `${entry.influencerId}_3`,
            from: "agent",
            content: "We're looking at $500 for 3 posts and 5 stories. Would that work for you?",
            timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
            platform: entry.platform as 'instagram' | 'email' | 'voice'
          },
          {
            id: `${entry.influencerId}_4`,
            from: "creator",
            content: "That sounds fair! Can we discuss the content requirements in more detail?",
            timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
            platform: entry.platform as 'instagram' | 'email' | 'voice'
          }
        );
      }

      return {
        creatorId: entry.influencerId.toString(),
        name: influencer.name,
        handle: influencer.handle,
        platform: entry.platform as 'instagram' | 'email' | 'voice',
        avatar: "/api/placeholder/40/40",
        influencerId: entry.influencerId,
        status: entry.status,
        messages: baseMessages
      };
    })
    .filter(Boolean) as NegotiationThread[];
};
