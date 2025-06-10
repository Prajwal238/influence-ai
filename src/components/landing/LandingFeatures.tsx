
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Target, BarChart3, MessageSquare, Handshake, Crown } from "lucide-react";

const LandingFeatures = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "AI-Powered Discovery",
      description: "Leverage machine learning to find the most relevant influencers based on your audience, goals, and category.",
      isHero: true,
      stats: "50x faster than manual search"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
      title: "Automated Outreach",
      description: "Send personalized messages at scale and track responses — no manual DMing required.",
      stats: "90% response rate"
    },
    {
      icon: <Handshake className="h-8 w-8 text-blue-600" />,
      title: "Smart Negotiation",
      description: "Let our AI negotiator handle pricing discussions with influencers or take over whenever you wish.",
      stats: "30% better rates"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
      title: "Real-time Analytics",
      description: "Get instant campaign insights — impressions, engagement, conversions, ROI, and more.",
      stats: "Live tracking"
    },
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: "End-to-End Workflow",
      description: "From finding to paying influencers — our full-stack solution handles everything.",
      stats: "One platform"
    }
  ];

  return (
    <section id="features" className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything you need to scale
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform handles every aspect of influencer marketing, 
            from finding creators to managing campaigns.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer group ${
                feature.isHero 
                  ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 relative overflow-hidden' 
                  : 'bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-blue-200'
              }`}
            >
              {feature.isHero && (
                <div className="absolute top-4 right-4">
                  <Crown className="h-5 w-5 text-yellow-500" />
                </div>
              )}
              
              <CardContent className="p-0">
                <div className="mb-4 transform transition-transform group-hover:scale-110">
                  {feature.icon}
                </div>
                
                <h3 className={`text-lg font-semibold mb-2 ${
                  feature.isHero ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {feature.title}
                  {feature.isHero && (
                    <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                      HERO FEATURE
                    </span>
                  )}
                </h3>
                
                <p className={`text-sm leading-relaxed mb-3 ${
                  feature.isHero ? 'text-blue-800' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
                
                <div className={`text-xs font-medium ${
                  feature.isHero ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {feature.stats}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingFeatures;
