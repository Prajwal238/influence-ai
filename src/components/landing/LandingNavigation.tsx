
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface LandingNavigationProps {
  onWaitlistOpen: () => void;
}

const LandingNavigation = ({ onWaitlistOpen }: LandingNavigationProps) => {
  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 py-2">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-900">
            In<span className="text-blue-600">flow</span>encer.ai
          </div>

          {/* Simplified Actions - Single Primary CTA */}
          <div className="flex items-center">
            <Button 
              onClick={onWaitlistOpen}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Early Access
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavigation;
