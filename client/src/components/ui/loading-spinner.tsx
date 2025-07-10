import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ className, size = 'md' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={cn(
      "inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent",
      sizeClasses[size],
      className
    )}>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
