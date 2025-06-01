
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
import CampaignAgentModal from "./components/modals/CampaignAgentModal";

const queryClient = new QueryClient();

// Component to handle campaign redirect with proper ID
const CampaignRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/campaigns/${id}/discovery`} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Single home route */}
          <Route path="/" element={<Dashboard />} />
          {/* Redirect /dashboard to home */}
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/dashboard/campaign-agent" element={<Navigate to="/" replace />} />
          <Route path="/admin" element={<Admin />} />
          {/* Campaign routes - all active */}
          <Route path="/campaigns/:id/discovery" element={<CampaignDiscovery />} />
          <Route path="/campaigns/:id/outreach" element={<CampaignOutreach />} />
          <Route path="/campaigns/:id/negotiation" element={<CampaignNegotiation />} />
          <Route path="/campaigns/:id/contracts" element={<CampaignContracts />} />
          <Route path="/campaigns/:id/payments" element={<CampaignPayments />} />
          <Route path="/campaigns/:id/reporting" element={<CampaignReporting />} />
          {/* Default campaign route redirects to discovery with proper ID */}
          <Route path="/campaigns/:id" element={<CampaignRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CampaignAgentModal />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
