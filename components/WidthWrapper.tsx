import { cn } from "@/lib/utils";

export default function WidthWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div 
      className={cn(
        "w-full max-w-6xl mx-auto  px-4",
         className
      )}
    >
      {children}
    </div>
  );
}
