
import { useState } from "react";
import AgentPanel from "@/components/agents/AgentPanel";

const OutreachPageHeader = () => {
  const [showAgentPanel, setShowAgentPanel] = useState(false);

  return (
    <>
      {/* Removed the header section entirely - no title or description */}
      
      {showAgentPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <AgentPanel 
              agentName="Outreach Agent" 
              agentType="outreach"
              onClose={() => setShowAgentPanel(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default OutreachPageHeader;
