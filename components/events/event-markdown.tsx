import { cn } from "@/lib/utils";
import Markdown from "markdown-to-jsx";

// Ohne Typography-Plugin: Elemente einzeln gestalten
const overrides = {
  h1: { props: { className: "mt-8 mb-3 text-2xl font-black tracking-tight first:mt-0" } },
  h2: { props: { className: "mt-8 mb-3 text-2xl font-black tracking-tight first:mt-0" } },
  h3: { props: { className: "mt-6 mb-2 text-lg font-bold first:mt-0" } },
  h4: { props: { className: "mt-6 mb-2 font-bold first:mt-0" } },
  // pre-line erhält einfache Zeilenumbrüche aus bisherigen Beschreibungen
  p: { props: { className: "my-3 whitespace-pre-line first:mt-0 last:mb-0" } },
  ul: { props: { className: "my-3 list-disc space-y-1 pl-5 marker:text-fsr" } },
  ol: { props: { className: "my-3 list-decimal space-y-1 pl-5 marker:font-semibold marker:text-fsr" } },
  strong: { props: { className: "font-semibold text-foreground" } },
  blockquote: { props: { className: "my-4 border-l-4 border-fsr/40 pl-4 italic" } },
  hr: { props: { className: "my-6" } },
  code: { props: { className: "rounded bg-muted px-1.5 py-0.5 text-[0.9em]" } },
  a: {
    component: ({ href = "", ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
      const external = /^https?:\/\//.test(href);
      return (
        <a
          {...props}
          href={href}
          className="font-medium text-fsr underline underline-offset-4"
          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        />
      );
    },
  },
};

/** Event-Beschreibung aus dem CMS als Markdown. */
export function EventMarkdown({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div className={cn("text-foreground/80", className)}>
      <Markdown options={{ overrides, forceBlock: true, disableParsingRawHTML: true }}>
        {children}
      </Markdown>
    </div>
  );
}
