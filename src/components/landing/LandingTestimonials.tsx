
import TestimonialsGrid from "./TestimonialsGrid";
import TestimonialsWaitlistCTA from "./TestimonialsWaitlistCTA";

interface LandingTestimonialsProps {
  onWaitlistOpen: () => void;
}

const LandingTestimonials = ({ onWaitlistOpen }: LandingTestimonialsProps) => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20"></div>
      
      {/* Soft geometric pattern */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(30deg, transparent 40%, rgba(59, 130, 246, 0.03) 40%, rgba(59, 130, 246, 0.03) 60%, transparent 60%)`,
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            See what people think of this idea
          </h2>
        </div>
        <TestimonialsGrid />
        <TestimonialsWaitlistCTA onWaitlistOpen={onWaitlistOpen} />
      </div>
    </section>
  );
};

export default LandingTestimonials;
