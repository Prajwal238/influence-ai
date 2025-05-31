
import { AgentChatProps } from './types';
import ChatOrchestrator from './ChatOrchestrator';

const AgentChat = ({ agentName, agentType, onClose, className }: AgentChatProps) => {
  return (
    <ChatOrchestrator
      agentName={agentName}
      agentType={agentType}
      onClose={onClose}
      className={className}
    />
  );
};

export default AgentChat;
