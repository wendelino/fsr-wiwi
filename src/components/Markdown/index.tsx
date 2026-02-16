'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Highlight, themes } from 'prism-react-renderer'
import { cn } from '@/utilities/ui'

interface MarkdownProps {
  content: string
  className?: string
}

export function Markdown({ content, className }: MarkdownProps) {
  return (
    <div className={cn('prose prose-slate max-w-none dark:prose-invert', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom code block with syntax highlighting
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : ''
            const inline = !className || !className.includes('language-')

            if (!inline && language) {
              return (
                <Highlight
                  theme={themes.nightOwl}
                  code={String(children).replace(/\n$/, '')}
                  language={language}
                >
                  {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre
                      className={cn(className, 'rounded-lg p-4 overflow-x-auto')}
                      style={style}
                    >
                      {tokens.map((line, lineIndex) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: Static code blocks don't reorder
                        <div key={lineIndex} {...getLineProps({ line })}>
                          {line.map((token, tokenIndex) => (
                            // biome-ignore lint/suspicious/noArrayIndexKey: Tokens are static within lines
                            <span key={tokenIndex} {...getTokenProps({ token })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              )
            }

            return (
              <code
                className={cn(
                  'bg-slate-100 dark:bg-slate-800 rounded px-1.5 py-0.5 text-sm font-mono',
                  className,
                )}
                {...props}
              >
                {children}
              </code>
            )
          },

          // Custom link styling
          a({ children, href, ...props }) {
            return (
              <a
                href={href}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                {...props}
              >
                {children}
              </a>
            )
          },

          // Custom table styling
          table({ children, ...props }) {
            return (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700" {...props}>
                  {children}
                </table>
              </div>
            )
          },

          // Custom blockquote styling
          blockquote({ children, ...props }) {
            return (
              <blockquote
                className="border-l-4 border-blue-500 pl-4 italic text-slate-700 dark:text-slate-300"
                {...props}
              >
                {children}
              </blockquote>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
