
import { ScrollArea } from "@/components/ui/scroll-area";
import SessionsLoadingState from "./SessionsLoadingState";
import SessionsEmptyState from "./SessionsEmptyState";
import SessionItem from "./SessionItem";

interface SessionsListProps {
  sessions: string[];
  isLoading: boolean;
  currentSessionId: string;
  onSessionSelect: (sessionId: string) => void;
}

const SessionsList = ({ sessions, isLoading, currentSessionId, onSessionSelect }: SessionsListProps) => {
  return (
    <div className="flex-1 overflow-hidden">
      {isLoading ? (
        <SessionsLoadingState />
      ) : (
        <ScrollArea className="h-full">
          <div className="p-3 space-y-1">
            {sessions.length === 0 ? (
              <SessionsEmptyState />
            ) : (
              sessions.map((sessionId) => (
                <SessionItem
                  key={sessionId}
                  sessionId={sessionId}
                  currentSessionId={currentSessionId}
                  onSessionSelect={onSessionSelect}
                />
              ))
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default SessionsList;
