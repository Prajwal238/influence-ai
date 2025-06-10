
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Target, BarChart3, MessageSquare, Handshake } from "lucide-react";

const LandingFeatures = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "AI-Powered Discovery",
      description: "Leverage machine learning to find the most relevant influencers based on your audience, goals, and category."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
      title: "Automated Outreach",
      description: "Send personalized messages at scale and track responses — no manual DMing required."
    },
    {
      icon: <Handshake className="h-8 w-8 text-blue-600" />,
      title: "Smart Negotiation",
      description: "Let our AI negotiator handle pricing discussions with influencers or take over whenever you wish."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
      title: "Real-time Analytics",
      description: "Get instant campaign insights — impressions, engagement, conversions, ROI, and more."
    },
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: "End-to-End Workflow",
      description: "From finding to paying influencers — our full-stack solution handles everything."
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
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
              className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-0">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingFeatures;
