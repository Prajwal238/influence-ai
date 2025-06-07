
export interface ApiNegotiationResponse {
  _id: string;
  campaignId: string;
  influencerName: string;
  platform: string;
  __v: number;
  createdAt: string;
  messages: Array<{
    role: string;
    message: string;
  }>;
  updatedAt: string;
}

export interface PollMessageResponse {
  role: string;
  message: string;
}

export interface SendMessageRequest {
  role: string;
  message: string;
}

export interface AIResponseRequest {
  messages: Array<{
    role: string;
    message: string;
  }>;
}

export interface AIResponseResponse {
  type: string;
  message: string;
}
