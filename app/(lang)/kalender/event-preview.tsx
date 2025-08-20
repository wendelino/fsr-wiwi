import { format } from "date-fns";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EventPreview({ event, className }: { event: EventItem, className?: string }) {
  return (
    <Link
      href={`kalender/${encodeURIComponent(event.slug)}`}
      className={cn(" py-5 flex items-center cursor-pointer", className)}
    >
      <div className="flex-1 w-full">
        <h4 className="underline text-fsr font-semibold mb-1">{event.title}</h4>
        <span className="text-foreground/70 mr-2">
          {format(event.start, "HH:mm")}-{format(event.end, "HH:mm")}
        </span>
        <div className="text-muted-foreground truncate max-w-[66%]">
          {event.description } 
        </div> 
      </div>
      <ChevronRight className="ml-auto w-6 h-6" />
    </Link>
  );
}
