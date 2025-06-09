
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Metallic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50"></div>
      
      {/* Metallic shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-y-1"></div>
      
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10"></div>
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.15) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
          Run Influencer Campaigns
          <span className="block text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
            with AI Assistance 🚀
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Discover, message, negotiate, and measure — all in one AI-powered dashboard.
        </p>
        <Button 
          size="lg" 
          onClick={() => navigate('/login')}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-blue-500/20"
        >
          Try Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default LandingHero;
