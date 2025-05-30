
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Bot, X, MessageSquare, Mail, Phone, FileText } from "lucide-react";
import { AgentChatProps } from './types';

interface NegotiationInterfaceProps extends AgentChatProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

const NegotiationInterface = ({
  agentName,
  onClose,
  className,
  inputValue,
  setInputValue,
  handleSendMessage,
  handleKeyPress
}: NegotiationInterfaceProps) => {
  const contextChips = [
    { label: "Resend DM", action: () => console.log('Resend DM') },
    { label: "Finalize Deal", action: () => console.log('Finalize Deal') },
    { label: "Schedule Call", action: () => console.log('Schedule Call') },
    { label: "Send Contract", action: () => console.log('Send Contract') }
  ];

  return (
    <Card className={`h-full flex flex-col ${className}`}>
      <CardHeader className="border-b border-gray-100 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                {agentName}
              </CardTitle>
              <p className="text-sm text-gray-600">AI Assistant</p>
            </div>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 flex flex-col">
        <Tabs defaultValue="dms" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-4 mb-4 bg-gray-100 rounded-lg p-1">
            <TabsTrigger 
              value="dms" 
              className="text-xs data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-md"
            >
              <MessageSquare className="h-3 w-3 mr-1" />
              DMs
            </TabsTrigger>
            <TabsTrigger 
              value="emails" 
              className="text-xs data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-md"
            >
              <Mail className="h-3 w-3 mr-1" />
              Email
            </TabsTrigger>
            <TabsTrigger 
              value="calls" 
              className="text-xs data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-md"
            >
              <Phone className="h-3 w-3 mr-1" />
              Calls
            </TabsTrigger>
            <TabsTrigger 
              value="tasks" 
              className="text-xs data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-md"
            >
              <FileText className="h-3 w-3 mr-1" />
              Tasks
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="dms" className="h-full overflow-y-auto space-y-3">
              <div className="space-y-3">
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-sm text-gray-900">
                    "Based on the negotiation patterns, I recommend starting with a higher rate and gradually adjusting based on their response."
                  </p>
                  <p className="text-xs text-gray-500 mt-2">2 minutes ago</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm text-gray-900">
                    "The creator seems interested but price-sensitive. Consider offering package deals or additional perks."
                  </p>
                  <p className="text-xs text-gray-500 mt-2">5 minutes ago</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="emails" className="h-full overflow-y-auto">
              <div className="text-center py-8">
                <Mail className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  No email conversations yet
                </p>
              </div>
            </TabsContent>

            <TabsContent value="calls" className="h-full overflow-y-auto">
              <div className="text-center py-8">
                <Phone className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  No calls scheduled
                </p>
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="h-full overflow-y-auto">
              <div className="space-y-2">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Follow up with @creator_handle</p>
                  <p className="text-xs text-gray-600 mt-1">Due in 2 hours</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Send contract to 3 creators</p>
                  <p className="text-xs text-gray-600 mt-1">Due tomorrow</p>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>

      {/* Footer Input */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {contextChips.map((chip, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={chip.action}
                className="text-xs bg-white border-gray-300 text-blue-600 hover:bg-blue-50 rounded-full px-3 py-1 h-7"
              >
                {chip.label}
              </Button>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Negotiation Agent..."
              className="flex-1 rounded-lg border-gray-300 focus:border-blue-600 focus:ring-blue-600 text-sm"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 disabled:opacity-50"
            >
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NegotiationInterface;
