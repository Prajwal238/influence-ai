
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock } from "lucide-react";

interface PaymentMilestonesProps {
  milestones: Array<{
    name: string;
    completed: boolean;
  }>;
}

const PaymentMilestones = ({ milestones }: PaymentMilestonesProps) => {
  const completedCount = milestones.filter(m => m.completed).length;
  const progressPercentage = Math.round((completedCount / milestones.length) * 100);

  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Payment Milestones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                milestone.completed 
                  ? "bg-green-100 text-green-600" 
                  : "bg-gray-100 text-gray-400"
              }`}>
                {milestone.completed ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Clock className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${
                  milestone.completed ? "text-gray-900" : "text-gray-500"
                }`}>
                  {milestone.name}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{completedCount} of {milestones.length} completed</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMilestones;
