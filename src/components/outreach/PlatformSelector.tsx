
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Instagram, Mail, Phone, MessageSquare } from "lucide-react";

interface PlatformSelectorProps {
  platforms: string[];
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
  disabled?: boolean;
}

const PlatformSelector = ({ platforms, selectedPlatform, onPlatformChange, disabled }: PlatformSelectorProps) => {
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram": return <Instagram className="h-3 w-3" />;
      case "email": return <Mail className="h-3 w-3" />;
      case "whatsapp": return <Phone className="h-3 w-3" />;
      default: return <MessageSquare className="h-3 w-3" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram": return "text-purple-600";
      case "email": return "text-blue-600";
      case "whatsapp": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  if (platforms.length <= 1) {
    // If only one platform, show it as a badge
    const platform = platforms[0] || 'instagram';
    return (
      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 ${getPlatformColor(platform)}`}>
        {getPlatformIcon(platform)}
        <span className="capitalize">{platform}</span>
      </div>
    );
  }

  return (
    <Select value={selectedPlatform} onValueChange={onPlatformChange} disabled={disabled}>
      <SelectTrigger className="w-[120px] h-8">
        <div className="flex items-center space-x-1">
          {getPlatformIcon(selectedPlatform)}
          <SelectValue placeholder="Platform" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {platforms.map((platform) => (
          <SelectItem key={platform} value={platform}>
            <div className="flex items-center space-x-2">
              {getPlatformIcon(platform)}
              <span className="capitalize">{platform}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PlatformSelector;
