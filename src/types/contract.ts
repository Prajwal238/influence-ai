
import { Influencer } from "@/types/influencer";

export interface ContractData {
  id: string;
  influencer: Influencer;
  status: "signed" | "pending" | "draft";
  deliverables: string;
  value: string;
  deadline: string;
  signedDate?: string;
  sentDate?: string;
}

export type ContractStatus = "signed" | "pending" | "draft";
