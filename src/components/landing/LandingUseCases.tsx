
import { Card, CardContent } from "@/components/ui/card";
import { ChefHat, Calendar, Cpu, ShoppingBag, Dumbbell, Sparkles } from "lucide-react";

const LandingUseCases = () => {
  const useCases = [
    {
      icon: <ChefHat className="h-10 w-10 text-blue-600" />,
      title: "Restaurants & Food Brands",
      description: "Partner with local food bloggers and micro-influencers to drive foot traffic, boost delivery orders, and build community buzz.",
      results: ["40% increase in reservations", "25% boost in delivery orders", "3x social media engagement"],
      cta: "Perfect for local eateries"
    },
    {
      icon: <Calendar className="h-10 w-10 text-blue-600" />,
      title: "Event Organizers",
      description: "Promote conferences, festivals, and community events through authentic creator partnerships that actually sell tickets.",
      results: ["2x event attendance", "50% lower marketing costs", "Higher quality attendees"],
      cta: "Great for any event size"
    },
    {
      icon: <Cpu className="h-10 w-10 text-blue-600" />,
      title: "Tech & SaaS Companies",
      description: "Get early adopters talking about your product with genuine reviews and demos from trusted tech influencers.",
      results: ["300% more sign-ups", "Better user onboarding", "Authentic product feedback"],
      cta: "Ideal for product launches"
    },
    {
      icon: <ShoppingBag className="h-10 w-10 text-blue-600" />,
      title: "E-commerce & Retail",
      description: "Drive sales with authentic product reviews and styling content from micro-influencers your customers actually follow.",
      results: ["5x better conversion rates", "Lower return rates", "Stronger brand loyalty"],
      cta: "Works for any product"
    },
    {
      icon: <Dumbbell className="h-10 w-10 text-blue-600" />,
      title: "Fitness & Wellness",
      description: "Build a community around your brand with fitness enthusiasts and wellness advocates who share your values.",
      results: ["85% engagement rates", "Strong community building", "Better customer retention"],
      cta: "Perfect for gyms & coaches"
    },
    {
      icon: <Sparkles className="h-10 w-10 text-blue-600" />,
      title: "Beauty & Lifestyle",
      description: "Showcase your products through authentic tutorials and reviews from creators who match your brand aesthetic.",
      results: ["Higher purchase intent", "Better brand perception", "Viral content potential"],
      cta: "Great for beauty brands"
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Built for every industry
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No matter your business type—if your customers are online, 
            micro-influencer marketing works. Here's how different industries succeed.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {useCases.map((useCase, index) => (
            <Card key={index} className="group p-8 text-left rounded-3xl hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-blue-200 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="mb-6">
                  <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors mb-4">
                    {useCase.icon}
                  </div>
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {useCase.cta}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {useCase.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {useCase.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Typical Results:</h4>
                  {useCase.results.map((result, resultIndex) => (
                    <div key={resultIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                      {result}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 inline-block">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Don't see your industry?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              We work with businesses across 20+ industries. 
              If you have customers online, we can help you reach them through authentic influencer partnerships.
            </p>
            <button className="text-blue-600 font-semibold hover:underline">
              Book a custom demo for your industry →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingUseCases;
