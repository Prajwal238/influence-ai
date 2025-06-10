
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const LandingDemoVideo = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-8">
          Watch how it works
        </h2>
        <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
          <div className="aspect-video flex items-center justify-center">
            <Button 
              size="lg"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => window.open('https://youtu.be/C0tUlGmNxIg', '_blank')}
            >
              <Play className="mr-2 h-6 w-6" />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingDemoVideo;
