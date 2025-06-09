
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import WaitlistModal from "@/components/modals/WaitlistModal";
import LandingNavigation from "@/components/landing/LandingNavigation";
import LandingHero from "@/components/landing/LandingHero";
import LandingFeatures from "@/components/landing/LandingFeatures";
import LandingTestimonials from "@/components/landing/LandingTestimonials";
import LandingUseCases from "@/components/landing/LandingUseCases";
import LandingDemoVideo from "@/components/landing/LandingDemoVideo";
import LandingCTA from "@/components/landing/LandingCTA";
import LandingFooter from "@/components/landing/LandingFooter";

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

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <LandingNavigation onWaitlistOpen={() => setIsWaitlistModalOpen(true)} />
        <LandingHero />
        <LandingFeatures />
        <LandingTestimonials onWaitlistOpen={() => setIsWaitlistModalOpen(true)} />
        <LandingUseCases />
        <LandingDemoVideo />
        <LandingCTA />
        <LandingFooter />
      </div>

      <WaitlistModal 
        isOpen={isWaitlistModalOpen} 
        onClose={() => setIsWaitlistModalOpen(false)} 
      />
    </>
  );
};

export default Landing;
