
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  metrics?: string;
}

const TestimonialCard = ({ name, role, quote, avatar, metrics }: TestimonialCardProps) => {
  return (
    <Card className="p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-0">
        {/* Metrics badge */}
        {metrics && (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
            📈 {metrics}
          </div>
        )}
        
        {/* Quote */}
        <p className="text-gray-700 mb-6 leading-relaxed">"{quote}"</p>
        
        {/* Author */}
        <div className="flex items-center">
          <Avatar className="h-12 w-12 mr-3 border-2 border-gray-100">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-gray-900">{name}</h4>
            <p className="text-sm text-gray-600">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
