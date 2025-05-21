import type { Access, AccessArgs, FieldAccess } from 'payload'

import type { User } from '@/payload-types'

export const isAdminOrSelf: Access<User> = ({ req: { user } }: AccessArgs<User>) => {
  // Need to be logged in
  if (user) {
    if (user?.roles?.includes('admin')) {
      return true
    }
    // If any other type of user, only provide access to themselves
    return {
      id: {
        equals: user.id,
      },
    }
  }

  // Reject evryone else
  return false
}

export const isAdminOrSelfFieldLevel: FieldAccess<{ id: string }, User> = ({
  id,
  req: { user },
}) => {
  // Return true or false based on if the user has an admin role
  if (user?.roles?.includes('admin')) {
    return true
  }
  if (user?.id === id) {
    return true
  }
  return false
}
