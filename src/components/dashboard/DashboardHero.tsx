
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";

interface DashboardHeroProps {
  onNewCampaign: () => void;
}

const DashboardHero = ({ onNewCampaign }: DashboardHeroProps) => {
  return (
    <div className="relative mb-8">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/3 via-purple-600/3 to-cyan-600/3 rounded-2xl -z-10" />
      
      <div className="relative px-6 py-6 flex items-center justify-between">
        {/* Left side - Welcome text */}
        <div className="text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/70 backdrop-blur-sm rounded-full border border-gray-200/40 text-xs text-gray-600 mb-3 shadow-sm">
            <Sparkles className="h-3 w-3 text-blue-500" />
            AI-Powered Dashboard
          </div>
          
          {/* Main Heading */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-2 tracking-tight">
            Welcome Back
          </h1>
          
          {/* Subheading */}
          <p className="text-sm text-gray-600 max-w-md leading-relaxed">
            Manage your influencer campaigns with intelligent automation
          </p>
        </div>
        
        {/* Right side - CTA Button */}
        <Button 
          onClick={onNewCampaign}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>
    </div>
  );
};

export default DashboardHero;
