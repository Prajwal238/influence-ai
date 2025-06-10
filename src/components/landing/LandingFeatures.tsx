
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Target, BarChart3, MessageSquare, Handshake, Users, Clock, TrendingUp } from "lucide-react";

const LandingFeatures = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "AI-Powered Discovery",
      description: "Find the perfect micro-influencers in seconds, not hours. Our AI matches you with creators who actually convert.",
      benefit: "10x faster discovery"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
      title: "Automated Outreach",
      description: "Send personalized messages at scale. Our AI crafts compelling pitches that get responses—no more manual DMing.",
      benefit: "85% response rate"
    },
    {
      icon: <Handshake className="h-8 w-8 text-blue-600" />,
      title: "AI Negotiation Assistant",
      description: "Let our AI handle pricing discussions while you focus on strategy. Get better rates with less back-and-forth.",
      benefit: "30% cost savings"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
      title: "Real-time Campaign Analytics",
      description: "Track ROI, engagement, and conversions as they happen. Make data-driven decisions with actionable insights.",
      benefit: "Full ROI visibility"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Relationship Management",
      description: "Build lasting partnerships with top-performing creators. Our CRM tracks every interaction and outcome.",
      benefit: "Higher retention"
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "Campaign Automation",
      description: "Set up entire campaigns to run on autopilot. From outreach to payment—everything happens automatically.",
      benefit: "90% time savings"
    }
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Everything you need to scale
            <span className="block text-blue-600">influencer marketing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our AI-powered platform handles every aspect of influencer marketing, 
            so you can focus on growing your business instead of managing campaigns.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 hover:-translate-y-2"
            >
              <CardContent className="p-0">
                <div className="mb-6">
                  <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm font-semibold text-green-600">
                    {feature.benefit}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-blue-50 rounded-full px-6 py-3">
            <span className="text-blue-700 font-medium">
              Ready to see it in action? 
            </span>
            <span className="ml-2 text-blue-600 font-semibold cursor-pointer hover:underline">
              Watch our 2-minute demo →
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingFeatures;
