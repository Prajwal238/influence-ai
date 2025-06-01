
import OutreachStats from "./OutreachStats";
import OutreachLog from "./OutreachLog";
import { OutreachEntry } from "@/types/outreach";

interface OutreachPageSidebarProps {
  outreachLog: OutreachEntry[];
}

const OutreachPageSidebar = ({ outreachLog }: OutreachPageSidebarProps) => {
  return (
    <div className="hidden lg:block w-80 space-y-6">
      <div className="sticky top-8">
        <div className="space-y-6">
          <OutreachStats />
          <OutreachLog outreachLog={outreachLog} />
        </div>
      </div>
    </div>
  );
};

export default OutreachPageSidebar;
