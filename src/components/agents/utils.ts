
import { Message } from './types';

export const getInitialGreeting = (type: string, isAnalyticsContext?: boolean) => {
  // Special handling for analytics context (when used on reporting page)
  if (type === 'campaign' && isAnalyticsContext) {
    return "Hi! I'm your Analytics Agent. I can help you understand your campaign performance, analyze engagement metrics, ROI data, and provide insights about your influencer results. What would you like to know about your campaign performance?";
  }

  switch (type) {
    case 'campaign':
      return "Hi! I'm your Campaign Agent. I'll help you create a new campaign step by step. Please describe your campaign idea including details like name, budget, target audience, platforms, dates, and any other requirements.";
    case 'discovery':
      return "Hello! I'm your Discovery Agent. I can help you find the perfect influencers for your campaign. What type of influencers are you looking for?";
    case 'outreach':
      return "Hi there! I'm your Outreach Agent. I can help you craft personalized messages and manage your outreach campaigns. How can I assist you today?";
    case 'negotiation':
      return "Welcome! I'm your Negotiation Agent. I can help you negotiate terms, rates, and deliverables with influencers. What would you like to discuss?";
    default:
      return "Hello! How can I help you today?";
  }
};

export const callCampaignAPI = async (prompt: string, sessionId: string) => {
  try {
    const response = await fetch('http://localhost:5000/api/campaigns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: "user_123", // This should come from actual user context
        prompt: prompt,
        sessionId: sessionId
      })
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export const generateAgentResponse = (userInput: string, type: string, isAnalyticsContext?: boolean) => {
  // Check if this is being used in a reporting/analytics context
  const isAnalyticsRelated = userInput.toLowerCase().includes('performance') || 
                            userInput.toLowerCase().includes('analytics') || 
                            userInput.toLowerCase().includes('roi') || 
                            userInput.toLowerCase().includes('engagement') ||
                            userInput.toLowerCase().includes('impressions') ||
                            userInput.toLowerCase().includes('reach') ||
                            userInput.toLowerCase().includes('metrics') ||
                            userInput.toLowerCase().includes('data') ||
                            isAnalyticsContext;

  if (type === 'campaign' && (isAnalyticsRelated || isAnalyticsContext)) {
    const analyticsResponses = [
      "Based on your campaign data, I can see that your engagement rate is 18% above industry benchmarks. Your Instagram Stories are performing particularly well with a 4.2% engagement rate.",
      "Looking at the performance metrics, Sarah Johnson is your top performer with 560% ROI. Her content generates the highest engagement rates across all platforms.",
      "Your campaign reached 2.4M people with 186K engagements. The peak engagement time is between 7-9 PM EST. Would you like me to analyze specific platform performance?",
      "The ROI analysis shows impressive results - you've generated $7,200 revenue from a $1,900 investment, achieving a 279% ROI. TikTok is driving the highest engagement numbers.",
      "Your impressions have grown steadily from 45K to 92K over the campaign period. The reach-to-impression ratio suggests good content quality and audience targeting.",
      "The engagement breakdown shows TikTok leading with 78K likes, followed by Instagram with 45K likes. Comments are highest on TikTok at 4.5K, indicating strong audience interaction.",
      "Your campaign's performance trend shows consistent growth. The steepest increase was between July 15-22, coinciding with Sarah Johnson's Instagram story series.",
      "Cost per engagement is $0.012, which is 23% below industry average. Your content resonates well with the target demographic, particularly the 18-34 age group."
    ];
    return analyticsResponses[Math.floor(Math.random() * analyticsResponses.length)];
  }

  // Default responses for other contexts
  const responses = {
    campaign: [
      "I can help you create that campaign! Let me gather some details. What's your target audience?",
      "That sounds like a great campaign idea! What's your budget range?",
      "Perfect! Let me help you set up the campaign structure. What are your main objectives?"
    ],
    discovery: [
      "I can help you find influencers matching those criteria. Let me search our database.",
      "Based on your requirements, I recommend focusing on micro-influencers in that niche.",
      "I found some great matches! Would you like me to show you their engagement rates?"
    ],
    outreach: [
      "I can craft a personalized message for that campaign. Here's a template to start with...",
      "Great choice! I'll help you optimize the message for better response rates.",
      "Let me suggest some improvements to increase your outreach success."
    ],
    negotiation: [
      "I can help you negotiate those terms. Based on market rates, here's what I recommend...",
      "That's a reasonable offer. I suggest adding these deliverables to maximize value.",
      "Let me analyze their engagement rates to determine fair compensation."
    ]
  };

  const typeResponses = responses[type as keyof typeof responses] || responses.campaign;
  return typeResponses[Math.floor(Math.random() * typeResponses.length)];
};
