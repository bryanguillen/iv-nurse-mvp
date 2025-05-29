import { cn } from '@/lib/utils';

interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ContentContainer({ children, className }: ContentContainerProps) {
  return (
    <div className={cn('container mx-auto p-4 bg-white rounded-lg shadow-md', className)}>
      {children}
    </div>
  );
}
