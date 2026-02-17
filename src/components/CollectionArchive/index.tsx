import type React from "react";
import { Card, type CardData } from "@/components/Card";
import { cn } from "@/utilities/ui";

export type CollectionArchiveItem = CardData & {
  relationTo?: "posts" | "pages" | "events";
};

export type Props = {
  posts: CollectionArchiveItem[];
  relationTo?: "posts" | "pages" | "events";
};

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts, relationTo } = props;

  return (
    <div className={cn("container")}>
      <div>
        <div className="grid grid-cols-4 gap-x-4 gap-y-4 sm:grid-cols-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-8 xl:gap-x-8">
          {posts?.map((result, index) => {
            if (typeof result === "object" && result !== null) {
              // Use the relationTo from the item if available, otherwise fall back to the prop
              const itemRelationTo = result.relationTo || relationTo || "posts";

              return (
                <div className="col-span-4" key={index}>
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
        </div>
      </div>
    </div>
  );
};
