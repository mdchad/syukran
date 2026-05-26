import type { Metadata } from 'next/types'

import { TourCollectionArchive } from '@/components/TourCollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const tours = await payload.find({
    collection: 'tours',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      tourCategories: true,
      featuredImage: true,
      price: true,
      duration: true,
      destination: true,
      difficulty: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Tours</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="tours"
          currentPage={tours.page}
          limit={12}
          totalDocs={tours.totalDocs}
        />
      </div>

      <TourCollectionArchive tours={tours.docs} />

      <div className="container">
        {tours.totalPages > 1 && tours.page && (
          <Pagination page={tours.page} totalPages={tours.totalPages} basePath="/tours" />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Syukran Travel Tours`,
  }
}
