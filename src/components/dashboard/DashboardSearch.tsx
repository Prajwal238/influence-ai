
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

interface DashboardSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const DashboardSearch = ({ searchQuery, setSearchQuery }: DashboardSearchProps) => {
  return (
    <div className="mb-4">
      <div className="bg-white rounded-2xl border border-gray-200/60 p-4 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search campaigns, objectives, or platforms..." 
              className="pl-12 pr-4 py-3 bg-gray-50/50 border-gray-200/60 rounded-xl focus:bg-white focus:border-blue-300 transition-all duration-200 text-gray-700 placeholder:text-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filter Button */}
          <Button 
            variant="outline" 
            className="px-6 py-3 border-gray-200/60 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-gray-600 hover:text-gray-700"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSearch;
