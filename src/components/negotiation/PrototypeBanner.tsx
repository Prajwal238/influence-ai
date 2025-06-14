
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const PrototypeBanner = () => {
  return (
    <Alert className="bg-[#E3F2FD] border-[#2196F3] border-l-4 border-l-[#2196F3] border-t-0 border-r-0 border-b-0 rounded-lg">
      <Info className="h-4 w-4 text-[#2196F3]" />
      <AlertDescription className="text-sm text-[#1D1D1F] font-sans">
        <strong>Prototype Feature:</strong> Input your phone number to receive a call from our AI agent. 
        This feature is currently in development and calls will be simulated.
      </AlertDescription>
    </Alert>
  );
};

export default PrototypeBanner;

