'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Tour } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardTourData = Pick<
  Tour,
  'slug' | 'tourCategories' | 'meta' | 'title' | 'featuredImage' | 'price' | 'duration' | 'destination' | 'difficulty'
>

export const TourCard: React.FC<{
  className?: string
  doc?: CardTourData
  showCategories?: boolean
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, showCategories } = props

  const { slug, tourCategories, meta, title, featuredImage, price, duration, destination, difficulty } = doc || {}
  const { description, image: metaImage } = meta || {}

  const image = featuredImage || metaImage
  const hasCategories = tourCategories && Array.isArray(tourCategories) && tourCategories.length > 0
  const href = `/tours/${slug}`

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full aspect-[4/3]">
        {!image && <div className="flex items-center justify-center h-full bg-muted text-muted-foreground">No image</div>}
        {image && typeof image === 'object' && <Media resource={image} size="33vw" imgClassName="object-cover w-full h-full" />}
      </div>
      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-2 text-muted-foreground">
            {tourCategories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category
                const isLast = index === tourCategories.length - 1

                return (
                  <Fragment key={index}>
                    {categoryTitle || 'Untitled category'}
                    {!isLast && <Fragment>, &nbsp;</Fragment>}
                  </Fragment>
                )
              }
              return null
            })}
          </div>
        )}
        {title && (
          <div className="prose dark:prose-invert">
            <h3 className="mb-1">
              <Link className="not-prose" href={href} ref={link.ref}>
                {title}
              </Link>
            </h3>
          </div>
        )}
        {destination && (
          <p className="text-sm text-muted-foreground mb-2">{destination}</p>
        )}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {duration && <span>{duration}</span>}
            {difficulty && (
              <>
                {duration && <span>·</span>}
                <span className="capitalize">{difficulty}</span>
              </>
            )}
          </div>
          {price != null && (
            <span className="font-semibold">
              ${price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
