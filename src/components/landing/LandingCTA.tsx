
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingCTA = () => {
  const navigate = useNavigate();

  const benefits = [
    "Setup in under 5 minutes",
    "No credit card required",
    "14-day free trial",
    "Cancel anytime"
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-5xl mx-auto text-center">
        {/* Main CTA Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100 relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50 to-transparent rounded-full transform translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-50 to-transparent rounded-full transform -translate-x-24 translate-y-24"></div>
          
          <div className="relative z-10">
            {/* Icon */}
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Ready to scale your
              <span className="block text-blue-600">influencer marketing?</span>
            </h2>
            
            {/* Subheadline */}
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of brands already using AI to run more effective campaigns, 
              reduce costs, and achieve measurable growth through micro-influencer partnerships.
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
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Start Your Free Trial
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              
              <p className="text-sm text-gray-500">
                Trusted by 30+ brands • Average ROI: 400% • Setup time: 5 minutes
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Social Proof */}
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
              View Pricing
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
