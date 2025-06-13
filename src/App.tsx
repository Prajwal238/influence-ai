import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import GoogleAuthCallback from "@/pages/GoogleAuthCallback";
import Dashboard from "./pages/Dashboard";
import CampaignDiscovery from "./pages/campaigns/Discovery";
import CampaignOutreach from "./pages/campaigns/Outreach";
import CampaignNegotiation from "./pages/campaigns/Negotiation";
import CampaignContracts from "./pages/campaigns/Contracts";
import CampaignPayments from "./pages/campaigns/Payments";
import CampaignReporting from "./pages/campaigns/Reporting";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import NewCampaignModal from "./components/modals/NewCampaignModal";

const queryClient = new QueryClient();

// Component to handle campaign redirect with proper ID
const CampaignRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/campaigns/${id}/discovery`} replace />;
};

// Component to handle dashboard with campaign agent modal
const DashboardWithModal = () => {
  return <Dashboard openCampaignAgentModal={true} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/api/auth/google" element={<GoogleAuthCallback />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/campaign-agent" element={
              <ProtectedRoute>
                <DashboardWithModal />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
            
            {/* New Campaign Modal Routes */}
            <Route path="/dashboard/new-campaign/step-1" element={
              <ProtectedRoute>
                <>
                  <Dashboard />
                  <NewCampaignModal />
                </>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/new-campaign/step-2" element={
              <ProtectedRoute>
                <>
                  <Dashboard />
                  <NewCampaignModal />
                </>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/new-campaign/step-3" element={
              <ProtectedRoute>
                <>
                  <Dashboard />
                  <NewCampaignModal />
                </>
              </ProtectedRoute>
            } />
            
            {/* Campaign routes */}
            <Route path="/campaigns/:id" element={
              <ProtectedRoute>
                <CampaignRedirect />
              </ProtectedRoute>
            } />
            <Route path="/campaigns/:id/discovery" element={
              <ProtectedRoute>
                <CampaignDiscovery />
              </ProtectedRoute>
            } />
            <Route path="/campaigns/:id/outreach" element={
              <ProtectedRoute>
                <CampaignOutreach />
              </ProtectedRoute>
            } />
            <Route path="/campaigns/:id/negotiation" element={
              <ProtectedRoute>
                <CampaignNegotiation />
              </ProtectedRoute>
            } />
            <Route path="/campaigns/:id/contracts" element={
              <ProtectedRoute>
                <CampaignContracts />
              </ProtectedRoute>
            } />
            <Route path="/campaigns/:id/payments" element={
              <ProtectedRoute>
                <CampaignPayments />
              </ProtectedRoute>
            } />
            <Route path="/campaigns/:id/reporting" element={
              <ProtectedRoute>
                <CampaignReporting />
              </ProtectedRoute>
            } />
            
            {/* 404 route - must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
