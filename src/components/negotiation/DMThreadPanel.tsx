
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User } from "lucide-react";
import DMDraftModal from "./DMDraftModal";

interface Message {
  id: string;
  type: 'agent' | 'user' | 'influencer';
  content: string;
  timestamp: Date;
  sender?: string;
}

const DMThreadPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const messages: Message[] = [
    {
      id: '1',
      type: 'user',
      content: "Hi Sarah! We'd love to collaborate with you on our summer campaign. Are you interested?",
      timestamp: new Date('2024-01-15T14:30:00'),
      sender: 'Brand Team'
    },
    {
      id: '2',
      type: 'influencer',
      content: "Hi! Yes, I'd be interested. What did you have in mind?",
      timestamp: new Date('2024-01-15T14:45:00'),
      sender: 'Sarah Johnson'
    },
    {
      id: '3',
      type: 'user',
      content: "We're looking for 1 Instagram post and 1 story featuring our new summer collection. What would your rate be?",
      timestamp: new Date('2024-01-15T15:00:00'),
      sender: 'Brand Team'
    },
    {
      id: '4',
      type: 'influencer',
      content: "I can do $500 for the Instagram post and story. When would you need it by?",
      timestamp: new Date('2024-01-15T17:30:00'),
      sender: 'Sarah Johnson'
    },
    {
      id: '5',
      type: 'agent',
      content: "Based on market rates, I suggest responding with: 'That sounds reasonable! We'd need the content by next Friday. Can we also add usage rights for 6 months?'",
      timestamp: new Date('2024-01-15T17:35:00'),
      sender: 'Negotiation Agent'
    }
  ];

  const getBubbleStyles = (type: string) => {
    switch (type) {
      case 'agent':
        return 'bg-[#F2F2F7] text-[#1D1D1F] max-w-[80%] ml-0';
      case 'user':
        return 'bg-white border border-[#E0E0E0] text-[#1D1D1F] max-w-[80%] ml-auto';
      case 'influencer':
        return 'bg-[#0071E3] text-white max-w-[80%] ml-0';
      default:
        return 'bg-[#F2F2F7] text-[#1D1D1F] max-w-[80%] ml-0';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'agent':
        return <Bot className="h-4 w-4 text-[#0071E3]" />;
      case 'user':
        return <User className="h-4 w-4 text-[#6E6E73]" />;
      case 'influencer':
        return <Avatar className="h-6 w-6"><AvatarFallback className="text-xs">SJ</AvatarFallback></Avatar>;
      default:
        return <Bot className="h-4 w-4 text-[#0071E3]" />;
    }
  };

  return (
    <>
      <Card className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.05)] rounded-2xl">
        <CardHeader className="border-b border-[#F2F2F7] pb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-[#F2F2F7] text-[#1D1D1F]">SJ</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl font-semibold text-[#1D1D1F] font-['SF_Pro_Display']">
                Sarah Johnson
              </CardTitle>
              <p className="text-sm text-[#6E6E73] font-['SF_Pro_Text']">@sarahjohnson</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Messages */}
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(message.type)}
                </div>
                <div className={`rounded-2xl p-3 ${getBubbleStyles(message.type)}`}>
                  <p className="text-sm font-['SF_Pro_Text']">{message.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs opacity-75">
                      {message.sender}
                    </p>
                    <p className="text-xs opacity-75">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Draft & Send Button */}
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-[#0071E3] hover:bg-[#005BB5] text-white rounded-full py-3 font-['SF_Pro_Text'] font-medium transition-all duration-200"
          >
            <Send className="h-4 w-4 mr-2" />
            Draft & Send DM
          </Button>
        </CardContent>
      </Card>

      <DMDraftModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default DMThreadPanel;
