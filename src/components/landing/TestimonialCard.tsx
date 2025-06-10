
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, TrendingUp } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  metric?: string;
  company?: string;
}

const TestimonialCard = ({ name, role, quote, avatar, metric, company }: TestimonialCardProps) => {
  return (
    <Card className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
      {/* Background Quote Icon */}
      <Quote className="absolute top-4 right-4 h-8 w-8 text-blue-100" />
      
      <CardContent className="p-0">
        {/* Metric Badge */}
        {metric && (
          <div className="flex items-center mb-4">
            <div className="bg-green-50 border border-green-200 rounded-full px-3 py-1 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm font-semibold text-green-700">{metric}</span>
            </div>
          </div>
        )}

        {/* Quote */}
        <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 relative z-10">
          "{quote}"
        </blockquote>

        {/* Author Info */}
        <div className="flex items-center">
          <Avatar className="h-14 w-14 mr-4 border-2 border-gray-100">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-bold text-gray-900 text-lg">{name}</h4>
            <p className="text-gray-600 text-sm">{role}</p>
            {company && (
              <p className="text-blue-600 text-sm font-medium">{company}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
