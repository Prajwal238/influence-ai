
import { Message } from './types';
import { buildApiUrl } from '@/config/api';

// Utility to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('jwt_token') || '';
};

export const getInitialGreeting = (type: string) => {
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
    const response = await fetch(buildApiUrl('/api/campaigns'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${getAuthToken()}`,
      },
      body: JSON.stringify({
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

export const generateAgentResponse = (userInput: string, type: string) => {
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
