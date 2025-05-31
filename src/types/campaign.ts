
export interface TargetAudience {
  location: string;
  ageRange: string;
  gender: string;
  interests: string[];
}

export interface Campaign {
  _id: string;
  campaignName: string;
  startDate: string;
  endDate: string;
  objective: string;
  totalBudget: number;
  preferredPlatforms: string[];
  languages: string[];
  targetAudience: TargetAudience;
  lastModifiedAt: string;
  userId: string;
  __v: number;
}
