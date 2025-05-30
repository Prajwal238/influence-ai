
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Bot, User, MessageSquare, Mail, Phone, FileText, X } from "lucide-react";

export interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

interface AgentChatProps {
  agentName: string;
  agentType: 'campaign' | 'discovery' | 'outreach' | 'negotiation';
  onClose?: () => void;
  className?: string;
}

const AgentChat = ({ agentName, agentType, onClose, className }: AgentChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load conversation history from localStorage
    const savedMessages = localStorage.getItem(`agent-chat-${agentType}`);
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);
      // Convert timestamp strings back to Date objects
      const messagesWithDates = parsedMessages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      setMessages(messagesWithDates);
    } else {
      // Initial greeting message
      const greeting = getInitialGreeting(agentType);
      setMessages([{
        id: '1',
        type: 'agent',
        content: greeting,
        timestamp: new Date()
      }]);
    }
  }, [agentType]);

  useEffect(() => {
    // Save conversation history to localStorage
    if (messages.length > 0) {
      localStorage.setItem(`agent-chat-${agentType}`, JSON.stringify(messages));
    }
  }, [messages, agentType]);

  const getInitialGreeting = (type: string) => {
    switch (type) {
      case 'campaign':
        return "Hi! I'm your Campaign Agent. I'll help you create a new campaign step by step. What kind of campaign would you like to create?";
      case 'discovery':
        return "Hello! I'm your Discovery Agent. I can help you find the perfect influencers for your campaign. What type of influencers are you looking for?";
      case 'outreach':
        return "Hi there! I'm your Outreach Agent. I can help you craft personalized messages and manage your outreach campaigns. How can I assist you today?";
      case 'negotiation':
        return "Welcome! I'm your Negotiation Agent. I can help you negotiate terms, rates, and deliverables with influencers. What would you like to discuss?";
      default:
        return "Hello! How can I help you today?";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: generateAgentResponse(inputValue, agentType),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateAgentResponse = (userInput: string, type: string) => {
    // Simple response generation based on agent type and user input
    const responses = {
      campaign: [
        "I can help you create that campaign! Let me gather some details. What's your target audience?",
        "That sounds like a great campaign idea! What's your budget range?",
        "Perfect! Let me help you set up the campaign structure. What are your main objectives?"
      ],
      discovery: [
        "I can help you find influencers matching those criteria. Let me search our database.",
        "Based on your requirements, I recommend focusing on micro-influencers in that niche.",
        "I found some great matches! Would you like me to show you their engagement rates?"
      ],
      outreach: [
        "I can craft a personalized message for that campaign. Here's a template to start with...",
        "Great choice! I'll help you optimize the message for better response rates.",
        "Let me suggest some improvements to increase your outreach success."
      ],
      negotiation: [
        "I can help you negotiate those terms. Based on market rates, here's what I recommend...",
        "That's a reasonable offer. I suggest adding these deliverables to maximize value.",
        "Let me analyze their engagement rates to determine fair compensation."
      ]
    };

    const typeResponses = responses[type as keyof typeof responses] || responses.campaign;
    return typeResponses[Math.floor(Math.random() * typeResponses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const contextChips = [
    { label: "Resend DM", action: () => console.log('Resend DM') },
    { label: "Finalize Deal", action: () => console.log('Finalize Deal') },
    { label: "Schedule Call", action: () => console.log('Schedule Call') },
    { label: "Send Contract", action: () => console.log('Send Contract') }
  ];

  // Render negotiation-specific interface
  if (agentType === 'negotiation') {
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
  }

  // Default chat interface for other agent types
  return (
    <Card className={`h-full flex flex-col ${className}`}>
      <CardHeader className="border-b border-gray-100 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5 text-blue-600" />
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
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.type === 'agent' && (
                    <Bot className="h-4 w-4 mt-0.5 text-blue-600" />
                  )}
                  {message.type === 'user' && (
                    <User className="h-4 w-4 mt-0.5 text-white" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-blue-600" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentChat;
