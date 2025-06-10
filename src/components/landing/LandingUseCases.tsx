
import { Card, CardContent } from "@/components/ui/card";
import { ChefHat, Calendar, Cpu, ShoppingBag, Dumbbell, Sparkles, TrendingUp } from "lucide-react";

const LandingUseCases = () => {
  const useCases = [
    {
      icon: <ChefHat className="h-10 w-10 text-blue-600" />,
      title: "Restaurants & Food",
      subtitle: "Drive footfall with local micro-influencers",
      description: "Partner with local food bloggers to boost reservations, delivery orders, and community buzz around your restaurant.",
      results: ["40% increase in reservations", "25% boost in delivery orders", "3x social media engagement"],
      cta: "Perfect for local eateries",
      image: "🍕",
      metric: "40% more customers"
    },
    {
      icon: <Calendar className="h-10 w-10 text-blue-600" />,
      title: "Event Organizers", 
      subtitle: "Sell more tickets with authentic promotion",
      description: "Promote conferences, festivals, and events through creator partnerships that actually convert attendees.",
      results: ["2x event attendance", "50% lower marketing costs", "Higher quality attendees"],
      cta: "Great for any event size",
      image: "🎫",
      metric: "2x ticket sales"
    },
    {
      icon: <Cpu className="h-10 w-10 text-blue-600" />,
      title: "Tech & SaaS",
      subtitle: "Tech brands get 3x higher engagement", 
      description: "Get early adopters talking about your product with genuine reviews from trusted tech influencers.",
      results: ["300% more sign-ups", "Better user onboarding", "Authentic product feedback"],
      cta: "Ideal for product launches",
      image: "💻",
      metric: "3x more signups"
    },
    {
      icon: <ShoppingBag className="h-10 w-10 text-blue-600" />,
      title: "E-commerce & Retail",
      subtitle: "Drive sales with authentic product reviews",
      description: "Boost conversions with styling content from micro-influencers your customers actually follow and trust.",
      results: ["5x better conversion rates", "Lower return rates", "Stronger brand loyalty"],
      cta: "Works for any product",
      image: "🛍️",
      metric: "5x conversions"
    },
    {
      icon: <Dumbbell className="h-10 w-10 text-blue-600" />,
      title: "Fitness & Wellness",
      subtitle: "Build community with fitness enthusiasts",
      description: "Create a loyal community around your brand with wellness advocates who share your values and lifestyle.",
      results: ["85% engagement rates", "Strong community building", "Better customer retention"],
      cta: "Perfect for gyms & coaches",
      image: "💪",
      metric: "85% engagement"
    },
    {
      icon: <Sparkles className="h-10 w-10 text-blue-600" />,
      title: "Beauty & Lifestyle",
      subtitle: "Showcase products through tutorials",
      description: "Get authentic tutorials and reviews from creators who match your brand aesthetic and target audience.",
      results: ["Higher purchase intent", "Better brand perception", "Viral content potential"],
      cta: "Great for beauty brands",
      image: "💄",
      metric: "Viral potential"
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Launch 5X More Campaigns
            <span className="block text-blue-600">Across Every Industry</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're a restaurant, tech startup, or e-commerce brand—
            micro-influencer marketing works. Here's how different industries scale.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {useCases.map((useCase, index) => (
            <Card key={index} className="group p-8 text-left rounded-3xl hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-blue-200 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
              <CardContent className="p-0">
                {/* Industry Image & Metric */}
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    {useCase.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl mb-1">{useCase.image}</div>
                    <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {useCase.metric}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {useCase.cta}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {useCase.title}
                </h3>

                <p className="text-sm font-semibold text-gray-700 mb-4">
                  {useCase.subtitle}
                </p>
                
                <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                  {useCase.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Typical Results:</h4>
                  {useCase.results.map((result, resultIndex) => (
                    <div key={resultIndex} className="flex items-center text-sm text-gray-600">
                      <TrendingUp className="h-3 w-3 text-green-500 mr-2" />
                      {result}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 inline-block hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Don't see your industry?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              We work with businesses across 20+ industries. 
              If you have customers online, we can help you reach them through authentic influencer partnerships.
            </p>
            <button className="text-blue-600 font-semibold hover:underline text-lg">
              Book a custom demo for your industry →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingUseCases;
