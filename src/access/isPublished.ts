import type { Access, AccessArgs } from 'payload'

import type { User } from '@/payload-types'

export const isPublished: Access<User> = ({ req: { user } }: AccessArgs<User>) => {
  if (user && user.roles.some((role) => role === 'admin')) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
