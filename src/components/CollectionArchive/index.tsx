import { format } from "date-fns";
import { ArrowRightCircle, Calendar, MapPin, Timer } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { Card, type CardData } from "@/components/Card";
import { cn } from "@/utilities/ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export type CollectionArchiveItem = CardData & {
  relationTo?: "posts" | "pages" | "events";
};

export type Props = {
  posts: CollectionArchiveItem[];
  relationTo?: "posts" | "pages" | "events";
  extended?: boolean;
};

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts, relationTo, extended = false } = props;

  const data = posts.reduce(
    (acc, result) => {
      if (result.relationTo) {
        acc[result.relationTo].push(result);
      } else {
        acc.undef.push(result);
      }
      return acc;
    },
    {
      posts: [] as CollectionArchiveItem[],
      events: [] as CollectionArchiveItem[],
      pages: [] as CollectionArchiveItem[],
      undef: [] as CollectionArchiveItem[],
    } satisfies Record<
      "posts" | "events" | "pages" | "undef",
      CollectionArchiveItem[]
    >
  );

  if (extended) {
    return (
      <>
        <ElementWrapper title="Seiten">
          {data.pages.map((result) => {
            if (typeof result === "object" && result !== null) {
              return <LinkWrapper key={result.slug} {...result} />;
            }

            return null;
          })}
        </ElementWrapper>
        <ElementWrapper title="Beiträge">
          {data.posts.slice(0, 3).map((result) => {
            if (typeof result === "object" && result !== null) {
              // Use the relationTo from the item if available, otherwise fall back to the prop
              const itemRelationTo = result.relationTo || relationTo || "posts";

              return (
                <div className="col-span-4" key={result.slug}>
                  <Card
                    className="h-full"
                    doc={result}
                    relationTo={itemRelationTo}
                    showCategories={itemRelationTo === "posts"}
                  />
                </div>
              );
            }

            return null;
          })}
        </ElementWrapper>
        <ElementWrapper title="Events">
          {data.events.map((result) => {
            if (typeof result === "object" && result !== null) {
              return <EventWrapper key={result.slug} {...result} />;
            }

            return null;
          })}
        </ElementWrapper>
      </>
    );
  }
  return (
    <ElementWrapper>
      {posts?.map((result, index) => (
        <DefaultWrapper
          key={index}
          relationTo={relationTo || "posts"}
          result={result}
        />
      ))}
    </ElementWrapper>
  );
};

const DefaultWrapper = ({
  result,
  relationTo,
}: {
  result: CollectionArchiveItem;
  relationTo: "posts" | "pages" | "events";
}) => {
  if (typeof result === "object" && result !== null) {
    // Use the relationTo from the item if available, otherwise fall back to the prop
    const itemRelationTo = result.relationTo || relationTo || "posts";

    return (
      <div className="col-span-4">
        <Card
          className="h-full"
          doc={result}
          relationTo={itemRelationTo}
          showCategories={itemRelationTo === "posts"}
        />
      </div>
    );
  }
  return null;
};

const ElementWrapper = ({
  children,
  className,
  title,
}: {
  children: React.ReactNode[];
  className?: string;
  title?: string;
}) => {
  if (children.length === 0) {
    return null;
  }
  return (
    <div className={cn("container mt-16 mb-4 space-y-4", className)}>
      {title && <h3 className="my-8 font-bold text-xl underline">{title}</h3>}
      <GridWrapper>
        {children.slice(0, 3).map((child, index) => (
          <div className="col-span-4" key={index}>
            {child}
          </div>
        ))}
      </GridWrapper>
      {children.length > 3 && (
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <h3 className="font-bold">{`${children.length - 3} weitere ${title}`}</h3>
            </AccordionTrigger>
            <AccordionContent className="py-4">
              <GridWrapper>
                {children.slice(3).map((child, index) => (
                  <div className="col-span-4" key={index}>
                    {child}
                  </div>
                ))}
              </GridWrapper>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};

const GridWrapper = ({ children }: { children: React.ReactNode[] }) => {
  return (
    <div className="grid grid-cols-4 gap-x-4 gap-y-4 sm:grid-cols-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-8 xl:gap-x-8">
      {children}
    </div>
  );
};
const LinkWrapper = ({
  slug,
  title,
}: {
  slug?: string | null;
  title?: string | null;
}) => {
  if (!(slug && title)) {
    return null;
  }
  return (
    <div className="col-span-4">
      <Link
        className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 hover:cursor-pointer hover:bg-card/80"
        href={`/${slug}`}
      >
        <h3 className="font-bold md:text-xl">{title}</h3>
        <ArrowRightCircle className="ml-auto size-5" />
      </Link>
    </div>
  );
};

const formatEventDuration = (
  start: string | Date | null | undefined,
  end: string | Date | null | undefined
): string => {
  if (!(start && end)) {
    return "";
  }

  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate.getTime() - startDate.getTime();

  if (Number.isNaN(diffMs) || diffMs <= 0) {
    return "";
  }

  const totalMinutes = Math.round(diffMs / 60_000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours && minutes) {
    return `${hours} Std. ${minutes} Min.`;
  }

  if (hours) {
    return `${hours} Std.`;
  }

  return `${minutes} Min.`;
};

const EventWrapper = ({
  slug,
  title,
  start,
  end,
  location,
}: {
  slug?: string | null;
  title?: string | null;
  start?: string | Date | null;
  location?: string | null;
  end?: string | Date | null;
}) => {
  if (!(slug && title && start && location)) {
    return null;
  }

  const startDate = new Date(start);
  const endDate = end ? new Date(end) : null;
  const hasValidStart = !Number.isNaN(startDate.getTime());
  const hasValidEnd = endDate ? !Number.isNaN(endDate.getTime()) : false;

  if (!hasValidStart) {
    return null;
  }

  const baseDateLabel = format(startDate, "dd.MM.yyyy");
  const baseTimeLabel = format(startDate, "HH:mm");
  const dateLabel = baseDateLabel;
  const timeLabel = baseTimeLabel;

  const durationLabel = formatEventDuration(
    hasValidStart ? startDate : null,
    hasValidEnd ? endDate : null
  );

  return (
    <Link
      className="group flex h-full items-center gap-4 rounded-xl border border-border bg-card/80 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card"
      href={`/events/${slug}`}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <h3 className="line-clamp-2 font-semibold text-lg md:text-xl">
          {title}
        </h3>
        {location && (
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-primary" />
            {location}
          </span>
        )}
        <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-2.5 py-1">
            <Calendar className="size-3.5 text-primary" />
            {dateLabel}, {timeLabel}
          </span>
          {durationLabel && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-2.5 py-1">
              <Timer className="size-3.5 text-primary" />
              {durationLabel}
            </span>
          )}
        </div>
      </div>
      <ArrowRightCircle className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
    </Link>
  );
};
