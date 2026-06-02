import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['author', 'rating', 'status', 'updatedAt'],
    useAsTitle: 'author',
    group: 'Content',
  },
  fields: [
    {
      name: 'author',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'role',
      type: 'text',
      localized: true,
      admin: {
        description: 'e.g. "Traveler from Kuala Lumpur"',
      },
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Author photo / avatar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      required: true,
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData.status === 'approved' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
  ],
}
