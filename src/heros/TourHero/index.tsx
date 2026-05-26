import React from 'react'

import type { Tour } from '@/payload-types'

import { Media } from '@/components/Media'

export const TourHero: React.FC<{
  tour: Tour
}> = ({ tour }) => {
  const { tourCategories, featuredImage, title, destination, duration, price, difficulty } = tour

  return (
    <div className="relative -mt-[10.4rem] flex items-end">
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="uppercase text-sm mb-6">
            {tourCategories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category
                const titleToUse = categoryTitle || 'Untitled category'
                const isLast = index === tourCategories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>

          <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            {destination && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Destination</p>
                <p>{destination}</p>
              </div>
            )}
            {duration && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Duration</p>
                <p>{duration}</p>
              </div>
            )}
            {difficulty && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Difficulty</p>
                <p className="capitalize">{difficulty}</p>
              </div>
            )}
            {price != null && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">From</p>
                <p className="text-xl font-semibold">${price.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {featuredImage && typeof featuredImage !== 'string' && (
          <Media fill priority imgClassName="-z-10 object-cover" resource={featuredImage} />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-linear-to-t from-black to-transparent" />
      </div>
    </div>
  )
}
