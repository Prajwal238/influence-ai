
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

  const getPlatformColors = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram": 
        return {
          bg: "bg-gradient-to-r from-purple-500 to-pink-500",
          text: "text-white",
          border: "border-purple-200",
          hover: "hover:from-purple-600 hover:to-pink-600"
        };
      case "email": 
        return {
          bg: "bg-blue-500",
          text: "text-white",
          border: "border-blue-200",
          hover: "hover:bg-blue-600"
        };
      case "whatsapp": 
        return {
          bg: "bg-green-500",
          text: "text-white",
          border: "border-green-200",
          hover: "hover:bg-green-600"
        };
      default: 
        return {
          bg: "bg-gray-500",
          text: "text-white",
          border: "border-gray-200",
          hover: "hover:bg-gray-600"
        };
    }
  };

  if (platforms.length <= 1) {
    // If only one platform, show it as a styled badge
    const platform = platforms[0] || 'instagram';
    const colors = getPlatformColors(platform);
    return (
      <div className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text} shadow-sm`}>
        {getPlatformIcon(platform)}
        <span className="capitalize">{platform}</span>
      </div>
    );
  }

  const selectedColors = getPlatformColors(selectedPlatform);

  return (
    <Select value={selectedPlatform} onValueChange={onPlatformChange} disabled={disabled}>
      <SelectTrigger className={`w-[120px] h-8 ${selectedColors.bg} ${selectedColors.text} ${selectedColors.border} ${selectedColors.hover} border-0`}>
        <SelectValue>
          <div className="flex items-center space-x-1">
            {getPlatformIcon(selectedPlatform)}
            <span className="capitalize">{selectedPlatform}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
        {platforms.map((platform) => {
          const colors = getPlatformColors(platform);
          return (
            <SelectItem key={platform} value={platform} className="hover:bg-gray-50">
              <div className={`flex items-center space-x-2 px-2 py-1 rounded-md ${colors.bg} ${colors.text}`}>
                {getPlatformIcon(platform)}
                <span className="capitalize">{platform}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default PlatformSelector;
