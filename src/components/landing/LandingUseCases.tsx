
import { Card, CardContent } from "@/components/ui/card";
import { ChefHat, Calendar, Cpu } from "lucide-react";

const LandingUseCases = () => {
  const useCases = [
    {
      icon: <ChefHat className="h-8 w-8 text-blue-600" />,
      title: "Restaurants & Cafes",
      description: "Partner with local foodies and vloggers to attract foot traffic and boost orders."
    },
    {
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      title: "Event Organizers",
      description: "Promote fitness events, community meetups, or concerts through micro-influencers."
    },
    {
      icon: <Cpu className="h-8 w-8 text-blue-600" />,
      title: "Tech & Gadget Companies",
      description: "Get early adopters and product reviewers talking about your launch."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Built for Every Business Size
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {useCases.map((useCase, index) => (
            <Card key={index} className="p-8 text-center rounded-2xl hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="mb-6 flex justify-center">
                  {useCase.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {useCase.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            No matter your industry — if your audience is online, Inflowencer works for you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LandingUseCases;
