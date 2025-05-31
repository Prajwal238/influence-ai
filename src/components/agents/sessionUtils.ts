
export const generateSessionId = (): string => {
  const randomBytes = new Uint8Array(16);
  crypto.getRandomValues(randomBytes);
  const base64String = btoa(String.fromCharCode(...randomBytes));
  return `session_${base64String.replace(/[+/=]/g, '')}`;
};

export const getCurrentSessionId = (agentType: string): string => {
  const stored = localStorage.getItem(`current-session-${agentType}`);
  if (stored) {
    return stored;
  }
  
  const newSessionId = generateSessionId();
  localStorage.setItem(`current-session-${agentType}`, newSessionId);
  return newSessionId;
};

export const startNewSession = (agentType: string): string => {
  const newSessionId = generateSessionId();
  localStorage.setItem(`current-session-${agentType}`, newSessionId);
  // Clear current conversation
  localStorage.removeItem(`agent-chat-${agentType}`);
  return newSessionId;
};
