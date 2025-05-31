
import { Loader2 } from "lucide-react";

const SessionsLoadingState = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center space-x-2 text-gray-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Loading sessions...</span>
      </div>
    </div>
  );
};

export default SessionsLoadingState;
