
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Phone, MessageSquare, User, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { buildApiUrl } from "@/config/api";

interface CallMessage {
  role: "agent" | "user";
  message: string;
  time_in_call_secs: number;
  interrupted: boolean;
  tool_calls?: any[];
}

interface CallStatsData {
  transcript: CallMessage[];
  status: string;
  influencerInterest: string;
  callDurationSeconds: number;
}

interface NegotiationCallStatsTabProps {
  selectedThread?: {
    creatorId: string;
    name: string;
    platform: string;
  };
  campaignId?: string;
}

const NegotiationCallStatsTab = ({ selectedThread, campaignId }: NegotiationCallStatsTabProps) => {
  const [callData, setCallData] = useState<CallStatsData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchCallStats = async () => {
    if (!selectedThread || !campaignId) return;

    try {
      setLoading(true);
      
      const token = localStorage.getItem('jwt_token') || '';
      const response = await fetch(
        buildApiUrl(`/api/getConversation/${campaignId}/${encodeURIComponent(selectedThread.name)}`),
        {
          headers: {
            'Authorization': token,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch call stats');
      }

      const data: CallStatsData = await response.json();
      setCallData(data);
      
      toast({
        title: "Call stats loaded",
        description: "Successfully fetched conversation transcript",
      });
    } catch (err) {
      console.error('Error fetching call stats:', err);
      toast({
        title: "Failed to load call stats",
        description: "Could not fetch conversation data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedThread && campaignId) {
      fetchCallStats();
    }
  }, [selectedThread, campaignId]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTime = (timeInCallSecs: number) => {
    const mins = Math.floor(timeInCallSecs / 60);
    const secs = timeInCallSecs % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="px-6 py-8 text-center">
        <div className="animate-spin h-6 w-6 border-2 border-[#0071E3] border-t-transparent rounded-full mx-auto mb-2"></div>
        <p className="text-sm text-[#6E6E73] font-sans">Loading call stats...</p>
      </div>
    );
  }

  if (!callData) {
    return (
      <div className="px-6 py-8 text-center">
        <Phone className="h-8 w-8 text-[#6E6E73] mx-auto mb-2" />
        <p className="text-sm text-[#6E6E73] font-sans">No call data available</p>
      </div>
    );
  }

  return (
    <div className="px-6 h-full overflow-y-auto">
      <div className="space-y-6">
        {/* Call Overview */}
        <div>
          <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
            Call Overview
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F2F2F7] rounded-xl p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Clock className="h-4 w-4 text-[#6E6E73]" />
                <span className="text-xs font-medium text-[#6E6E73] font-sans">Duration</span>
              </div>
              <p className="text-sm font-semibold text-[#1D1D1F] font-sans">
                {formatDuration(callData.callDurationSeconds)}
              </p>
            </div>
            <div className="bg-[#F2F2F7] rounded-xl p-3">
              <div className="flex items-center space-x-2 mb-1">
                <MessageSquare className="h-4 w-4 text-[#6E6E73]" />
                <span className="text-xs font-medium text-[#6E6E73] font-sans">Messages</span>
              </div>
              <p className="text-sm font-semibold text-[#1D1D1F] font-sans">
                {callData.transcript.length}
              </p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div>
          <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
            Call Status
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6E6E73] font-sans">Status</span>
              <Badge variant={callData.status === 'done' ? 'default' : 'secondary'} className="text-xs">
                {callData.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6E6E73] font-sans">Interest Level</span>
              <Badge 
                variant={callData.influencerInterest === 'Interested' ? 'default' : 'secondary'} 
                className="text-xs"
              >
                {callData.influencerInterest}
              </Badge>
            </div>
          </div>
        </div>

        {/* Conversation Transcript */}
        <div>
          <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-3">
            Conversation Transcript
          </h4>
          <ScrollArea className="h-64">
            <div className="space-y-3">
              {callData.transcript.map((message, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-xl ${
                    message.role === 'agent' 
                      ? 'bg-[#E3F2FD] border-l-2 border-l-[#2196F3]' 
                      : 'bg-[#F2F2F7] border-l-2 border-l-[#6E6E73]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {message.role === 'agent' ? (
                        <Bot className="h-3 w-3 text-[#2196F3]" />
                      ) : (
                        <User className="h-3 w-3 text-[#6E6E73]" />
                      )}
                      <span className="text-xs font-medium text-[#1D1D1F] font-sans">
                        {message.role === 'agent' ? 'AI Agent' : 'Influencer'}
                      </span>
                      {message.interrupted && (
                        <Badge variant="outline" className="text-xs h-4">
                          Interrupted
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-[#6E6E73] font-sans">
                      {formatTime(message.time_in_call_secs)}
                    </span>
                  </div>
                  {message.message && (
                    <p className="text-xs text-[#1D1D1F] font-sans leading-relaxed">
                      {message.message}
                    </p>
                  )}
                  {message.tool_calls && message.tool_calls.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <p className="text-xs text-[#6E6E73] font-sans italic">
                        Tool called: {message.tool_calls[0]?.tool_name}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default NegotiationCallStatsTab;
