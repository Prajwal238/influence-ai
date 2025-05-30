
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CampaignDiscovery from "./pages/campaigns/Discovery";
import ConversationalDiscovery from "./pages/campaigns/ConversationalDiscovery";
import CampaignOutreach from "./pages/campaigns/Outreach";
import ConversationalOutreach from "./pages/campaigns/ConversationalOutreach";
import CampaignNegotiation from "./pages/campaigns/Negotiation";
import ConversationalNegotiation from "./pages/campaigns/ConversationalNegotiation";
import CampaignContracts from "./pages/campaigns/Contracts";
import CampaignPayments from "./pages/campaigns/Payments";
import CampaignReporting from "./pages/campaigns/Reporting";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import ConversationalCampaignModal from "./components/modals/ConversationalCampaignModal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/new-campaign/*" element={<Dashboard />} />
          {/* Use conversational versions for better UX */}
          <Route path="/campaigns/:id/discovery" element={<ConversationalDiscovery />} />
          <Route path="/campaigns/:id/outreach" element={<ConversationalOutreach />} />
          <Route path="/campaigns/:id/negotiation" element={<ConversationalNegotiation />} />
          <Route path="/campaigns/:id/contracts" element={<CampaignContracts />} />
          <Route path="/campaigns/:id/payments" element={<CampaignPayments />} />
          <Route path="/campaigns/:id/reporting" element={<CampaignReporting />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ConversationalCampaignModal />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
