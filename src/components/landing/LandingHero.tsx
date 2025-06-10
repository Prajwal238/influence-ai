
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingHero = () => {
  const navigate = useNavigate();

  const trustLogos = [
    { name: "TechFlow", logo: "🚀" },
    { name: "Urban Bites", logo: "🍕" },
    { name: "Green Beauty", logo: "🌿" },
    { name: "City Sports", logo: "⚽" }
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
          Run <span className="text-blue-600">5X More</span> Micro‑influencer Campaigns
          <span className="block mt-2">in Half the Time</span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          AI-driven outreach, discovery, and analytics—everything in one platform.
          <span className="block mt-2 text-lg text-gray-500">
            From finding creators to closing deals, we automate the entire workflow.
          </span>
        </p>

        {/* Value Props */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">10x faster outreach</span>
          </div>
          <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">AI negotiation</span>
          </div>
          <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Real-time analytics</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mb-12">
          <Button 
            size="lg" 
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Start Free Trial
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
          <p className="text-sm text-gray-500 mt-3">
            No credit card required • 14-day free trial • Setup in 5 minutes
          </p>
        </div>

        {/* Trust Bar */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <p className="text-sm font-semibold text-gray-600 mb-4">
            Trusted by 30+ brands across industries
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {trustLogos.map((company, index) => (
              <div key={index} className="flex items-center space-x-2 text-gray-700">
                <span className="text-2xl">{company.logo}</span>
                <span className="font-medium text-sm">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
