import { cn } from "@/lib/utils";

export function Header({
  children,
  className,
  id
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div 
      className={cn(
        "font-bold text-3xl py-8 md:text-5xl md:py-16 scroll-mt-16",
         className
      )}
      id={id}
    >
      {children}
    </div>
  );
}

export function SubHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div 
      className={cn(
        "font-bold text-lg py-4 md:text-2xl",
         className
      )}
    >
      {children}
    </div>
  );
}
