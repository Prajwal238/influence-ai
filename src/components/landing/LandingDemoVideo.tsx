
import { Button } from "@/components/ui/button";
import { Play, Clock, Users, BarChart3 } from "lucide-react";

const LandingDemoVideo = () => {
  const demoFeatures = [
    { icon: <Users className="h-5 w-5" />, text: "AI influencer discovery" },
    { icon: <Clock className="h-5 w-5" />, text: "Automated outreach" },
    { icon: <BarChart3 className="h-5 w-5" />, text: "Real-time analytics" }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            See how it works in 2 minutes
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Watch a real campaign from start to finish—from finding the perfect micro-influencers 
            to tracking ROI in real-time.
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

        {/* Video Container */}
        <div className="relative bg-black/20 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <div className="aspect-video flex items-center justify-center relative">
            {/* Play Button */}
            <Button 
              size="lg"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm px-8 py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => window.open('https://youtu.be/C0tUlGmNxIg', '_blank')}
            >
              <Play className="mr-3 h-8 w-8 fill-current" />
              Watch Demo
            </Button>

            {/* Video Thumbnail Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 pointer-events-none"></div>
            
            {/* Demo Stats Overlay */}
            <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-sm rounded-xl p-4 text-white">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span>Live Demo</span>
                </div>
                <div className="text-gray-300">•</div>
                <span>2:31 duration</span>
                <div className="text-gray-300">•</div>
                <span>No signup required</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-blue-100 mb-6">
            Ready to transform your influencer marketing strategy?
          </p>
          <Button 
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
