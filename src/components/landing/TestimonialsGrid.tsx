
import TestimonialCard from "./TestimonialCard";

const TestimonialsGrid = () => {
  const heroTestimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Director",
      company: "Urban Bites Café",
      quote: "We went from 50 to 250 influencer partnerships in just 3 months. The AI outreach saved us 40 hours per week and our campaign ROI increased by 300%.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1bb?w=150&h=150&fit=crop&crop=face",
      metric: "300% ROI increase",
      isHero: true,
      socialProof: "Featured in TechCrunch"
    },
    {
      name: "Mike Rodriguez", 
      role: "Founder",
      company: "TechFlow Startup",
      quote: "The AI negotiation feature is incredible—it secured rates 25% lower than what I was getting manually. Plus, the whole team can manage campaigns without hiring specialists.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      metric: "25% cost reduction",
      isHero: true,
      socialProof: "Y Combinator Alum"
    }
  ];

  const regularTestimonials = [
    {
      name: "Emma Thompson",
      role: "CMO",
      company: "Green Beauty Co",
      quote: "Finally, a platform that actually understands micro-influencer marketing. We're seeing 5x more authentic engagement.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      metric: "5x engagement boost"
    },
    {
      name: "David Park",
      role: "Events Manager", 
      company: "City Sports",
      quote: "Event attendance doubled after switching to targeted micro-influencer campaigns. The real-time analytics helped us optimize on the fly.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      metric: "2x event attendance"
    }
  ];

  return (
    <div>
      {/* Hero Testimonials - Larger Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {heroTestimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            {...testimonial}
          />
        ))}
      </div>

      {/* Regular Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {regularTestimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index + 2}
            {...testimonial}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsGrid;
