
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Verified } from "lucide-react";

interface Influencer {
  name: string;
  bio: string;
  location: string;
  image: string;
}

interface InfluencerHeaderProps {
  influencer: Pick<Influencer, 'name' | 'bio' | 'location' | 'image'>;
}

const InfluencerHeader = ({ influencer }: InfluencerHeaderProps) => {
  return (
    <div className="p-6 pb-4">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <Avatar className="h-16 w-16 ring-2 ring-white shadow-lg">
            <AvatarImage src={influencer.image} alt={influencer.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-lg">
              {influencer.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {/* Verification badge */}
          <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1 shadow-sm">
            <Verified className="h-3 w-3 text-white fill-current" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-xl text-gray-900 mb-1 truncate">{influencer.name}</h3>
          <p className="text-sm text-gray-600 italic line-clamp-2 mb-3 leading-relaxed">{influencer.bio}</p>
          <div className="flex items-center text-xs text-gray-500 bg-gray-50/80 backdrop-blur-sm px-2 py-1 rounded-full w-fit">
            <MapPin className="h-3 w-3 mr-1" />
            <span className="font-medium">{influencer.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerHeader;
