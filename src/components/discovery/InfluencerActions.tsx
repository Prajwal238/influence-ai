
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Heart } from "lucide-react";
import InfluencerDialog from "./InfluencerDialog";

interface Platform {
  name: string;
  handle: string;
  followers: string;
  engagement: string;
  verified: boolean;
  topBrand: string | null;
}

interface Influencer {
  id: number;
  name: string;
  bio: string;
  location: string;
  image: string;
  totalFollowers: string;
  avgEngagement: string;
  languages: string[];
  rating: number;
  niches: string[];
  platforms: Platform[];
}

interface InfluencerActionsProps {
  influencer: Influencer;
}

const InfluencerActions = ({ influencer }: InfluencerActionsProps) => {
  return (
    <div className="px-6 pb-6 pt-2 border-t border-gray-100">
      <div className="flex space-x-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex-1 h-9">
              <Eye className="h-4 w-4 mr-2" />
              View Profile
            </Button>
          </DialogTrigger>
          <InfluencerDialog influencer={influencer} />
        </Dialog>
        <Button size="sm" className="flex-1 h-9 bg-blue-600 hover:bg-blue-700">
          <Heart className="h-4 w-4 mr-2" />
          Add to Campaign
        </Button>
      </div>
    </div>
  );
};

export default InfluencerActions;
