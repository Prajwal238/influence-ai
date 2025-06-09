
import { Button } from "@/components/ui/button";
import { Users, ArrowRight } from "lucide-react";

interface TestimonialsWaitlistCTAProps {
  onWaitlistOpen: () => void;
}

const TestimonialsWaitlistCTA = ({ onWaitlistOpen }: TestimonialsWaitlistCTAProps) => {
  return (
    <div className="text-center mt-16">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 inline-block">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Want to be part of the revolution?
        </h3>
        <p className="text-gray-600 mb-6 max-w-md">
          Join thousands of forward-thinking businesses already on our waitlist
        </p>
        <Button 
          size="lg" 
          onClick={onWaitlistOpen}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Users className="mr-2 h-5 w-5" />
          Join the Waitlist
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default TestimonialsWaitlistCTA;
