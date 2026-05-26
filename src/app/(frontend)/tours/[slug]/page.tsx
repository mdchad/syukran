import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Tour } from '@/payload-types'

import { TourHero } from '@/heros/TourHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Media } from '@/components/Media'
import { TourCard } from '@/components/TourCard'
import { formatDateTime } from '@/utilities/formatDateTime'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const tours = await payload.find({
    collection: 'tours',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = tours.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function TourPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/tours/' + decodedSlug
  const tour = await queryTourBySlug({ slug: decodedSlug })

  if (!tour) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <TourHero tour={tour} />

      <div className="container max-w-[48rem] mx-auto pt-8">
        {/* Description */}
        {tour.description && (
          <section className="mb-12">
            <RichText data={tour.description} enableGutter={false} />
          </section>
        )}

        {/* Highlights */}
        {tour.highlights && tour.highlights.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Highlights</h2>
            <ul className="space-y-2">
              {tour.highlights.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 shrink-0">✓</span>
                  <span>{item.highlight}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Itinerary */}
        {tour.itinerary && tour.itinerary.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Itinerary</h2>
            <div className="space-y-6">
              {tour.itinerary.map((day, index) => (
                <div key={index} className="border-l-2 border-border pl-6 relative">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-background" />
                  <h3 className="font-semibold text-lg mb-1">
                    Day {day.day}: {day.title}
                  </h3>
                  {day.description && (
                    <div className="mb-2 text-muted-foreground">
                      <RichText data={day.description} enableGutter={false} />
                    </div>
                  )}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {day.meals && day.meals.length > 0 && (
                      <span>Meals: {day.meals.map((m) => m.charAt(0).toUpperCase() + m.slice(1)).join(', ')}</span>
                    )}
                    {day.accommodation && <span>Stay: {day.accommodation}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Pricing */}
        {tour.pricing && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Pricing</h2>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full">
                <tbody>
                  {tour.pricing.adult != null && (
                    <tr className="border-b border-border">
                      <td className="p-4 font-medium">Adult</td>
                      <td className="p-4 text-right">${tour.pricing.adult.toLocaleString()}</td>
                    </tr>
                  )}
                  {tour.pricing.child != null && (
                    <tr className="border-b border-border">
                      <td className="p-4 font-medium">Child</td>
                      <td className="p-4 text-right">${tour.pricing.child.toLocaleString()}</td>
                    </tr>
                  )}
                  {tour.pricing.infant != null && (
                    <tr>
                      <td className="p-4 font-medium">Infant</td>
                      <td className="p-4 text-right">${tour.pricing.infant.toLocaleString()}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Included / Excluded */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {tour.included && tour.included.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">What&apos;s Included</h2>
              <ul className="space-y-2">
                {tour.included.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 shrink-0">✓</span>
                    <span>{item.item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {tour.excluded && tour.excluded.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">What&apos;s Excluded</h2>
              <ul className="space-y-2">
                {tour.excluded.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-500 mt-1 shrink-0">✗</span>
                    <span>{item.item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Departure Dates */}
        {tour.departureDates && tour.departureDates.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Departure Dates</h2>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="p-4 text-left font-medium">Date</th>
                    <th className="p-4 text-right font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tour.departureDates.map((departure, index) => (
                    <tr key={index} className="border-b border-border last:border-b-0">
                      <td className="p-4">{formatDateTime(departure.date)}</td>
                      <td className="p-4 text-right">
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            departure.status === 'available'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : departure.status === 'limited'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}
                        >
                          {departure.status === 'soldOut' ? 'Sold Out' : departure.status?.charAt(0).toUpperCase() + (departure.status?.slice(1) || '')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Group Size */}
        {tour.groupSize && (tour.groupSize.min || tour.groupSize.max) && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Group Size</h2>
            <p className="text-muted-foreground">
              {tour.groupSize.min && tour.groupSize.max
                ? `${tour.groupSize.min} - ${tour.groupSize.max} people`
                : tour.groupSize.min
                  ? `Minimum ${tour.groupSize.min} people`
                  : `Maximum ${tour.groupSize.max} people`}
            </p>
          </section>
        )}

        {/* Pickup Locations */}
        {tour.pickupLocations && tour.pickupLocations.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Pickup Locations</h2>
            <div className="space-y-2">
              {tour.pickupLocations.map((pickup, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <span>{pickup.location}</span>
                  {pickup.time && <span className="text-sm text-muted-foreground">{pickup.time}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gallery */}
        {tour.gallery && tour.gallery.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {tour.gallery.map((item, index) => (
                <div key={index} className="aspect-[4/3] rounded-lg overflow-hidden">
                  {item.image && typeof item.image === 'object' && (
                    <Media
                      resource={item.image}
                      size="33vw"
                      imgClassName="object-cover w-full h-full"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {tour.faq && tour.faq.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {tour.faq.map((item, index) => (
                <details key={index} className="group rounded-lg border border-border">
                  <summary className="p-4 font-medium cursor-pointer list-none flex items-center justify-between">
                    {item.question}
                    <span className="group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-4 pb-4 text-muted-foreground">{item.answer}</div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related Tours */}
        {tour.relatedTours && tour.relatedTours.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Related Tours</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tour.relatedTours.map((relatedTour, index) => {
                if (typeof relatedTour !== 'object') return null
                return (
                  <TourCard key={index} doc={relatedTour} showCategories />
                )
              })}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const tour = await queryTourBySlug({ slug: decodedSlug })

  return generateMeta({ doc: tour })
}

const queryTourBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'tours',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
