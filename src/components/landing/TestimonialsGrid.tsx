
import TestimonialCard from "./TestimonialCard";

const TestimonialsGrid = () => {
  const testimonials = [
    {
      name: "Ravindra Naik",
      role: "Vice President, Kore.ai",
      quote: "The product looks, Irrespective of the result keep building this.",
      avatar: "/placeholder.svg",
      metrics: "I'd rate this 4 out 5"
    },
    {
      name: "Jignesh Talasila",
      role: "Co-host, Headrockshow",
      quote: "This is a good start.",
      avatar: "/placeholder.svg",
      metrics: "Will check it out."
    },
    {
      name: "Anil Kumar Mosali",
      role: "Founder, NutriBandhu",
      quote: "This looks very promising and great intelligence built into the system.",
      avatar: "/placeholder.svg",
      metrics: "Out of 5 I'll give this a 4"
    },
    {
      name: "Sanskriti R",
      role: "Founder, Rasa Silks",
      quote: "You could use this platform to promote our saree store through influencer marketing.",
      avatar: "/placeholder.svg",
      metrics: "Would benifit us."
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
