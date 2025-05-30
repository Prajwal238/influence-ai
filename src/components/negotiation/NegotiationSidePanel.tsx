
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Send, MessageSquare, Mail, Phone, CheckSquare } from "lucide-react";

const NegotiationSidePanel = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [chatInput, setChatInput] = useState("");

  const chatHistory = [
    {
      id: '1',
      type: 'user',
      content: "What's a good counter-offer for Sarah's $500 rate?",
      timestamp: new Date('2024-01-15T17:30:00')
    },
    {
      id: '2',
      type: 'agent',
      content: "Based on her engagement rate of 4.2% and 50K followers, $500 is actually fair market rate. I'd suggest accepting or asking for usage rights instead.",
      timestamp: new Date('2024-01-15T17:31:00')
    }
  ];

  const quickActions = [
    { label: "Resend DM", action: () => {} },
    { label: "Send Email", action: () => {} },
    { label: "Place Call", action: () => {} }
  ];

  if (isCollapsed) {
    return (
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
        <Button
          onClick={() => setIsCollapsed(false)}
          className="h-12 w-12 rounded-full bg-[#0071E3] hover:bg-[#005BB5] shadow-lg"
          size="icon"
        >
          <MessageSquare className="h-6 w-6 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <Card className="bg-[#FAFAFA] shadow-[0_0_10px_rgba(0,0,0,0.05)] rounded-2xl h-fit sticky top-6">
      <CardHeader className="border-b border-[#F2F2F7] pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-[#0071E3] text-white text-xs">NA</AvatarFallback>
            </Avatar>
            <CardTitle className="text-lg font-semibold text-[#1D1D1F] font-['SF_Pro_Display']">
              Negotiation Agent
            </CardTitle>
          </div>
          <Button
            onClick={() => setIsCollapsed(true)}
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-[#6E6E73] hover:bg-[#F2F2F7]"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs defaultValue="dms" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-transparent border-b border-[#F2F2F7] rounded-none">
            <TabsTrigger 
              value="dms" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#0071E3] data-[state=active]:bg-transparent rounded-none text-xs"
            >
              DMs
            </TabsTrigger>
            <TabsTrigger 
              value="emails"
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#0071E3] data-[state=active]:bg-transparent rounded-none text-xs"
            >
              Emails
            </TabsTrigger>
            <TabsTrigger 
              value="calls"
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#0071E3] data-[state=active]:bg-transparent rounded-none text-xs"
            >
              Calls
            </TabsTrigger>
            <TabsTrigger 
              value="tasks"
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#0071E3] data-[state=active]:bg-transparent rounded-none text-xs"
            >
              Tasks
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dms" className="p-4 space-y-3">
            <div className="space-y-2">
              <div className="text-xs text-[#6E6E73] font-['SF_Pro_Text']">Recent DMs</div>
              <div className="bg-white rounded-lg p-3 border border-[#F2F2F7]">
                <div className="text-sm text-[#1D1D1F] font-['SF_Pro_Text']">Last sent: "We're looking for 1 Instagram post..."</div>
                <div className="text-xs text-[#6E6E73] mt-1">2 hours ago</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="emails" className="p-4 space-y-3">
            <div className="text-xs text-[#6E6E73] font-['SF_Pro_Text']">No emails sent yet</div>
          </TabsContent>
          
          <TabsContent value="calls" className="p-4 space-y-3">
            <div className="text-xs text-[#6E6E73] font-['SF_Pro_Text']">No calls placed yet</div>
          </TabsContent>
          
          <TabsContent value="tasks" className="p-4 space-y-3">
            <div className="space-y-2">
              <div className="text-xs text-[#6E6E73] font-['SF_Pro_Text']">Contact Details</div>
              <div className="bg-white rounded-lg p-3 border border-[#F2F2F7]">
                <div className="text-sm text-[#1D1D1F] font-['SF_Pro_Text']">Sarah Johnson</div>
                <div className="text-xs text-[#6E6E73]">@sarahjohnson • 50K followers</div>
                <div className="text-xs text-[#6E6E73]">4.2% engagement rate</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Chat History */}
        <div className="p-4 border-t border-[#F2F2F7]">
          <div className="text-xs text-[#6E6E73] font-['SF_Pro_Text'] mb-3">Chat History</div>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {chatHistory.map((message) => (
              <div key={message.id} className="space-y-1">
                <div className={`text-xs px-3 py-2 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-white border border-[#F2F2F7] ml-4' 
                    : 'bg-[#F2F2F7] mr-4'
                }`}>
                  {message.content}
                </div>
                <div className="text-xs text-[#6E6E73] px-3">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Input */}
        <div className="p-4 border-t border-[#F2F2F7]">
          <div className="flex space-x-2 mb-3">
            <Input
              placeholder="Ask the Negotiation Agent..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 rounded-lg border-[#E0E0E0] focus:border-[#0071E3] text-sm"
            />
            <Button 
              size="icon"
              className="bg-[#0071E3] hover:bg-[#005BB5] rounded-lg"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Quick Action Chips */}
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                onClick={action.action}
                variant="outline"
                size="sm"
                className="text-xs rounded-full border-[#E0E0E0] text-[#6E6E73] hover:bg-[#F2F2F7]"
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NegotiationSidePanel;
