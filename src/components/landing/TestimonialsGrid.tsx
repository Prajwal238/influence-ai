
import TestimonialCard from "./TestimonialCard";

const TestimonialsGrid = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Owner, Urban Bites Café",
      quote: "This tool helped us reach 5x more customers through nano influencers!",
      avatar: "/placeholder.svg"
    },
    {
      name: "Mike Rodriguez",
      role: "Marketing Director, TechFlow",
      quote: "Inflowencer saved us 20 hours per week on campaign management.",
      avatar: "/placeholder.svg"
    },
    {
      name: "Emma Thompson",
      role: "Founder, Green Beauty Co",
      quote: "The AI negotiation feature got us better rates than we could manually.",
      avatar: "/placeholder.svg"
    },
    {
      name: "David Park",
      role: "Events Manager, City Sports",
      quote: "Our event attendance doubled thanks to targeted micro-influencer campaigns.",
      avatar: "/placeholder.svg"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard
          key={index}
          name={testimonial.name}
          role={testimonial.role}
          quote={testimonial.quote}
          avatar={testimonial.avatar}
        />
      ))}
    </div>
  );
};

export default TestimonialsGrid;
