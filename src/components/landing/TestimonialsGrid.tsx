
import TestimonialCard from "./TestimonialCard";

const TestimonialsGrid = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Director, Urban Bites Café",
      quote: "We went from 50 to 250 influencer partnerships in just 3 months. The AI outreach saved us 40 hours per week and our campaign ROI increased by 300%.",
      avatar: "/placeholder.svg",
      metric: "300% ROI increase",
      company: "Urban Bites"
    },
    {
      name: "Mike Rodriguez",
      role: "Founder, TechFlow Startup",
      quote: "The AI negotiation feature is incredible—it secured rates 25% lower than what I was getting manually. Plus, the whole team can manage campaigns without hiring specialists.",
      avatar: "/placeholder.svg",
      metric: "25% cost reduction",
      company: "TechFlow"
    },
    {
      name: "Emma Thompson",
      role: "CMO, Green Beauty Co",
      quote: "Finally, a platform that actually understands micro-influencer marketing. We're seeing 5x more authentic engagement compared to our old approach with macro influencers.",
      avatar: "/placeholder.svg",
      metric: "5x engagement boost",
      company: "Green Beauty"
    },
    {
      name: "David Park",
      role: "Events Manager, City Sports",
      quote: "Event attendance doubled after switching to targeted micro-influencer campaigns. The real-time analytics helped us optimize on the fly and maximize ticket sales.",
      avatar: "/placeholder.svg",
      metric: "2x event attendance",
      company: "City Sports"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard
          key={index}
          name={testimonial.name}
          role={testimonial.role}
          quote={testimonial.quote}
          avatar={testimonial.avatar}
          metric={testimonial.metric}
          company={testimonial.company}
        />
      ))}
    </div>
  );
};

export default TestimonialsGrid;
