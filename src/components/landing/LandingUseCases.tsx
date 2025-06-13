
import { Card, CardContent } from "@/components/ui/card";
import { ChefHat, Calendar, Cpu, Store, Heart, Gamepad2 } from "lucide-react";

const LandingUseCases = () => {
  const useCases = [
    {
      icon: <ChefHat className="h-6 w-6 text-blue-600" />,
      title: "Restaurants & Food",
      description: "Drive foot traffic and delivery orders through local food influencers and micro-creators.",
      results: "Average 300% increase in orders"
    },
    {
      icon: <Store className="h-6 w-6 text-blue-600" />,
      title: "E-commerce & Retail",
      description: "Boost online sales with product reviews and unboxing content from trusted creators.",
      results: "Average 250% ROI"
    },
    {
      icon: <Cpu className="h-6 w-6 text-blue-600" />,
      title: "Tech & SaaS",
      description: "Generate leads and signups through tech reviewers and industry thought leaders.",
      results: "Average 180% lead increase"
    },
    {
      icon: <Heart className="h-6 w-6 text-blue-600" />,
      title: "Health & Wellness",
      description: "Build trust through authentic testimonials from fitness and wellness influencers.",
      results: "Average 220% engagement boost"
    },
    {
      icon: <Calendar className="h-6 w-6 text-blue-600" />,
      title: "Events & Experiences",
      description: "Fill venues and sell tickets through targeted event promotion campaigns.",
      results: "Average 400% attendance growth"
    },
    {
      icon: <Gamepad2 className="h-6 w-6 text-blue-600" />,
      title: "Gaming & Entertainment",
      description: "Launch products and build communities through gaming and entertainment creators.",
      results: "Average 350% community growth"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            🎯 Use Cases
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Built for every industry
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you're a local business or global brand, our platform scales with your needs.
          </p>
        </div>

        {/* Use cases grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {useCases.map((useCase, index) => (
            <Card key={index} className="p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <CardContent className="p-0">
                <div className="mb-4 p-3 bg-blue-50 rounded-lg w-fit group-hover:bg-blue-100 transition-colors">
                  {useCase.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {useCase.description}
                </p>
                <div className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit">
                  {useCase.results}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Your industry not listed?
          </h3>
          <p className="text-gray-600 mb-4">
            Our platform works for any business with an online audience.
          </p>
          <p className="text-sm text-gray-500">
            Schedule a demo to see how it works for your specific use case.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LandingUseCases;
