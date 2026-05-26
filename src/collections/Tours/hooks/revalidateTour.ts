import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Tour } from '../../../payload-types'

export const revalidateTour: CollectionAfterChangeHook<Tour> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/tours/${doc.slug}`

      payload.logger.info(`Revalidating tour at path: ${path}`)

      revalidatePath(path)
      revalidateTag('tours-sitemap', 'max')
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/tours/${previousDoc.slug}`

      payload.logger.info(`Revalidating old tour at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('tours-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateTourDelete: CollectionAfterDeleteHook<Tour> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/tours/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('tours-sitemap', 'max')
  }

  return doc
}
