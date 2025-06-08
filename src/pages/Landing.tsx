import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, Zap, Target, Users, BarChart3, MessageSquare, Handshake, ChefHat, Calendar, Cpu, Play } from "lucide-react";
import WaitlistModal from "@/components/modals/WaitlistModal";

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);

  // Redirect to dashboard if user is already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      console.log('User is already authenticated, redirecting to dashboard');
      navigate('/dashboard');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render landing page if user is authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "AI-Powered Discovery",
      description: "Leverage machine learning to find the most relevant influencers based on your audience, goals, and category."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
      title: "Automated Outreach",
      description: "Send personalized messages at scale and track responses — no manual DMing required."
    },
    {
      icon: <Handshake className="h-8 w-8 text-blue-600" />,
      title: "Smart Negotiation",
      description: "Let our AI negotiator handle pricing discussions with influencers or take over whenever you wish."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
      title: "Real-time Analytics",
      description: "Get instant campaign insights — impressions, engagement, conversions, ROI, and more."
    },
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: "End-to-End Workflow",
      description: "From finding to paying influencers — our full-stack solution handles everything."
    }
  ];

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
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="text-2xl font-bold text-gray-900">
                In<span className="text-blue-600">flow</span>encer.ai
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Features
                </a>
                <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Pricing
                </a>
                <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Contact
                </a>
                <Button 
                  variant="outline" 
                  onClick={() => setIsWaitlistModalOpen(true)}
                  className="rounded-xl"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Join the Waitlist
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/login')}
                  className="rounded-xl"
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
              Run Influencer Campaigns
              <span className="block text-blue-600">with AI Assistance 🚀</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover, message, negotiate, and measure — all in one AI-powered dashboard.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/login')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Try Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Core Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything you need to scale
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our AI-powered platform handles every aspect of influencer marketing, 
                from finding creators to managing campaigns.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-0">
                    <div className="mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
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
                  onClick={() => setIsWaitlistModalOpen(true)}
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

        {/* Use Cases Section */}
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

        {/* Demo Video Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-8">
              Watch how it works in under 60 seconds
            </h2>
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video flex items-center justify-center">
                <Button 
                  size="lg"
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
                >
                  <Play className="mr-2 h-6 w-6" />
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to transform your influencer marketing?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of brands already using AI to scale their campaigns.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/login')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="text-2xl font-bold text-white mb-4">
              In<span className="text-blue-400">flow</span>encer.ai
            </div>
            <p className="text-gray-400">
              © 2024 Inflowencer.ai. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      <WaitlistModal 
        isOpen={isWaitlistModalOpen} 
        onClose={() => setIsWaitlistModalOpen(false)} 
      />
    </>
  );
};

export default Landing;
