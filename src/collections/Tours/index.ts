import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { revalidateTour, revalidateTourDelete } from './hooks/revalidateTour'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'

export const Tours: CollectionConfig<'tours'> = {
  slug: 'tours',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    tourCategories: true,
    featuredImage: true,
    price: true,
    duration: true,
    destination: true,
    difficulty: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'destination', 'price', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'tours',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'tours',
        req,
      }),
    useAsTitle: 'title',
    group: 'Tours',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'description',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                  ]
                },
              }),
            },
            {
              name: 'gallery',
              type: 'array',
              label: 'Gallery',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              name: 'highlights',
              type: 'array',
              label: 'Highlights',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'highlight',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'itinerary',
              type: 'array',
              label: 'Itinerary',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'day',
                  type: 'number',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'richText',
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => {
                      return [
                        ...rootFeatures,
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                      ]
                    },
                  }),
                },
                {
                  name: 'meals',
                  type: 'select',
                  hasMany: true,
                  options: [
                    { label: 'Breakfast', value: 'breakfast' },
                    { label: 'Lunch', value: 'lunch' },
                    { label: 'Dinner', value: 'dinner' },
                  ],
                },
                {
                  name: 'accommodation',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Details',
          fields: [
            {
              name: 'destination',
              type: 'text',
              required: true,
            },
            {
              name: 'duration',
              type: 'text',
              required: true,
              admin: {
                description: 'e.g. "5 Days / 4 Nights"',
              },
            },
            {
              name: 'difficulty',
              type: 'select',
              options: [
                { label: 'Easy', value: 'easy' },
                { label: 'Moderate', value: 'moderate' },
                { label: 'Challenging', value: 'challenging' },
                { label: 'Difficult', value: 'difficult' },
              ],
            },
            {
              name: 'groupSize',
              type: 'group',
              fields: [
                {
                  name: 'min',
                  type: 'number',
                },
                {
                  name: 'max',
                  type: 'number',
                },
              ],
            },
            {
              name: 'departureDates',
              type: 'array',
              label: 'Departure Dates',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'date',
                  type: 'date',
                  required: true,
                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                    },
                  },
                },
                {
                  name: 'status',
                  type: 'select',
                  defaultValue: 'available',
                  options: [
                    { label: 'Available', value: 'available' },
                    { label: 'Limited', value: 'limited' },
                    { label: 'Sold Out', value: 'soldOut' },
                  ],
                },
              ],
            },
            {
              name: 'pricing',
              type: 'group',
              fields: [
                {
                  name: 'adult',
                  type: 'number',
                  required: true,
                },
                {
                  name: 'child',
                  type: 'number',
                },
                {
                  name: 'infant',
                  type: 'number',
                },
              ],
            },
            {
              name: 'pickupLocations',
              type: 'array',
              label: 'Pickup Locations',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'location',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'time',
                  type: 'text',
                  admin: {
                    description: 'e.g. "6:00 AM"',
                  },
                },
              ],
            },
            {
              name: 'included',
              type: 'array',
              label: 'What\'s Included',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'item',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'excluded',
              type: 'array',
              label: 'What\'s Excluded',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'item',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'faq',
              type: 'array',
              label: 'FAQ',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'answer',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'price',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Display price (adult rate)',
      },
    },
    {
      name: 'tourCategories',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'tour-categories',
    },
    {
      name: 'relatedTours',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
      hasMany: true,
      relationTo: 'tours',
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateTour],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateTourDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
