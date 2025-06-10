
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Target, BarChart3, MessageSquare, Handshake, Users, Clock, TrendingUp, Star } from "lucide-react";

const LandingFeatures = () => {
  const heroFeature = {
    icon: <Zap className="h-12 w-12 text-blue-600" />,
    title: "AI-Powered Discovery",
    description: "Find perfect micro-influencers in seconds, not hours. Our AI matches you with creators who actually convert for your specific niche and audience.",
    benefit: "10x faster discovery",
    highlight: true,
    metric: "Save 20+ hours per campaign"
  };

  const features = [
    {
      icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
      title: "Automated Outreach",
      description: "Send personalized messages at scale. Our AI crafts compelling pitches that get responses.",
      benefit: "85% response rate",
      metric: "3x higher engagement"
    },
    {
      icon: <Handshake className="h-8 w-8 text-blue-600" />,
      title: "AI Negotiation",
      description: "Let AI handle pricing discussions. Get better rates with less back-and-forth.",
      benefit: "30% cost savings",
      metric: "Close deals 5x faster"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
      title: "Real-time Analytics",
      description: "Track ROI, engagement, and conversions as they happen. Make data-driven decisions.",
      benefit: "Full ROI visibility",
      metric: "400% avg ROI increase"
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "Campaign Automation",
      description: "Set up entire campaigns to run on autopilot. From outreach to payment—everything automatic.",
      benefit: "90% time savings",
      metric: "Launch in 5 minutes"
    }
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Launch 5X More Campaigns
            <span className="block text-blue-600">in Half the Time</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our AI platform automates every step of influencer marketing, 
            so you can scale without hiring specialists or spending weeks on manual work.
          </p>
        </div>

        {/* Hero Feature - Larger and Prominent */}
        <div className="mb-16">
          <Card className="group p-12 rounded-3xl bg-gradient-to-br from-blue-50 via-white to-purple-50 border-2 border-blue-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <div className="bg-blue-100 rounded-full p-2">
                <Star className="h-5 w-5 text-blue-600 fill-current" />
              </div>
            </div>
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="lg:w-2/3">
                  <div className="mb-6">
                    <div className="bg-blue-100 w-20 h-20 rounded-3xl flex items-center justify-center group-hover:bg-blue-200 transition-colors mb-4">
                      {heroFeature.icon}
                    </div>
                    <span className="text-sm font-bold text-blue-600 bg-blue-100 px-4 py-2 rounded-full">
                      🚀 Most Popular Feature
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {heroFeature.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {heroFeature.description}
                  </p>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-lg font-semibold text-green-600">
                        {heroFeature.benefit}
                      </span>
                    </div>
                    <div className="text-gray-500">•</div>
                    <span className="text-gray-700 font-medium">{heroFeature.metric}</span>
                  </div>
                </div>
                <div className="lg:w-1/3 text-center">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">10x</div>
                    <div className="text-gray-600">Faster Than Manual</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Regular Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            >
              <CardContent className="p-0">
                <div className="mb-6">
                  <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors group-hover:scale-110 duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {feature.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm font-semibold text-green-600">
                      {feature.benefit}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {feature.metric}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-8 py-4 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <span className="text-blue-700 font-semibold text-lg">
              Ready to see it in action? 
            </span>
            <span className="ml-3 text-blue-600 font-bold hover:underline">
              Watch 2-minute demo →
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingFeatures;
