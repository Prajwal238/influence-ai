
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Ready to transform your influencer marketing?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of brands already using AI to scale their campaigns.
        </p>
        <Button 
          size="lg" 
          onClick={() => navigate('/login')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Get Started Today
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default LandingCTA;
