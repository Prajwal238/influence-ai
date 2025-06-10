
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LandingNavigationProps {
  onWaitlistOpen: () => void;
}

const LandingNavigation = ({ onWaitlistOpen }: LandingNavigationProps) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-gray-900">
            In<span className="text-blue-600">flow</span>encer.ai
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
              Pricing
            </a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </a>
            <Button 
              variant="outline" 
              onClick={onWaitlistOpen}
              className="rounded-xl"
            >
              <Users className="mr-2 h-4 w-4" />
              Join the Waitlist
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="rounded-xl"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavigation;
