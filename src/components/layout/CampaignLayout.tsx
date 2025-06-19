
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
      <main className="w-full py-2">
        {children}
      </main>
    </div>
  );
};

export default CampaignLayout;
