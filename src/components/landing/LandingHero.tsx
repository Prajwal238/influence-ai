
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Big idea approach */}
        <div className="inline-flex items-center px-4 py-2 mb-8 text-sm font-medium text-blue-600 bg-blue-50 rounded-full border border-blue-200">
          <Zap className="w-4 h-4 mr-2" />
          Launch 5X More Campaigns in Half the Time
        </div>
        
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 tracking-tight leading-tight">
          Run Influencer Campaigns
          <span className="block text-blue-600 relative">
            with AI Assistance
            <span className="text-4xl sm:text-5xl lg:text-6xl">🚀</span>
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Discover, message, negotiate, and measure — all in one AI-powered dashboard.
          <span className="block mt-2 font-semibold text-gray-800">
            Stop spending weeks on what AI can do in hours.
          </span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            Start Your First Campaign
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <div className="text-sm text-gray-500">
            ⚡ Setup in 2 minutes • No credit card required
          </div>
        </div>
        
        {/* Social proof */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Trusted by 2,000+ businesses</p>
          <div className="flex items-center justify-center space-x-8 opacity-60">
            {['TechFlow', 'Urban Bites', 'Green Beauty', 'City Sports'].map((brand) => (
              <div key={brand} className="text-lg font-semibold text-gray-400">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
