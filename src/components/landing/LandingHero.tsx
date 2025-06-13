
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-12 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-60"></div>
      
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            🚀 AI-Powered Influencer Marketing Platform
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">
            Scale Your
            <span className="block">
              <span className="text-blue-600">Influencer Marketing</span>
              <span className="text-gray-900"> with </span>
              <span className="text-blue-600">AI</span>
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
            From discovery to payment — automate your entire influencer workflow. 
            Find creators, negotiate deals, and track performance all in one intelligent platform.
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg" 
              onClick={() => navigate('/login')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open('https://youtu.be/C0tUlGmNxIg', '_blank')}
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg rounded-xl font-semibold"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
          
          {/* Social proof */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-3">Trusted by 500+ growing businesses</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="bg-gray-200 h-8 w-20 rounded"></div>
              <div className="bg-gray-200 h-8 w-24 rounded"></div>
              <div className="bg-gray-200 h-8 w-16 rounded"></div>
              <div className="bg-gray-200 h-8 w-20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
