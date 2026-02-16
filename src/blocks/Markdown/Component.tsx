import type { MarkdownBlock as MarkdownBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import { Markdown } from '@/components/Markdown'

type Props = {
  className?: string
} & MarkdownBlockProps

export const MarkdownBlock: React.FC<Props> = ({ className, markdown }) => {
  return (
    <div className={cn('my-8 w-full container', className)}>
      <Markdown content={markdown} />
    </div>
  )
}
