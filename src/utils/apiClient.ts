
// API client utility to handle JWT authentication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const apiClient = {
  get: async (endpoint: string) => {
    const token = localStorage.getItem('jwt_token');
    console.log('Making GET request to:', endpoint, 'with token:', token ? 'Present' : 'Missing');
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('GET response status:', response.status);

    if (response.status === 401) {
      console.log('Unauthorized response, clearing token and redirecting');
      localStorage.removeItem('jwt_token');
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    return response;
  },

  post: async (endpoint: string, data?: any) => {
    const token = localStorage.getItem('jwt_token');
    console.log('Making POST request to:', endpoint, 'with token:', token ? 'Present' : 'Missing');
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    console.log('POST response status:', response.status);

    if (response.status === 401) {
      console.log('Unauthorized response, clearing token and redirecting');
      localStorage.removeItem('jwt_token');
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    return response;
  },

  put: async (endpoint: string, data?: any) => {
    const token = localStorage.getItem('jwt_token');
    console.log('Making PUT request to:', endpoint, 'with token:', token ? 'Present' : 'Missing');
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    console.log('PUT response status:', response.status);

    if (response.status === 401) {
      console.log('Unauthorized response, clearing token and redirecting');
      localStorage.removeItem('jwt_token');
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    return response;
  },

  delete: async (endpoint: string) => {
    const token = localStorage.getItem('jwt_token');
    console.log('Making DELETE request to:', endpoint, 'with token:', token ? 'Present' : 'Missing');
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('DELETE response status:', response.status);

    if (response.status === 401) {
      console.log('Unauthorized response, clearing token and redirecting');
      localStorage.removeItem('jwt_token');
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    return response;
  },
};
