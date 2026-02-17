import type React from "react";
import type { MarkdownBlock as MarkdownBlockProps } from "src/payload-types";
import { Markdown } from "@/components/Markdown";
import { cn } from "@/utilities/ui";

type Props = {
  className?: string;
} & MarkdownBlockProps;

export const MarkdownBlock: React.FC<Props> = ({ className, markdown }) => {
  return (
    <div className={cn("container my-8 w-full", className)}>
      <Markdown content={markdown} />
    </div>
  );
};
