
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center px-4 py-2 mb-8 text-sm font-medium text-purple-600 bg-purple-100 rounded-full">
          <Sparkles className="w-4 h-4 mr-2" />
          Join 2,000+ businesses scaling with AI
        </div>
        
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Ready to transform your influencer marketing?
        </h2>
        
        <p className="text-xl text-gray-600 mb-8">
          Launch your first AI-powered campaign in under 5 minutes.
          <span className="block mt-2 font-semibold text-gray-800">
            No setup fees. No long-term contracts. Just results.
          </span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button 
            size="lg" 
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            Start Your Free Campaign
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        
        <div className="text-sm text-gray-500 space-y-1">
          <p>✓ 2-minute setup • ✓ No credit card required • ✓ Cancel anytime</p>
          <p className="font-medium">Get your first campaign results in 24 hours</p>
        </div>
      </div>
    </section>
  );
};

export default LandingCTA;
