
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, Instagram, Mail, Phone, MessageSquare, Video, Play } from "lucide-react";
import { OutreachEntry } from "@/hooks/useOutreachData";

interface OutreachLogProps {
  outreachLog: OutreachEntry[];
}

const OutreachLog = ({ outreachLog }: OutreachLogProps) => {
  // Group entries by influencer ID and get the latest entry for each
  const getLatestEntriesPerInfluencer = (entries: OutreachEntry[]): OutreachEntry[] => {
    const influencerMap = new Map<number, OutreachEntry>();
    
    entries.forEach(entry => {
      const existing = influencerMap.get(entry.influencerId);
      if (!existing || entry.id > existing.id) {
        influencerMap.set(entry.influencerId, entry);
      }
    });
    
    return Array.from(influencerMap.values()).sort((a, b) => b.id - a.id);
  };

  const latestEntries = getLatestEntriesPerInfluencer(outreachLog);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "replied": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "declined": return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent": return "bg-yellow-100 text-yellow-800";
      case "replied": return "bg-green-100 text-green-800";
      case "declined": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram": return <Instagram className="h-3 w-3" />;
      case "email": return <Mail className="h-3 w-3" />;
      case "whatsapp": return <Phone className="h-3 w-3" />;
      default: return <MessageSquare className="h-3 w-3" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "instagram": return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
      case "email": return "bg-blue-500 text-white";
      case "whatsapp": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getMessageTypeDisplay = (template: string) => {
    if (template.includes("Video")) {
      return {
        icon: <Video className="h-3 w-3" />,
        text: "Video (Mock)",
        color: "bg-purple-100 text-purple-800"
      };
    }
    if (template.includes("Voice")) {
      return {
        icon: <MessageSquare className="h-3 w-3" />,
        text: "Voice",
        color: "bg-blue-100 text-blue-800"
      };
    }
    return {
      icon: <MessageSquare className="h-3 w-3" />,
      text: "Text",
      color: "bg-gray-100 text-gray-800"
    };
  };

  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Outreach Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {latestEntries.map((entry) => {
            const messageType = getMessageTypeDisplay(entry.template);
            return (
              <div key={entry.id} className="border border-gray-100 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{entry.influencer}</h4>
                    <p className="text-xs text-gray-600">{entry.handle}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(entry.status)}
                    <Badge className={getStatusColor(entry.status)}>
                      {entry.status}
                    </Badge>
                  </div>
                </div>
                
                {/* Message Type and Video Thumbnail */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge className={`${messageType.color} flex items-center space-x-1`}>
                      {messageType.icon}
                      <span>{messageType.text}</span>
                    </Badge>
                    
                    {entry.template.includes("Video") && (
                      <div className="bg-gray-100 rounded p-1 flex items-center space-x-1">
                        <Play className="h-3 w-3 text-gray-600" />
                        <span className="text-xs text-gray-600">mock_video.mp4</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    <p>{entry.template}</p>
                    <p>Sent {entry.sentAt}</p>
                  </div>
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(entry.platform)}`}>
                    {getPlatformIcon(entry.platform)}
                    <span className="capitalize">{entry.platform}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default OutreachLog;
