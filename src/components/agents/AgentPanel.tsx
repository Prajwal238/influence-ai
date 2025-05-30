
import FloatingChatButton from "./FloatingChatButton";

interface AgentPanelProps {
  agentName: string;
  agentType: 'discovery' | 'outreach' | 'negotiation';
}

const AgentPanel = ({ agentName, agentType }: AgentPanelProps) => {
  return <FloatingChatButton agentName={agentName} agentType={agentType} />;
};

export default AgentPanel;
