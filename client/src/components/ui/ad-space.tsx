import { cn } from "@/lib/utils";

interface AdSpaceProps {
  type: 'banner' | 'rectangle' | 'skyscraper' | 'mobile';
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

export function AdSpace({ type, className, position = 'center' }: AdSpaceProps) {
  const getSizeClasses = () => {
    switch (type) {
      case 'banner':
        return 'w-full h-20 max-w-4xl'; // 728x90
      case 'rectangle':
        return 'w-80 h-64'; // 320x250
      case 'skyscraper':
        return 'w-40 h-96'; // 160x600
      case 'mobile':
        return 'w-full h-12 max-w-sm'; // 320x50
      default:
        return 'w-80 h-64';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'justify-start';
      case 'bottom':
        return 'justify-end';
      case 'left':
        return 'justify-start';
      case 'right':
        return 'justify-end';
      case 'center':
      default:
        return 'justify-center';
    }
  };

  return (
    <div className={cn("flex items-center", getPositionClasses(), className)}>
      <div className={cn(
        "border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg",
        "flex items-center justify-center bg-gray-50 dark:bg-gray-800/50",
        "text-gray-500 dark:text-gray-400 text-sm font-medium",
        getSizeClasses()
      )}>
        <div className="text-center">
          <div className="text-xs opacity-70">광고 영역</div>
          <div className="text-xs opacity-50 mt-1">
            {type === 'banner' && '728×90'}
            {type === 'rectangle' && '320×250'}
            {type === 'skyscraper' && '160×600'}
            {type === 'mobile' && '320×50'}
          </div>
        </div>
      </div>
    </div>
  );
}