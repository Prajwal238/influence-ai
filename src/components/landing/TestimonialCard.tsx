
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, TrendingUp, Star, Award } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  metric?: string;
  company?: string;
  isHero?: boolean;
  socialProof?: string;
}

const TestimonialCard = ({ name, role, quote, avatar, metric, company, isHero = false, socialProof }: TestimonialCardProps) => {
  const cardClasses = isHero 
    ? "p-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-blue-200 hover:border-blue-300 relative overflow-hidden transform hover:-translate-y-2"
    : "p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden hover:-translate-y-1";

  return (
    <Card className={cardClasses}>
      {/* Background Quote Icon */}
      <Quote className={`absolute top-4 right-4 ${isHero ? 'h-10 w-10 text-blue-100' : 'h-8 w-8 text-blue-100'}`} />
      
      {/* Hero Badge */}
      {isHero && (
        <div className="absolute top-4 left-4">
          <div className="bg-blue-600 text-white rounded-full px-3 py-1 text-xs font-bold flex items-center">
            <Star className="h-3 w-3 mr-1 fill-current" />
            Featured
          </div>
        </div>
      )}
      
      <CardContent className="p-0">
        {/* Social Proof Badge */}
        {socialProof && (
          <div className="flex items-center mb-4">
            <div className="bg-green-50 border border-green-200 rounded-full px-3 py-1 flex items-center">
              <Award className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-xs font-semibold text-green-700">{socialProof}</span>
            </div>
          </div>
        )}

        {/* Metric Badge */}
        {metric && (
          <div className="flex items-center mb-6">
            <div className="bg-green-50 border border-green-200 rounded-full px-4 py-2 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
              <span className={`font-semibold text-green-700 ${isHero ? 'text-base' : 'text-sm'}`}>{metric}</span>
            </div>
          </div>
        )}

        {/* Quote */}
        <blockquote className={`text-gray-700 leading-relaxed mb-8 relative z-10 ${isHero ? 'text-xl' : 'text-lg'}`}>
          "{quote}"
        </blockquote>

        {/* Author Info */}
        <div className="flex items-center">
          <Avatar className={`mr-4 border-2 border-gray-100 ${isHero ? 'h-16 w-16' : 'h-14 w-14'}`}>
            <AvatarImage src={avatar} alt={name} className="object-cover" />
            <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className={`font-bold text-gray-900 ${isHero ? 'text-xl' : 'text-lg'}`}>{name}</h4>
            <p className={`text-gray-600 ${isHero ? 'text-base' : 'text-sm'}`}>{role}</p>
            {company && (
              <p className={`text-blue-600 font-medium ${isHero ? 'text-base' : 'text-sm'}`}>{company}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
