import type { Tour, TourArchiveBlock as TourArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { TourCollectionArchive } from '@/components/TourCollectionArchive'

export const TourArchiveBlock: React.FC<
  TourArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, tourCategories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 10

  let tours: Tour[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = tourCategories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedTours = await payload.find({
      collection: 'tours',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              tourCategories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    tours = fetchedTours.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedTours = selectedDocs.map((tour) => {
        if (typeof tour.value === 'object') return tour.value
      }) as Tour[]

      tours = filteredSelectedTours
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <TourCollectionArchive tours={tours} />
    </div>
  )
}
