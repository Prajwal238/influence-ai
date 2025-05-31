
import { Instagram, Youtube, Twitter, Linkedin, Users, Globe, Verified, Facebook } from "lucide-react";

interface Platform {
  name: string;
  handle: string;
  followers: string;
  engagement: string;
  verified: boolean;
  topBrand: string | null;
}

interface PlatformPillProps {
  platform: Platform;
}

const PlatformPill = ({ platform }: PlatformPillProps) => {
  const getPlatformIcon = (platformName: string) => {
    switch (platformName) {
      case 'instagram': return Instagram;
      case 'youtube': return Youtube;
      case 'twitter': return Twitter;
      case 'linkedin': return Linkedin;
      case 'facebook': return Facebook;
      case 'tiktok': return Users;
      default: return Globe;
    }
  };

  const getPlatformColor = (platformName: string) => {
    switch (platformName) {
      case 'instagram': return 'from-purple-500 to-pink-500';
      case 'youtube': return 'from-red-500 to-red-600';
      case 'twitter': return 'from-blue-400 to-blue-500';
      case 'linkedin': return 'from-blue-600 to-blue-700';
      case 'facebook': return 'from-blue-600 to-blue-800';
      case 'tiktok': return 'from-gray-800 to-black';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const IconComponent = getPlatformIcon(platform.name);

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center space-x-3">
        <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r ${getPlatformColor(platform.name)} text-white`}>
          <IconComponent className="h-4 w-4" />
        </div>
        <div>
          <div className="flex items-center space-x-1">
            <p className="font-medium text-sm capitalize">{platform.name}</p>
            {platform.verified && (
              <Verified className="h-3 w-3 text-blue-500 fill-current" />
            )}
          </div>
          <p className="text-xs text-gray-600">{platform.handle}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-sm">{platform.followers}</p>
        <p className="text-xs text-gray-500">{platform.engagement}</p>
      </div>
    </div>
  );
};

export default PlatformPill;
