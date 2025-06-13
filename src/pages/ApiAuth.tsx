
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const ApiAuth = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();

  useEffect(() => {
    const handleAuth = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const receivedToken = urlParams.get('token');

      if (receivedToken) {
        console.log('OAuth token received, storing and redirecting');
        localStorage.setItem('jwt_token', receivedToken);
        
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        navigate('/dashboard');
      } else {
        console.log('No token found in OAuth callback');
        toast({
          title: "Login failed",
          description: "Login failed. Please try again.",
          variant: "destructive",
        });
        navigate('/login');
      }
    };

    handleAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing your login...</p>
      </div>
    </div>
  );
};

export default ApiAuth;
