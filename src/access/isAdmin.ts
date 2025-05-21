import type { Access, AccessArgs, FieldAccess } from 'payload'

import type { User } from '@/payload-types'

export const isAdmin: Access<User> = ({ req: { user } }: AccessArgs<User>): boolean =>
  user && user.roles.some((role) => role === 'admin') ? true : false

export const isAdminField: FieldAccess = ({ req: { user } }): boolean =>
  user && user.roles.some((role) => role === 'admin') ? true : false
