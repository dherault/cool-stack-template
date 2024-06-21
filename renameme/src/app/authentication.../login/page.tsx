import { useCallback, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { authenticationErrorCodeToError } from '~constants'

import { auth, logAnalytics } from '~firebase'

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
import Heading from '~components/common/Heading'
import Link from '~components/common/Link'
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
    },
  })

  const handleSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    if (loading) return

    setErrorCode(null)
    setLoading(true)

    const normalizedEmail = values.email.trim().toLowerCase()

    signInWithEmailAndPassword(auth, normalizedEmail, values.password)
      .then(() => {
        logAnalytics('login', {
          method: 'email',
        })
      })
      .catch(error => {
        setLoading(false)
        setErrorCode(error.code)
      })
  }, [loading])

  return (
    <>
      <Heading
        as="h2"
        className="text-center"
      >
        Log in
      </Heading>
      <GoogleButton className="mt-8">
        Log in with Google
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
                <FormLabel>Email</FormLabel>
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            loading={loading}
          >
            Log in
          </Button>
        </form>
      </Form>
      {!!error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
      <div className="mt-4 space-y-2">
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Forgot your password?
          {' '}
          <Link
            to="/authentication/password-reset"
            className="link"
          >
            Reset it
          </Link>
        </p>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don't have an account yet?
          {' '}
          <Link
            to="/authentication/signup"
            className="link"
          >
            Sign up
          </Link>
        </p>
      </div>
    </>
  )
}

export default Page
