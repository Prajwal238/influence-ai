
import { Button } from "@/components/ui/button";
import { Users, ArrowRight, Star } from "lucide-react";

interface TestimonialsWaitlistCTAProps {
  onWaitlistOpen: () => void;
}

const TestimonialsWaitlistCTA = ({ onWaitlistOpen }: TestimonialsWaitlistCTAProps) => {
  return (
    <div className="text-center">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-100">
        {/* Rating stars */}
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
          ))}
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Join 2,000+ businesses on our waitlist
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Get early access to advanced features and priority onboarding when we launch new capabilities.
        </p>
        
        <Button 
          size="lg" 
          onClick={onWaitlistOpen}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Users className="mr-2 h-5 w-5" />
          Join the Waitlist
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
        <p className="text-sm text-gray-500 mt-4">
          No spam, just product updates and early access perks
        </p>
      </div>
    </div>
  );
};

export default TestimonialsWaitlistCTA;
