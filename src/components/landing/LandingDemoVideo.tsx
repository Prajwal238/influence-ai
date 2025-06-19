
import { Button } from "@/components/ui/button";
import { Play, Users, TrendingUp, Zap } from "lucide-react";

const LandingDemoVideo = () => {

  return (
    <section id="demo" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            🎬 Product Demo
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            See the platform in action
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Watch how brands are scaling their influencer marketing with our AI-powered workflow.
          </p>
        </div>

        {/* Video container */}
        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 mb-12">
          <div className="aspect-video flex items-center justify-center bg-gray-800">
            <div className="text-center">
              <Button 
                size="lg"
                onClick={() => window.open('https://youtu.be/C0tUlGmNxIg', '_blank')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Play className="mr-3 h-6 w-6" />
                Watch 3-Minute Demo
              </Button>
              <p className="text-gray-400 text-sm mt-4">
                See how to set up your first campaign in under 5 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingDemoVideo;
