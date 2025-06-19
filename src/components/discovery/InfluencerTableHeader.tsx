
import { ArrowUpDown } from "lucide-react";

const InfluencerTableHeader = () => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 mb-1">
      <div className="grid grid-cols-12 gap-2 items-center text-xs font-medium text-gray-600">
        {/* Creator */}
        <div className="col-span-3 flex items-center space-x-1">
          <span>Creator</span>
        </div>

        {/* Match */}
        <div className="col-span-1 text-center flex items-center justify-center space-x-1">
          <span>Match</span>
          <ArrowUpDown className="h-2 w-2" />
        </div>

        {/* Followers */}
        <div className="col-span-2 text-center flex items-center justify-center space-x-1">
          <span>Followers</span>
          <ArrowUpDown className="h-2 w-2" />
        </div>

        {/* Views */}
        <div className="col-span-1 text-center flex items-center justify-center space-x-1">
          <span>Views</span>
          <ArrowUpDown className="h-2 w-2" />
        </div>

        {/* Rating */}
        <div className="col-span-1 text-center flex items-center justify-center space-x-1">
          <span>Rating</span>
          <ArrowUpDown className="h-2 w-2" />
        </div>

        {/* Categories */}
        <div className="col-span-2">
          <span>Categories</span>
        </div>

        {/* Actions */}
        <div className="col-span-2 text-center">
          <span>Actions</span>
        </div>
      </div>
    </div>
  );
};

export default InfluencerTableHeader;
