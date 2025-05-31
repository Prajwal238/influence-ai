
import { Instagram, Youtube, Twitter, Linkedin, Users, Globe } from "lucide-react";

export const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'instagram': return Instagram;
    case 'youtube': return Youtube;
    case 'twitter': return Twitter;
    case 'linkedin': return Linkedin;
    case 'tiktok': return Users;
    default: return Globe;
  }
};

export const getPlatformColor = (platform: string) => {
  switch (platform) {
    case 'instagram': return 'from-purple-500 to-pink-500';
    case 'youtube': return 'from-red-500 to-red-600';
    case 'twitter': return 'from-blue-400 to-blue-500';
    case 'linkedin': return 'from-blue-600 to-blue-700';
    case 'tiktok': return 'from-gray-800 to-black';
    default: return 'from-gray-400 to-gray-500';
  }
};
