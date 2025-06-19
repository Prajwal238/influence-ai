
import { ReactNode } from "react";
import Navigation from "./Navigation";
import PipelineBar from "./PipelineBar";
import Breadcrumbs from "./Breadcrumbs";

interface CampaignLayoutProps {
  children: ReactNode;
}

const CampaignLayout = ({ children }: CampaignLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <PipelineBar />
      <Breadcrumbs />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default CampaignLayout;
