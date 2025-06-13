
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Target, BarChart3, MessageSquare, Handshake, Shield } from "lucide-react";

const LandingFeatures = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-blue-600" />,
      title: "AI-Powered Discovery",
      description: "Find the perfect influencers using advanced ML algorithms that match your brand with high-converting creators."
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-blue-600" />,
      title: "Automated Outreach",
      description: "Scale your outreach with personalized messages that get 3x higher response rates than manual DMs."
    },
    {
      icon: <Handshake className="h-6 w-6 text-blue-600" />,
      title: "Smart Negotiation",
      description: "AI handles pricing discussions and contract terms, securing better deals while you focus on strategy."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
      title: "Real-time Analytics",
      description: "Track ROI, engagement, and conversions with detailed analytics that prove campaign value."
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: "Secure Payments",
      description: "Built-in escrow and milestone payments protect both brands and creators throughout campaigns."
    },
    {
      icon: <Target className="h-6 w-6 text-blue-600" />,
      title: "End-to-End Platform",
      description: "Manage everything from initial outreach to final payment in one integrated workflow."
    }
  ];

  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            ✨ Platform Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to scale
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From finding creators to measuring ROI — our AI handles the complex workflow 
            so you can focus on growing your business.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <CardContent className="p-0">
                <div className="mb-4 p-3 bg-blue-50 rounded-lg w-fit group-hover:bg-blue-100 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
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
