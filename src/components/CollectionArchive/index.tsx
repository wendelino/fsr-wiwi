import { ArrowRightCircle } from "lucide-react";
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
              return (
                <LinkWrapper
                  key={result.slug}
                  {...result}
                  slug={"events/" + result.slug}
                />
              );
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
