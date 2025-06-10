
import { Button } from "@/components/ui/button";
import { Play, Clock, Users, BarChart3, CheckCircle } from "lucide-react";

const LandingDemoVideo = () => {
  const demoFeatures = [
    { icon: <Users className="h-5 w-5" />, text: "AI influencer discovery" },
    { icon: <Clock className="h-5 w-5" />, text: "Automated outreach" },
    { icon: <BarChart3 className="h-5 w-5" />, text: "Real-time analytics" }
  ];

  const keyTakeaways = [
    "Watch AI find perfect micro-influencers in seconds",
    "See automated outreach that gets 85% response rates", 
    "Track real-time campaign ROI and performance"
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Watch: Launch 5X More Campaigns
            <span className="block">in Just 90 Seconds</span>
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            See a real campaign from start to finish—AI finds micro-influencers, 
            negotiates rates, and tracks ROI automatically.
          </p>
          
          {/* Demo Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {demoFeatures.map((feature, index) => (
              <div key={index} className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <div className="text-blue-200 mr-2">
                  {feature.icon}
                </div>
                <span className="text-blue-100 font-medium text-sm">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Video Container with Engaging Thumbnail */}
          <div className="lg:w-2/3">
            <div className="relative bg-black/20 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <div className="aspect-video flex items-center justify-center relative bg-gradient-to-br from-blue-900/50 to-purple-900/50">
                {/* Animated Dashboard Preview */}
                <div className="absolute inset-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="grid grid-cols-3 gap-2 mb-4 opacity-60">
                      <div className="h-2 bg-white/40 rounded"></div>
                      <div className="h-2 bg-white/60 rounded"></div>
                      <div className="h-2 bg-white/40 rounded"></div>
                      <div className="h-2 bg-white/60 rounded"></div>
                      <div className="h-2 bg-white/40 rounded"></div>
                      <div className="h-2 bg-white/60 rounded"></div>
                    </div>
                    <div className="text-white/60 text-xs font-medium mb-2">Live Dashboard Preview</div>
                  </div>
                </div>

                {/* Play Button */}
                <Button 
                  size="lg"
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm px-8 py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative z-10"
                  onClick={() => window.open('https://youtu.be/C0tUlGmNxIg', '_blank')}
                >
                  <Play className="mr-3 h-8 w-8 fill-current" />
                  Watch 90-Second Demo
                </Button>
                
                {/* Demo Stats Overlay */}
                <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-sm rounded-xl p-4 text-white">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      <span>Live Demo</span>
                    </div>
                    <div className="text-gray-300">•</div>
                    <span>1:30 duration</span>
                    <div className="text-gray-300">•</div>
                    <span>No signup required</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Takeaways Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6">What you'll see:</h3>
              <div className="space-y-4">
                {keyTakeaways.map((takeaway, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100 text-sm leading-relaxed">{takeaway}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">5X</div>
                  <div className="text-blue-200 text-sm">More Campaigns</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-blue-100 mb-6 text-lg">
            Ready to launch 5X more campaigns in half the time?
          </p>
          <Button 
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-50 px-10 py-4 text-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => window.open('/login', '_self')}
          >
            Start Your Free Trial
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LandingDemoVideo;
