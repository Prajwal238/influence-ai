
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-gradient-to-b from-white via-gray-50/30 to-white">
      {/* Subtle background element */}
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-blue-500/[0.03] rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-purple-500/[0.02] rounded-full blur-3xl"></div>
      
      <div className="relative w-full max-w-4xl mx-auto text-center">
        {/* Main headline - applying Gestalt principles for visual grouping */}
        <div className="mb-8">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-semibold text-gray-900 leading-[0.9] tracking-tight mb-6">
            Scale your
            <br />
            <span className="text-blue-600">influence</span>
          </h1>
          
          {/* Concise subheading */}
          <p className="text-xl sm:text-2xl text-gray-600 font-normal max-w-2xl mx-auto leading-relaxed">
            AI-powered influencer marketing from discovery to payment
          </p>
        </div>
        
        {/* CTA section - applying Hick's Law with single primary action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
          {/* Primary CTA - applying Fitts's Law with large, easily tappable button */}
          <Button 
            size="lg" 
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0 min-w-[200px] h-14"
          >
            Start Free Trial
            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          
          {/* Secondary action - minimalist link */}
          <button 
            onClick={() => window.open('https://youtu.be/C0tUlGmNxIg', '_blank')}
            className="flex items-center text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 group"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full mr-3 transition-colors duration-200">
              <Play className="h-4 w-4 ml-0.5" />
            </div>
            Watch Demo
          </button>
        </div>
        
        {/* Trust indicator */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-500 font-medium">
            Trusted by 500+ businesses worldwide
          </p>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
