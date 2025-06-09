
import TestimonialsGrid from "./TestimonialsGrid";
import TestimonialsWaitlistCTA from "./TestimonialsWaitlistCTA";

interface LandingTestimonialsProps {
  onWaitlistOpen: () => void;
}

const LandingTestimonials = ({ onWaitlistOpen }: LandingTestimonialsProps) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
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
