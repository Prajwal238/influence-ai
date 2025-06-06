
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
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
        <Routes>
          {/* Top-level routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/campaign-agent" element={<DashboardWithModal />} />
          <Route path="/admin" element={<Admin />} />
          
          {/* New Campaign Modal Routes */}
          <Route path="/dashboard/new-campaign/step-1" element={<><Dashboard /><NewCampaignModal /></>} />
          <Route path="/dashboard/new-campaign/step-2" element={<><Dashboard /><NewCampaignModal /></>} />
          <Route path="/dashboard/new-campaign/step-3" element={<><Dashboard /><NewCampaignModal /></>} />
          
          {/* Campaign routes */}
          <Route path="/campaigns/:id" element={<CampaignRedirect />} />
          <Route path="/campaigns/:id/discovery" element={<CampaignDiscovery />} />
          <Route path="/campaigns/:id/outreach" element={<CampaignOutreach />} />
          <Route path="/campaigns/:id/negotiation" element={<CampaignNegotiation />} />
          <Route path="/campaigns/:id/contracts" element={<CampaignContracts />} />
          <Route path="/campaigns/:id/payments" element={<CampaignPayments />} />
          <Route path="/campaigns/:id/reporting" element={<CampaignReporting />} />
          
          {/* 404 route - must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
