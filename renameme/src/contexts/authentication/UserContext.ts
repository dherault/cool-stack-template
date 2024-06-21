import { createContext } from 'react'
import type { User as Viewer } from 'firebase/auth'

import type { User } from '~types'

type UserContext = {
  loadingAuthentication: boolean
  viewer: Viewer | null
  user: User | null
  updateUser: (user: Partial<User>) => Promise<void>
  signIn: (viewer: Viewer, user: User) => Promise<void>
  signOut: () => Promise<void>
}

export default createContext<UserContext>({
  loadingAuthentication: true,
  viewer: null,
  user: null,
  signIn: Promise.resolve,
  signOut: Promise.resolve,
  updateUser: Promise.resolve,
})
