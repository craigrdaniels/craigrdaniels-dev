import type { CollectionConfig } from 'payload'

import { isAdmin } from '@/access/isAdmin'
import { isPublished } from '@/access/isPublished'

import {
  HeadingFeature,
  FixedToolbarFeature,
  BlocksFeature,
  HorizontalRuleFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    create: isAdmin,
    read: isPublished,
    update: isAdmin,
    delete: isAdmin,
    readVersions: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'featureImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Feature Image',
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features({ rootFeatures }) {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            BlocksFeature({}),
            HorizontalRuleFeature(),
            InlineToolbarFeature(),
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            InlineCodeFeature(),
          ]
        },
      }),
      label: false,
      required: true,
    },
  ],
  versions: {
    drafts: true,
  },
}
