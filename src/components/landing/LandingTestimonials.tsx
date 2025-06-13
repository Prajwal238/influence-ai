
import TestimonialsGrid from "./TestimonialsGrid";
import TestimonialsWaitlistCTA from "./TestimonialsWaitlistCTA";

interface LandingTestimonialsProps {
  onWaitlistOpen: () => void;
}

const LandingTestimonials = ({ onWaitlistOpen }: LandingTestimonialsProps) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
            💼 Customer Success
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Growing businesses love our platform
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how companies are scaling their influencer marketing with measurable results.
          </p>
        </div>
        
        <TestimonialsGrid />
        <TestimonialsWaitlistCTA onWaitlistOpen={onWaitlistOpen} />
      </div>
    </section>
  );
};

export default LandingTestimonials;
