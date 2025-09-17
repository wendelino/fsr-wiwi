import { format } from "date-fns";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function EventPreview({
  event,
  className,
}: {
  event: EventItem;
  className?: string;
}) {
  return (
    <Link
      href={`kalender/${encodeURIComponent(event.slug)}`}
      className={cn(" py-5 flex items-center cursor-pointer w-full", className)}
    >
      <div className="w-full truncate">
        <div className="flex items-center gap-x-2 flex-wrap-reverse">
          <h4 className="underline text-fsr font-semibold mb-1">
            {event.title}
          </h4>
          {event.registrable && <Badge>Anmeldepflichtig!</Badge>}
        </div>

        <span className="text-foreground/70 mr-2">
          {format(event.start, "HH:mm")}-{format(event.end, "HH:mm")}
        </span>
        <div className="text-muted-foreground truncate max-w-[80%]">
          {event.description}
        </div>
      </div>
      <div className="h-full flex items-center">
        <ChevronRight className="size-6 block" />
      </div>
    </Link>
  );
}
