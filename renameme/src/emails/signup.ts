import { doc, setDoc } from 'firebase/firestore'
import { nanoid } from 'nanoid'

import type { Email, User } from '~types'

import { db } from '~firebase'

async function sendSignupEmail(user: User) {
  if (!user.email) {
    console.error('No user email: cannot send signup email')

    return null
  }

  console.log('Sending signup email')

  const now = new Date().toISOString()
  const email: Email = {
    id: nanoid(),
    to: user.email,
    message: {
      subject: 'Welcome to Rename me!',
      text: `Hi!

Welcome to Rename me! We're excited to have you on board.

Best,

David from Rename me`,
    },
    userId: user.id,
    createdAt: now,
    updatedAt: now,
    deletedAt: '',
  }

  await setDoc(doc(db, 'emails', email.id), email)
}

export default sendSignupEmail
