
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, ArrowRight } from "lucide-react";

interface LandingTestimonialsProps {
  onWaitlistOpen: () => void;
}

const LandingTestimonials = ({ onWaitlistOpen }: LandingTestimonialsProps) => {
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            See what people think of this idea
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-3">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Waitlist CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 inline-block">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Want to be part of the revolution?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Join thousands of forward-thinking businesses already on our waitlist
            </p>
            <Button 
              size="lg" 
              onClick={onWaitlistOpen}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Users className="mr-2 h-5 w-5" />
              Join the Waitlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingTestimonials;
