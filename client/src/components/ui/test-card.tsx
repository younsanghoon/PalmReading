import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TestCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  tags: string[];
  onClick: () => void;
  className?: string;
}

export function TestCard({ 
  title, 
  description, 
  icon, 
  duration, 
  tags, 
  onClick, 
  className 
}: TestCardProps) {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-primary/20 to-primary/10">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex justify-center space-x-2 mb-4">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-center text-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">{duration}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
