
import { Card, CardContent } from "@/components/ui/card";
import { ChefHat, Calendar, Cpu, TrendingUp } from "lucide-react";

const LandingUseCases = () => {
  const useCases = [
    {
      icon: <ChefHat className="h-12 w-12 text-blue-600" />,
      title: "Restaurants & Cafes",
      description: "Partner with local foodies and vloggers to attract foot traffic and boost orders.",
      microCopy: "Tap footfall with local micro-influencers",
      stat: "3x more customers",
      bgImage: "🍽️"
    },
    {
      icon: <Calendar className="h-12 w-12 text-blue-600" />,
      title: "Event Organizers", 
      description: "Promote fitness events, community meetups, or concerts through micro-influencers.",
      microCopy: "Fill events faster with targeted promotion",
      stat: "85% sell-out rate",
      bgImage: "🎪"
    },
    {
      icon: <Cpu className="h-12 w-12 text-blue-600" />,
      title: "Tech & Gadget Companies",
      description: "Get early adopters and product reviewers talking about your launch.",
      microCopy: "Tech brands get 3x higher engagement",
      stat: "40% pre-order boost",
      bgImage: "💻"
    }
  ];

  return (
    <section className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Built for Every Business Size
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how businesses like yours are scaling with AI-powered influencer marketing
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {useCases.map((useCase, index) => (
            <Card 
              key={index} 
              className="p-8 text-center rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer relative overflow-hidden bg-white"
            >
              {/* Background decoration */}
              <div className="absolute top-4 right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">
                {useCase.bgImage}
              </div>
              
              <CardContent className="p-0 relative z-10">
                <div className="mb-6 flex justify-center transform group-hover:scale-110 transition-transform">
                  {useCase.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {useCase.title}
                </h3>
                
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <p className="text-sm font-medium text-blue-800">
                    {useCase.microCopy}
                  </p>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  {useCase.description}
                </p>
                
                <div className="inline-flex items-center space-x-2 text-green-600 font-semibold">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">{useCase.stat}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <div className="inline-block p-6 bg-white rounded-xl shadow-lg">
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-2">
              <strong>No matter your industry</strong> — if your audience is online, Inflowencer works for you.
            </p>
            <p className="text-sm text-gray-500">
              Join 2,000+ businesses already scaling with AI
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingUseCases;
