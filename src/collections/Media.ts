import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical' 

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated' 

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      // required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    disableLocalStorage: true, 
    adminThumbnail: 'thumbnail',
    focalPoint: true, 
    imageSizes: [
      {
        name: 'thumbnail',
        width: 200,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 75,
            effort: 4,
          },
        },
      },
      {
        name: 'small',
        width: 600,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80,
            effort: 4,
          },
        },
      },
      {
        name: 'medium',
        width: 900,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80,
            effort: 4,
          },
        },
      },
      {
        name: 'large',
        width: 1400,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 82,
            effort: 5,
          },
        },
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
            effort: 5,
          },
        },
      },
    ],
  },
}
