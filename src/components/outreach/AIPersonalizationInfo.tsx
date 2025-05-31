
import { Sparkles } from "lucide-react";

interface AIPersonalizationInfoProps {
  selectedInfluencersCount: number;
  sendAsVoice: boolean;
}

const AIPersonalizationInfo = ({ selectedInfluencersCount, sendAsVoice }: AIPersonalizationInfoProps) => {
  if (selectedInfluencersCount <= 1) return null;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-2">
        <Sparkles className="h-4 w-4 text-purple-600" />
        <span className="text-sm font-medium text-purple-900">AI Bulk Personalization</span>
      </div>
      <p className="text-sm text-purple-800">
        Each {sendAsVoice ? 'voice' : 'text'} message will be automatically personalized for individual influencers based on their profile, niche, and engagement style.
      </p>
    </div>
  );
};

export default AIPersonalizationInfo;
