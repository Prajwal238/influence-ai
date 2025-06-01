
import { CheckCircle, Clock, AlertCircle, FileText } from "lucide-react";
import { ContractStatus } from "@/types/contract";

export const getStatusIcon = (status: ContractStatus) => {
  switch (status) {
    case "signed": return CheckCircle;
    case "pending": return Clock;
    case "draft": return AlertCircle;
    default: return FileText;
  }
};

export const getStatusColor = (status: ContractStatus) => {
  switch (status) {
    case "signed": return "bg-green-100 text-green-800";
    case "pending": return "bg-yellow-100 text-yellow-800";
    case "draft": return "bg-gray-100 text-gray-800";
    default: return "bg-gray-100 text-gray-800";
  }
};
