
import TestimonialsGrid from "./TestimonialsGrid";
import TestimonialsWaitlistCTA from "./TestimonialsWaitlistCTA";

interface LandingTestimonialsProps {
  onWaitlistOpen: () => void;
}

const LandingTestimonials = ({ onWaitlistOpen }: LandingTestimonialsProps) => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Real Results: 5X More Campaigns,
            <span className="block text-blue-600">Half the Time</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how businesses like yours are scaling their influencer marketing 
            and achieving 400% average ROI with our AI-powered platform.
          </p>
        </div>
        <TestimonialsGrid />
        <TestimonialsWaitlistCTA onWaitlistOpen={onWaitlistOpen} />
      </div>
    </section>
  );
};

export default LandingTestimonials;
