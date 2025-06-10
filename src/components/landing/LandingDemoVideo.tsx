
import { Button } from "@/components/ui/button";
import { Play, CheckCircle, Zap, MessageSquare, BarChart3 } from "lucide-react";

const LandingDemoVideo = () => {
  const keyTakeaways = [
    {
      icon: <Zap className="h-5 w-5 text-blue-400" />,
      text: "Find perfect influencers in seconds"
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-green-400" />,
      text: "Send personalized outreach at scale"
    },
    {
      icon: <BarChart3 className="h-5 w-5 text-purple-400" />,
      text: "Track ROI in real-time"
    }
  ];

  return (
    <section className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Video */}
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl font-bold text-white mb-8">
              Watch how it works
            </h2>
            
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
              {/* Animated thumbnail background */}
              <div className="aspect-video relative overflow-hidden">
                {/* Simulated dashboard preview */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                  <div className="absolute top-4 left-4 right-4">
                    <div className="h-2 bg-blue-400/30 rounded mb-2"></div>
                    <div className="h-2 bg-purple-400/30 rounded w-3/4"></div>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-8 bg-white/10 rounded"></div>
                      <div className="h-8 bg-white/10 rounded"></div>
                      <div className="h-8 bg-white/10 rounded"></div>
                    </div>
                  </div>
                  
                  {/* Floating elements for animation */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="w-16 h-16 bg-white/20 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>
                    </div>
                  </div>
                </div>
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-300 group-hover:scale-110"
                    onClick={() => window.open('https://youtu.be/C0tUlGmNxIg', '_blank')}
                  >
                    <Play className="mr-2 h-6 w-6 fill-current" />
                    Watch Demo (2 min)
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Key takeaways */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                See the platform in action
              </h3>
              <p className="text-blue-100 text-lg">
                Watch how Sarah launched a campaign that reached 100K people in just 3 days.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">
                What you'll learn:
              </h4>
              
              {keyTakeaways.map((takeaway, index) => (
                <div key={index} className="flex items-center space-x-3 group">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    {takeaway.icon}
                  </div>
                  <span className="text-white group-hover:text-blue-100 transition-colors">
                    {takeaway.text}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="flex items-center space-x-2 text-green-300 mb-2">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">Real Results</span>
              </div>
              <p className="text-white text-sm">
                "We went from 2 campaigns per month to 10+ campaigns per week using Inflowencer."
              </p>
              <p className="text-blue-200 text-xs mt-1">
                - Sarah Chen, Urban Bites Café
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingDemoVideo;
