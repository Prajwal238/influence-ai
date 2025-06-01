
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Video, Play, Clock } from "lucide-react";

interface VideoMessageEditorProps {
  videoScript: string;
  onVideoScriptChange: (script: string) => void;
  voiceStyle: string;
  onVoiceStyleChange: (style: string) => void;
  selectedPlatform: string;
  onGenerateWithAI: () => void;
  isGenerating: boolean;
}

const VideoMessageEditor = ({ 
  videoScript, 
  onVideoScriptChange, 
  voiceStyle,
  onVoiceStyleChange,
  selectedPlatform,
  onGenerateWithAI,
  isGenerating 
}: VideoMessageEditorProps) => {
  const [hasGeneratedVideo, setHasGeneratedVideo] = useState(false);

  const voiceStyles = [
    "Friendly Female",
    "Professional Male", 
    "Youthful Tone",
    "Bold Narrator"
  ];

  const handleGenerateVideo = () => {
    setHasGeneratedVideo(true);
    onGenerateWithAI();
  };

  return (
    <div className="space-y-6">
      {/* Script Input */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Video Script
          </label>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleGenerateVideo}
            disabled={isGenerating || !videoScript.trim()}
            className="flex items-center space-x-2"
          >
            <Sparkles className="h-4 w-4" />
            <span>{isGenerating ? 'Generating...' : 'Mock Generate Video'}</span>
          </Button>
        </div>
        <Textarea 
          value={videoScript}
          onChange={(e) => onVideoScriptChange(e.target.value)}
          className="min-h-32 resize-none"
          placeholder="Write your campaign message to convert into a video..."
        />
      </div>

      {/* Voice Style Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Select Voice Style
        </label>
        <Select value={voiceStyle} onValueChange={onVoiceStyleChange}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {voiceStyles.map((style) => (
              <SelectItem key={style} value={style}>
                {style}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500">
          This video will be generated using Eleven Labs (UI-only demo — no actual generation)
        </p>
      </div>

      {/* Video Preview Card */}
      {hasGeneratedVideo && (
        <Card className="border border-gray-200 bg-gray-50">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Video className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">Video Preview</span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                  Powered by Eleven Labs
                </span>
              </div>
              
              {/* Mock Video Thumbnail */}
              <div className="relative bg-gray-200 rounded-lg aspect-video flex items-center justify-center group hover:bg-gray-300 transition-colors cursor-pointer">
                <div className="text-center">
                  <div className="bg-white rounded-full p-3 mb-2 shadow-sm group-hover:shadow-md transition-shadow">
                    <Play className="h-6 w-6 text-gray-600 ml-1" />
                  </div>
                  <p className="text-xs text-gray-600">demo_video_mock.mp4</p>
                </div>
              </div>

              {/* Generation Info */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>Generated just now</span>
                </div>
                <span>Voice: {voiceStyle}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-gray-500">
        Use variables like {"{name}"}, {"{followers}"}, and {"{niche}"} for personalization
      </p>
    </div>
  );
};

export default VideoMessageEditor;
