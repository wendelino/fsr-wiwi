"use client";

import { Highlight, themes } from "prism-react-renderer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/utilities/ui";

interface MarkdownProps {
  className?: string;
  content: string;
}

export function Markdown({ content, className }: MarkdownProps) {
  return (
    <div
      className={cn(
        "prose prose-slate dark:prose-invert max-w-none",
        className
      )}
    >
      <ReactMarkdown
        components={{
          // Custom code block with syntax highlighting
          code({ node: _node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            const inline = !(className && className.includes("language-"));

            if (!inline && language) {
              return (
                <Highlight
                  code={String(children).replace(/\n$/, "")}
                  language={language}
                  theme={themes.nightOwl}
                >
                  {({
                    className,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps,
                  }) => (
                    <pre
                      className={cn(
                        className,
                        "overflow-x-auto rounded-lg p-4"
                      )}
                      style={style}
                    >
                      {tokens.map((line, lineIndex) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: Static code blocks don't reorder
                        <div key={lineIndex} {...getLineProps({ line })}>
                          {line.map((token, tokenIndex) => (
                            // biome-ignore lint/suspicious/noArrayIndexKey: Tokens are static within lines
                            <span
                              key={tokenIndex}
                              {...getTokenProps({ token })}
                            />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              );
            }

            return (
              <code
                className={cn(
                  "rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm dark:bg-slate-800",
                  className
                )}
                {...props}
              >
                {children}
              </code>
            );
          },

          // Custom link styling
          a({ children, href, ...props }) {
            return (
              <a
                className="text-rose-900 transition-colors hover:text-rose-700 dark:text-rose-500 dark:hover:text-rose-400"
                href={href}
                rel={
                  href?.startsWith("http") ? "noopener noreferrer" : undefined
                }
                target={href?.startsWith("http") ? "_blank" : undefined}
                {...props}
              >
                {children}
              </a>
            );
          },

          // Custom table styling
          table({ children, ...props }) {
            return (
              <div className="overflow-x-auto">
                <table
                  className="min-w-full divide-y divide-slate-200 dark:divide-slate-700"
                  {...props}
                >
                  {children}
                </table>
              </div>
            );
          },

          // Custom blockquote styling
          blockquote({ children, ...props }) {
            return (
              <blockquote
                className="border-blue-500 border-l-4 pl-4 text-slate-700 italic dark:text-slate-300"
                {...props}
              >
                {children}
              </blockquote>
            );
          },
        }}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
