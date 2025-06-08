
import { apiClient } from '@/utils/apiClient';

// API configuration using Vite environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const apiConfig = {
  baseURL: API_BASE_URL,
  endpoints: {
    campaigns: `${API_BASE_URL}/api/user_123/campaigns`,
    influencers: `${API_BASE_URL}/api/user_123/influencers`,
    sessions: `${API_BASE_URL}/api/campaigns/user_123/sessions`,
    aiMessage: `${API_BASE_URL}/api/user_123/campaigns`,
  }
};

// Helper function to build API URLs
export const buildApiUrl = (path: string) => {
  return `${API_BASE_URL}${path}`;
};

// Export the JWT-enabled API client for protected requests
export { apiClient };
