
import { apiClient } from '@/utils/apiClient';

// API configuration using Vite environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const apiConfig = {
  baseURL: API_BASE_URL,
  endpoints: {
    campaigns: `${API_BASE_URL}/api/campaigns`,
    influencers: `${API_BASE_URL}/api/influencers`,
    sessions: `${API_BASE_URL}/api/campaigns/sessions`,
    aiMessage: `${API_BASE_URL}/api/campaigns`,
  }
};

// Helper function to build API URLs
export const buildApiUrl = (path: string) => {
  return `${API_BASE_URL}${path}`;
};

// Export the JWT-enabled API client for protected requests
export { apiClient };
