
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Star, Users, TrendingUp } from "lucide-react";

const LandingHero = () => {
  const trustLogos = [
    { name: "TechFlow", logo: "🚀" },
    { name: "Urban Bites", logo: "🍕" },
    { name: "Green Beauty", logo: "🌿" },
    { name: "City Sports", logo: "⚽" }
  ];

  const valuePills = [
    { icon: <TrendingUp className="h-4 w-4" />, text: "5x more campaigns" },
    { icon: <CheckCircle className="h-4 w-4" />, text: "Half the time" },
    { icon: <Users className="h-4 w-4" />, text: "AI-powered outreach" }
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Trust Badge */}
        <div className="inline-flex items-center bg-green-50 border border-green-200 rounded-full px-4 py-2 mb-8">
          <Star className="h-4 w-4 text-green-600 mr-2 fill-current" />
          <span className="text-sm font-semibold text-green-700">Trusted by 30+ brands</span>
          <span className="ml-2 text-green-600">• 400% average ROI</span>
        </div>

        {/* Main "Big Idea" Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
          Launch <span className="text-blue-600">5X More</span> 
          <span className="block mt-2">Micro‑influencer Campaigns</span>
          <span className="block mt-2 text-4xl sm:text-5xl lg:text-6xl">in Half the Time</span>
        </h1>
        
        {/* Supporting Subheadline */}
        <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
          AI handles discovery, outreach, and negotiation automatically.
          <span className="block mt-2 text-lg text-gray-500 font-medium">
            Stop spending weeks on manual DMs. Start scaling today.
          </span>
        </p>

        {/* Value Props Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {valuePills.map((prop, index) => (
            <div key={index} className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-gray-200">
              <div className="text-blue-600 mr-2">
                {prop.icon}
              </div>
              <span className="text-sm font-semibold text-gray-700">{prop.text}</span>
            </div>
          ))}
        </div>

        {/* Primary CTA */}
        <div className="mb-12">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center">
              Try AI-Powered Outreach Now
              <ArrowRight className="ml-3 h-6 w-6" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            <strong>Free 14-day trial</strong> • No credit card • Setup in 5 minutes
          </p>
        </div>

        {/* Social Proof - Enhanced */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm font-semibold text-gray-600 mb-2">
                Join industry leaders already scaling with AI
              </p>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-6">
                {trustLogos.map((company, index) => (
                  <div key={index} className="flex items-center space-x-2 text-gray-700">
                    <span className="text-2xl">{company.logo}</span>
                    <span className="font-medium text-sm">{company.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">300%</div>
                <div className="text-xs text-gray-500">Avg ROI Increase</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">85%</div>
                <div className="text-xs text-gray-500">Response Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
