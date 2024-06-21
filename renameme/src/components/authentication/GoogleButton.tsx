import { type ButtonHTMLAttributes, useCallback, useState } from 'react'
import { signInWithPopup } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import _ from 'clsx'

import type { User } from '~types'

import { auth, db, googleProvider, logAnalytics } from '~firebase'

import useUser from '~hooks/user/useUser'

import createUser from '~utils/db/createUser'

import { Button } from '~components/ui/Button'
import Spinner from '~components/common/Spinner'

function GoogleButton({ children, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { signIn } = useUser()

  const [loading, setLoading] = useState(false)

  const handleClick = useCallback(() => {
    setLoading(true)

    signInWithPopup(auth, googleProvider)
      .then(async result => {
        const { user } = result

        if (!user) {
          setLoading(false)

          return
        }

        const docRef = doc(db, 'users', user.uid)

        const fetchResult = await getDoc(docRef)

        if (fetchResult.exists()) {
          logAnalytics('login', {
            method: 'Google',
          })

          const fetchedUser = fetchResult.data() as User
          const updatedUser: Partial<User> = {
            name: user.displayName ?? fetchedUser.name ?? '',
            email: user.email ?? fetchedUser.email ?? '',
            updatedAt: new Date().toISOString(),
            signInProviders: fetchedUser.signInProviders.includes('google.com')
              ? fetchedUser.signInProviders
              : [...fetchedUser.signInProviders, 'google.com'],
          }

          await updateDoc(docRef, updatedUser)
          await signIn(user, { ...fetchedUser, ...updatedUser })
        }
        else {
          logAnalytics('sign_up', {
            method: 'Google',
          })

          const createdUser = createUser({
            id: user.uid,
            email: user.email ?? '',
            userId: user.uid,
            signInProviders: ['google.com'],
          })

          createdUser.name = user.displayName ?? ''
          createdUser.imageUrl = user.photoURL ?? ''

          await setDoc(docRef, createdUser)
          await signIn(user, createdUser)
        }
      })
      .catch(error => {
        console.error(error.code)

        setLoading(false)
      })
  }, [signIn])

  return (
    <Button
      {...props}
      onClick={handleClick}
      className={_('w-full bg-white hover:bg-gray-100 text-gray-900 border elevation-1', className)}
    >
      {loading && (
        <Spinner className="w-6 h-6" />
      )}
      {!loading && (
        <img
          src="/images/google-logo.png"
          alt="google"
          className="w-6 h-6"
        />
      )}
      <div className="ml-3">
        {children}
      </div>
    </Button>
  )
}

export default GoogleButton
