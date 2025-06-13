
import TestimonialCard from "./TestimonialCard";

const TestimonialsGrid = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Director, Urban Bites",
      quote: "Increased our local foot traffic by 400% through micro-influencer campaigns. ROI was 8:1 in the first quarter.",
      avatar: "/placeholder.svg",
      metrics: "400% increase in foot traffic"
    },
    {
      name: "Mike Rodriguez",
      role: "CEO, TechFlow",
      quote: "Reduced campaign management time from 40 hours to 5 hours per week. The AI negotiation saved us 30% on costs.",
      avatar: "/placeholder.svg",
      metrics: "87% time saved"
    },
    {
      name: "Emma Thompson",
      role: "Founder, Green Beauty Co",
      quote: "Our influencer partnerships generated $2M in revenue last year. The platform's analytics helped optimize everything.",
      avatar: "/placeholder.svg",
      metrics: "$2M revenue generated"
    },
    {
      name: "David Park",
      role: "Events Manager, City Sports",
      quote: "Event attendance doubled and ticket sales increased 150% thanks to targeted nano-influencer campaigns.",
      avatar: "/placeholder.svg",
      metrics: "150% ticket sales boost"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard
          key={index}
          name={testimonial.name}
          role={testimonial.role}
          quote={testimonial.quote}
          avatar={testimonial.avatar}
          metrics={testimonial.metrics}
        />
      ))}
    </div>
  );
};

export default TestimonialsGrid;
