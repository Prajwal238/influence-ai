
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingCTA = () => {
  const navigate = useNavigate();

  const benefits = [
    "No setup fees or long-term contracts",
    "14-day free trial with full access",
    "Cancel anytime, no questions asked"
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to scale your influencer marketing?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join other businesses using AI to automate their influencer campaigns and drive measurable growth.
        </p>
        
        {/* Benefits list */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8 text-blue-100">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-300" />
              <span className="text-sm">{benefit}</span>
            </div>
          ))}
        </div>
        
        {/* CTA button */}
        <Button 
          size="lg" 
          onClick={() => navigate('/login')}
          className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 text-lg rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Start Your Free Trial
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
        <p className="text-blue-200 text-sm mt-4">
          No credit card required • Setup in under 5 minutes
        </p>
      </div>
    </section>
  );
};

export default LandingCTA;
