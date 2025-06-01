
import { Link, useParams, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumbs = () => {
  const { id } = useParams();
  const location = useLocation();

  const getStageFromPath = (path: string) => {
    if (path.includes("discovery")) return "Discovery";
    if (path.includes("outreach")) return "Outreach";
    if (path.includes("negotiation")) return "Negotiation";
    if (path.includes("contracts")) return "Contracts";
    if (path.includes("payments")) return "Payments";
    if (path.includes("reporting")) return "Reporting";
    return "";
  };

  const currentStage = getStageFromPath(location.pathname);
  const campaignName = `Campaign ${id}`;

  if (!id) return null;

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 py-3 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">
            Campaigns
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">{campaignName}</span>
          {currentStage && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span className="text-blue-600">{currentStage}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
