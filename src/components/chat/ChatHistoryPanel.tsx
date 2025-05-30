
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, History, Bot, User } from "lucide-react";
import { Message } from "./ConversationalAgent";

interface ChatSession {
  id: string;
  agentName: string;
  stage: string;
  messages: Message[];
  isActive: boolean;
}

interface Props {
  sessions: ChatSession[];
  isOpen: boolean;
  onToggle: () => void;
  onSessionSelect: (sessionId: string) => void;
}

const ChatHistoryPanel = ({ sessions, isOpen, onToggle, onSessionSelect }: Props) => {
  const [activeTab, setActiveTab] = useState("all");

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "creation": return "bg-purple-100 text-purple-800";
      case "discovery": return "bg-blue-100 text-blue-800";
      case "outreach": return "bg-yellow-100 text-yellow-800";
      case "negotiation": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className={`fixed right-0 top-0 h-full bg-white border-l border-gray-200 shadow-lg transition-all duration-300 z-50 ${
      isOpen ? 'w-80' : 'w-12'
    }`}>
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full bg-white border border-gray-200 rounded-r-none shadow-md"
      >
        {isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      {isOpen && (
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <History className="h-5 w-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Chat History</h3>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
              <TabsTrigger value="all">All Chats</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="flex-1 overflow-y-auto p-4 pt-2">
              <div className="space-y-3">
                {sessions.map((session) => (
                  <Card key={session.id} className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                    session.isActive ? 'border-blue-500' : 'border-gray-200'
                  }`} onClick={() => onSessionSelect(session.id)}>
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Bot className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-900">{session.agentName}</span>
                        </div>
                        <Badge className={getStageColor(session.stage)}>
                          {session.stage}
                        </Badge>
                      </div>
                      
                      {session.messages.length > 0 && (
                        <div className="text-xs text-gray-600">
                          <p className="truncate">{session.messages[session.messages.length - 1].content}</p>
                          <p className="mt-1">{formatTime(session.messages[session.messages.length - 1].timestamp)}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="active" className="flex-1 overflow-y-auto p-4 pt-2">
              <div className="space-y-3">
                {sessions.filter(s => s.isActive).map((session) => (
                  <Card key={session.id} className="cursor-pointer hover:bg-gray-50 transition-colors border-blue-500" onClick={() => onSessionSelect(session.id)}>
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Bot className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-900">{session.agentName}</span>
                        </div>
                        <Badge className={getStageColor(session.stage)}>
                          {session.stage}
                        </Badge>
                      </div>
                      
                      {session.messages.length > 0 && (
                        <div className="text-xs text-gray-600">
                          <p className="truncate">{session.messages[session.messages.length - 1].content}</p>
                          <p className="mt-1">{formatTime(session.messages[session.messages.length - 1].timestamp)}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default ChatHistoryPanel;
