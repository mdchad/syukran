import type { TourCategory, TourCategoriesShowcaseBlock as TourCategoriesShowcaseBlockProps } from '@/payload-types'

import React from 'react'
import RichText from '@/components/RichText'
import Link from 'next/link'
import { Media } from '@/components/Media'

export const TourCategoriesShowcaseBlock: React.FC<
  TourCategoriesShowcaseBlockProps & {
    id?: string
  }
> = (props) => {
  const { id, introContent, categories } = props

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      {hasCategories && (
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
            {categories.map((category, index) => {
              if (typeof category !== 'object' || category === null) return null

              const { title, description, icon, coverImage, slug } = category as TourCategory

              return (
                <Link
                  key={index}
                  href={`/tours?category=${slug}`}
                  className="group relative overflow-hidden rounded-lg border border-border bg-card"
                >
                  {coverImage && typeof coverImage === 'object' && (
                    <div className="aspect-[3/2] overflow-hidden">
                      <Media
                        resource={coverImage}
                        size="25vw"
                        imgClassName="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      {icon && <span>{icon}</span>}
                      <h3 className="font-semibold">{title}</h3>
                    </div>
                    {description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
