
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
      
      <div className="relative max-w-4xl mx-auto text-center flex-1 flex flex-col justify-center">
        {/* Badge */}
        <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8 mx-auto">
          🚀 AI-Powered Influencer Marketing Platform
        </div>
        
        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
          Scale Your
          <span className="block mt-2">
            <span className="text-blue-600">Influencer Marketing</span>
          </span>
          <span className="block mt-2">
            <span className="text-gray-900">with </span>
            <span className="text-blue-600">AI</span>
          </span>
        </h1>
        
        {/* Subheading */}
        <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          From discovery to payment — automate your entire influencer workflow. 
          Find creators, negotiate deals, and track performance all in one intelligent platform.
        </p>
        
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            size="lg" 
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 text-lg rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.open('https://youtu.be/C0tUlGmNxIg', '_blank')}
            className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-10 py-5 text-lg rounded-2xl font-semibold"
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <p className="text-sm text-gray-500 mb-2">Scroll to explore</p>
        <div className="animate-bounce">
          <ChevronDown className="h-6 w-6 text-gray-400" />
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
