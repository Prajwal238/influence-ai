
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";

interface DashboardHeroProps {
  onNewCampaign: () => void;
}

const DashboardHero = ({ onNewCampaign }: DashboardHeroProps) => {
  return (
    <div className="relative mb-12">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-cyan-600/5 rounded-3xl -z-10" />
      
      <div className="relative px-8 py-12 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 text-sm text-gray-600 mb-6 shadow-sm">
          <Sparkles className="h-4 w-4 text-blue-500" />
          AI-Powered Campaign Management
        </div>
        
        {/* Main Heading */}
        <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Welcome Back
        </h1>
        
        {/* Subheading */}
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Streamline your influencer campaigns with intelligent automation and data-driven insights
        </p>
        
        {/* CTA Button */}
        <Button 
          size="lg"
          onClick={onNewCampaign}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create New Campaign
        </Button>
      </div>
    </div>
  );
};

export default DashboardHero;
