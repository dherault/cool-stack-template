/* ---
  Database resources
--- */

export type DatabaseResource<T = unknown> = T & {
  id: string
  userId: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export type User = DatabaseResource<{
  name: string
  email: string
  imageUrl: string
  signupMessagesSent: boolean
  signInProviders: SignInProviderType[]
  isAdministrator: boolean
  hideAnimatedBackground: boolean
}>

export type Email = DatabaseResource<{
  to: string
  message: {
    subject: string
    text?: string
    html?: string
  }
}>

/* ---
  Helpers
--- */

export type SignInProviderType = 'password' | 'google.com'

export type XY = {
  x: number
  y: number
}
