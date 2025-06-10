
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap, Star, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingCTA = () => {
  const navigate = useNavigate();

  const benefits = [
    "Setup in under 5 minutes",
    "No credit card required", 
    "14-day free trial",
    "Cancel anytime"
  ];

  const finalStats = [
    { number: "5X", label: "More Campaigns" },
    { number: "50%", label: "Less Time" },
    { number: "85%", label: "Response Rate" },
    { number: "400%", label: "Avg ROI" }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-5xl mx-auto text-center">
        {/* Main CTA Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100 relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100 to-transparent rounded-full transform translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-100 to-transparent rounded-full transform -translate-x-24 translate-y-24"></div>
          
          <div className="relative z-10">
            {/* Success Badge */}
            <div className="bg-green-50 border border-green-200 rounded-full px-6 py-3 inline-flex items-center mx-auto mb-8">
              <Star className="h-5 w-5 text-green-600 mr-2 fill-current" />
              <span className="text-green-700 font-semibold">Join 30+ brands already scaling with AI</span>
            </div>

            {/* Final Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {finalStats.map((stat, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Ready to Launch 5X More
              <span className="block text-blue-600">Campaigns in Half the Time?</span>
            </h2>
            
            {/* Subheadline */}
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join industry leaders using AI to scale influencer marketing, 
              reduce costs by 30%, and achieve 400% average ROI through automated micro-influencer campaigns.
            </p>

            {/* Benefits List */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center justify-center md:justify-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="space-y-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/login')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  <Zap className="mr-3 h-6 w-6" />
                  Start Your Free Trial
                  <ArrowRight className="ml-3 h-6 w-6" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              
              <p className="text-sm text-gray-500">
                <strong>Launch your first campaign today</strong> • 400% average ROI • Setup in 5 minutes
              </p>
            </div>

            {/* Final Testimonial */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center justify-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <blockquote className="text-gray-700 italic text-lg mb-4">
                "This platform transformed our entire marketing strategy. We went from 50 to 250 partnerships in 3 months."
              </blockquote>
              <div className="text-sm font-semibold text-gray-600">
                Sarah Chen, Marketing Director at Urban Bites Café
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Support Links */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Questions? Our team is here to help you succeed.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Book a Demo
            </a>
            <span className="text-gray-300">•</span>
            <a href="#" className="text-blue-600 hover:underline font-medium">
              View Success Stories
            </a>
            <span className="text-gray-300">•</span>
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingCTA;
