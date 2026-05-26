import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const TourCategoriesShowcase: Block = {
  slug: 'tourCategoriesShowcase',
  interfaceName: 'TourCategoriesShowcaseBlock',
  fields: [
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
    {
      name: 'categories',
      type: 'relationship',
      hasMany: true,
      relationTo: 'tour-categories',
      label: 'Categories to Show',
    },
  ],
  labels: {
    plural: 'Tour Categories Showcases',
    singular: 'Tour Categories Showcase',
  },
}
