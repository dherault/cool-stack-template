import { User } from '~types'

type CreateUserArg = Omit<
  User,
  'name'
  | 'imageUrl'
  | 'signupMessagesSent'
  | 'isAdministrator'
  | 'hideAnimatedBackground'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
>

function createUser(user: CreateUserArg): User {
  const now = new Date().toISOString()

  return {
    ...user,
    name: '',
    imageUrl: '',
    signupMessagesSent: false,
    isAdministrator: false,
    hideAnimatedBackground: false,
    createdAt: now,
    updatedAt: now,
    deletedAt: '',
  }
}

export default createUser
