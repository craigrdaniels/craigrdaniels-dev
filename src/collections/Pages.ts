import type { CollectionConfig } from 'payload'

import { isAdmin } from '@/access/isAdmin'
import { isPublished } from '@/access/isPublished'
import { slugField } from '@/fields/slug'

import { Content } from '@/blocks/Content/config'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: isAdmin,
    read: isPublished,
    update: isAdmin,
    delete: isAdmin,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    useAsTitle: 'title',
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
          fields: [
            /* hero */
          ],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [Content],
              required: true,
            },
          ],
          label: 'Content',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  versions: {
    drafts: true,
  },
}
