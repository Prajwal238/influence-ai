
import { Link, useParams, useLocation } from "react-router-dom";
import { Search, MessageSquare, Handshake, FileText, CreditCard, BarChart3 } from "lucide-react";

const PipelineBar = () => {
  const { id } = useParams();
  const location = useLocation();

  const stages = [
    { name: "Discovery", path: `/campaigns/${id}/discovery`, icon: Search },
    { name: "Outreach", path: `/campaigns/${id}/outreach`, icon: MessageSquare },
    { name: "Negotiation", path: `/campaigns/${id}/negotiation`, icon: Handshake },
    { name: "Contracts", path: `/campaigns/${id}/contracts`, icon: FileText },
    { name: "Payments", path: `/campaigns/${id}/payments`, icon: CreditCard },
    { name: "Reporting", path: `/campaigns/${id}/reporting`, icon: BarChart3 },
  ];

  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-8 py-4">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isActive = location.pathname.includes(stage.path);
            const isCompleted = index < 2; // Mock completion status

            return (
              <Link
                key={stage.name}
                to={stage.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : isCompleted
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{stage.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PipelineBar;
