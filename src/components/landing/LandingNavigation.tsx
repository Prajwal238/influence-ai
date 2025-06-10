
import { Button } from "@/components/ui/button";
import { Users, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface LandingNavigationProps {
  onWaitlistOpen: () => void;
}

const LandingNavigation = ({ onWaitlistOpen }: LandingNavigationProps) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Demo", href: "#demo" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-2">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-900">
            In<span className="text-blue-600">flow</span>encer.ai
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={onWaitlistOpen}
              className="text-gray-600 hover:text-blue-600"
            >
              <Users className="mr-2 h-4 w-4" />
              Join Waitlist
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="rounded-xl border-gray-300 hover:border-blue-600"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => navigate('/login')}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 bg-white">
            <div className="space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full rounded-xl"
                  onClick={() => {
                    onWaitlistOpen();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Join Waitlist
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full rounded-xl"
                  onClick={() => {
                    navigate('/login');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                  onClick={() => {
                    navigate('/login');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LandingNavigation;
