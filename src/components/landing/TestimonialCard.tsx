
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

const TestimonialCard = ({ name, role, quote, avatar }: TestimonialCardProps) => {
  return (
    <Card className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex items-center mb-4">
          <Avatar className="h-12 w-12 mr-3">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-gray-900">{name}</h4>
            <p className="text-sm text-gray-600">{role}</p>
          </div>
        </div>
        <p className="text-gray-700 italic">"{quote}"</p>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
