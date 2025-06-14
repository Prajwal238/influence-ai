
export interface CallMessage {
  role: "agent" | "user";
  message: string;
  time_in_call_secs: number;
  interrupted: boolean;
  tool_calls?: any[];
}

export interface CallStatsData {
  transcript: CallMessage[];
  status: string;
  influencerInterest: string;
  callDurationSeconds: number;
}

export interface CallStatsProps {
  selectedThread?: {
    creatorId: string;
    name: string;
    platform: string;
  };
  campaignId?: string;
}
