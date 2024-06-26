import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
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
import Link from '~components/common/Link'
import Heading from '~components/common/Heading'

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'You must input an email' })
    .email('Please enter a valid email'),
})

function Page() {
  const [errorCode, setErrorCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const error = authenticationErrorCodeToError[errorCode as keyof typeof authenticationErrorCodeToError] ?? (errorCode ? authenticationErrorCodeToError.default : null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const handleSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    if (loading) return

    setErrorCode(null)
    setLoading(true)

    const normalizedEmail = values.email.trim().toLowerCase()

    sendPasswordResetEmail(auth, normalizedEmail)
      .then(() => {
        logAnalytics('password_reset')

        navigate('/authentication/login?password-reset=true')
      })
      .catch(error => {
        console.error('error while sendPasswordResetEmail', error)
        setLoading(false)
        setErrorCode(error.code)
      })
  }, [loading, navigate])

  return (
    <>
      <Heading
        as="h2"
        className="text-center"
      >
        Receive a password reset email
      </Heading>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-6 space-y-4"
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
          <Button
            type="submit"
            loading={loading}
          >
            Send
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
          Remembered your password?
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
