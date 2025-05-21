import type { CollectionConfig } from 'payload'

import { isAdminField } from '@/access/isAdmin'
import { isAdminOrSelfFieldLevel } from '@/access/isAdminOrSelf'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      access: {
        create: isAdminField,
        read: isAdminOrSelfFieldLevel,
        update: isAdminField,
      },
      name: 'roles',
      defaultValue: ['user'],
      options: ['admin', 'user'],
      hasMany: true,
      required: true,
      type: 'select',
    },
  ],
}
