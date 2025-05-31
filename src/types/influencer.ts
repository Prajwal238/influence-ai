
export interface ApiPlatform {
  _id: string;
  name: string;
  handle: string;
  followers: number;
  engagementRate: number;
  pastCollaborations: string[];
}

export interface ApiInfluencer {
  _id: string;
  name: string;
  bio: string;
  categories: string[];
  languages: string[];
  location: string;
  platforms: ApiPlatform[];
  profileImage: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Platform {
  name: string;
  handle: string;
  followers: string;
  engagement: string;
  verified: boolean;
  topBrand: string | null;
}

export interface Influencer {
  id: number;
  name: string;
  bio: string;
  location: string;
  image: string;
  totalFollowers: string;
  avgEngagement: string;
  languages: string[];
  rating: number;
  niches: string[];
  platforms: Platform[];
  campaignName?: string;
}
