import { type MouseEvent, useCallback, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { authenticationErrorCodeToError } from '~constants'

import { auth, db, logAnalytics } from '~firebase'

import createUser from '~utils/db/createUser'

import { Button } from '~components/ui/Button'
import { Input } from '~components/ui/Input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~components/ui/Form'
import Link from '~components/common/Link'
import Heading from '~components/common/Heading'
import Divider from '~components/common/Divider'
import GoogleButton from '~components/authentication/GoogleButton'

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'You must input an email' })
    .email('Please enter a valid email'),
  password: z
    .string()
    .min(8, { message: 'Your password must be at least 8 characters' })
    .max(100, { message: 'Your password must be at most 100 characters' }),
  passwordConfirmation: z
    .string()
    .min(8, { message: 'Your password must be at least 8 characters' })
    .max(100, { message: 'Your password must be at most 100 characters' }),
})
.refine(({ passwordConfirmation, password }) => passwordConfirmation === password, {
  message: 'Passwords must match',
  path: ['passwordConfirmation'],
})

function Page() {
  const [errorCode, setErrorCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const error = authenticationErrorCodeToError[errorCode as keyof typeof authenticationErrorCodeToError] ?? (errorCode ? authenticationErrorCodeToError.default : null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const handleSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    if (loading) return

    setLoading(true)

    const normalizedEmail = values.email.trim().toLowerCase()

    createUserWithEmailAndPassword(auth, normalizedEmail, values.password)
      .then(async userCredential => {
        const user = createUser({
          id: userCredential.user.uid,
          email: normalizedEmail,
          userId: userCredential.user.uid,
          signInProviders: ['password'],
        })

        logAnalytics('sign_up', {
          method: 'email',
        })

        await setDoc(doc(db, 'users', user.id), user)
      })
      .catch(error => {
        setLoading(false)
        setErrorCode(error.code)
      })
  }, [loading])

  const handleStopPropagation = useCallback((event: MouseEvent) => {
    event.stopPropagation()
  }, [])

  return (
    <>
      <Heading
        as="h2"
        className="text-center"
      >
        Sign up
      </Heading>
      <GoogleButton className="mt-8">
        Sign up with Google
      </GoogleButton>
      <Divider className="mt-4">
        or
      </Divider>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@company.com"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-sm">
            By continuing you accept the
            {' '}
            <Link
              className="link"
              to="/legal"
              onClick={handleStopPropagation}
            >
              Privacy Policy and Terms of Service
            </Link>
            .
          </div>
          <Button
            type="submit"
            loading={loading}
          >
            Sign up
          </Button>
        </form>
      </Form>
      {!!error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
      <div>
        <p className="mt-4 text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?
          {' '}
          <Link
            to="/authentication/login"
            className="link"
          >
            Log in
          </Link>
        </p>
      </div>
    </>
  )
}

export default Page
