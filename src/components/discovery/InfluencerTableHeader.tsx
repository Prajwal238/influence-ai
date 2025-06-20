
import { ArrowUpDown } from "lucide-react";

const InfluencerTableHeader = () => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 mb-1 shadow-sm">
      <div className="grid grid-cols-11 gap-4 items-center text-sm font-medium text-gray-600">
        {/* Creator */}
        <div className="col-span-3 flex items-center space-x-1">
          <span>Creator</span>
        </div>

        {/* Followers */}
        <div className="col-span-2 text-center flex items-center justify-center space-x-1">
          <span>Followers</span>
          <ArrowUpDown className="h-3 w-3 cursor-pointer hover:text-gray-900" />
        </div>

        {/* Views */}
        <div className="col-span-1 text-center flex items-center justify-center space-x-1">
          <span>Enagagement rate</span>
          <ArrowUpDown className="h-3 w-3 cursor-pointer hover:text-gray-900" />
        </div>

        {/* Engagement */}
        <div className="col-span-1 text-center flex items-center justify-center space-x-1">
          <span>Rating</span>
          <ArrowUpDown className="h-3 w-3 cursor-pointer hover:text-gray-900" />
        </div>

        {/* Categories */}
        <div className="col-span-2">
          <span>Categories</span>
        </div>

        {/* Bio */}
        <div className="col-span-2">
          <span>Bio</span>
        </div>
      </div>
    </div>
  );
};

export default InfluencerTableHeader;
