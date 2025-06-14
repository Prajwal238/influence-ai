
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
      
      {/* Subtle geometric background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-purple-600 rounded-full blur-3xl"></div>
      </div>
      
      {/* Animated dots pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse animation-delay-300"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse animation-delay-150"></div>
        <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-indigo-400 rounded-full animate-pulse animation-delay-300"></div>
      </div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}></div>
      
      <div className="relative max-w-4xl mx-auto text-center flex-1 flex flex-col justify-center backdrop-blur-[0.5px]">
        {/* Badge with enhanced styling */}
        <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-medium mb-8 mx-auto border border-blue-200/50 shadow-sm backdrop-blur-sm">
          <span className="mr-2">🚀</span>
          AI-Powered Influencer Marketing Platform
        </div>
        
        {/* Main headline with enhanced typography */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
          Scale Your
          <span className="block mt-2">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Influencer Marketing</span>
          </span>
          <span className="block mt-2">
            <span className="text-gray-900">with </span>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">AI</span>
          </span>
        </h1>
        
        {/* Enhanced subheading */}
        <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          From discovery to payment — automate your entire influencer workflow. 
          Find creators, negotiate deals, and track performance all in one intelligent platform.
        </p>
        
        {/* Enhanced CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
          <Button 
            size="lg" 
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-5 text-lg rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-blue-500/20"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.open('https://youtu.be/C0tUlGmNxIg', '_blank')}
            className="border-2 border-gray-200 text-gray-700 hover:bg-white/80 hover:border-gray-300 px-10 py-5 text-lg rounded-2xl font-semibold backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>

        {/* Privacy policy link */}
        <p className="text-xs text-gray-500 mb-12">
          By signing up, you agree to our{" "}
          <a href="/privacy-policy" className="text-blue-600 hover:text-blue-500 underline">
            Privacy Policy
          </a>
        </p>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <p className="text-sm text-gray-500 mb-2 font-light">Scroll to explore</p>
        <div className="animate-bounce">
          <ChevronDown className="h-6 w-6 text-gray-400" />
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
