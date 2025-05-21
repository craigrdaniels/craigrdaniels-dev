import type { CollectionConfig } from 'payload'

import { isAdmin } from '@/access/isAdmin'
import { isPublished } from '@/access/isPublished'

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
      name: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'Banner Image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
  versions: {
    drafts: true,
  },
}
