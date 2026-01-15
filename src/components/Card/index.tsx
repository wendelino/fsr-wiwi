'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post, Page, Event } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = {
  slug?: string | null
  categories?: Post['categories']
  meta?: Post['meta']
  title?: string | null
}

export type CardPageData = {
  slug?: string | null
  meta?: Page['meta']
  title?: string | null
}

export type CardEventData = {
  slug?: string | null
  title?: string | null
  meta?: Event['meta']
  start?: string | null
  end?: string | null
  location?: string | null
}

export type CardData = CardPostData | CardPageData | CardEventData

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardData
  relationTo?: 'posts' | 'pages' | 'events'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo = 'posts', showCategories, title: titleFromProps } = props

  const { slug, meta, title } = doc || {}
  const categories = doc && 'categories' in doc ? doc.categories : undefined
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  
  // Generate href based on collection type
  const href = relationTo === 'posts' ? `/posts/${slug}` : relationTo === 'events' ? `/events/${slug}` : `/${slug}`

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full ">
        {!metaImage && <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground">Kein Bild</div>}
        {metaImage && typeof metaImage === 'object' && <Media resource={metaImage} size="33vw" />}
      </div>
      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
    </article>
  )
}
