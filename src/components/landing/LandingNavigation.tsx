
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LandingNavigationProps {
  onWaitlistOpen: () => void;
}

const LandingNavigation = ({ onWaitlistOpen }: LandingNavigationProps) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-900">
            In<span className="text-blue-600">flow</span>encer.ai
          </div>
          
          {/* Navigation links - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Features
            </a>
            <a href="#demo" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Demo
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Reviews
            </a>
          </div>
          
          {/* CTA buttons */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/login')}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Login
            </Button>
            <Button 
              onClick={onWaitlistOpen}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium px-4 py-2"
            >
              <Users className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Join Waitlist</span>
              <span className="sm:hidden">Join</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavigation;
