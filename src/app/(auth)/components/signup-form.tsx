'use client'

import { HTMLAttributes } from 'react'
import { cn } from '@/utils/ui'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useRouter } from 'next/navigation'

const signUpSchema = z.object({
  username: z.string({
    invalid_type_error: 'Your password must contain at least 8 characters.',
    required_error: 'You must fill in this field.',
  }).min(6).max(30),
  email: z.string({
    required_error:
          'You must fill in your email address to complete registration.',
  }).email({
    message: 'Please provide a valid email address.',
  }),
  password: z.string({
    invalid_type_error: 'Your password must contain at least 8 characters.',
    required_error: 'You must fill in this field.',
  }).min(8),
  confirmPassword: z.string({
    required_error: 'You must fill in this field.'
  }),
}).refine(
  (values) => {
    return values.password === values.confirmPassword
  },
  {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }
)

type FormValues = z.infer<typeof signUpSchema>;

interface SignupFormProps extends HTMLAttributes<HTMLDivElement> {}

export function SignupForm({ className, ...props }: SignupFormProps) {
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
  })

  const isLoading = form.formState.isSubmitting

  async function handleLogin(data: FormValues) {   
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`
    
    const body = {
      username: data.username,
      email: data.email,
      password: data.password,
      confirmed: true,
      role: 1
    }

    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(
        async (res) => {
          const response = await res.json()

          if (response.jwt) {
            toast.success('Success', {
              description: 'Registration successfully complete!',
            })
            localStorage.setItem(process.env.NEXT_PUBLIC_JWT_NAME, response.jwt)
            router.push('/routes')
          }
          
          if (response.error.message === 'Email already taken') {
            toast.error('E-mail already exists.')
          } else if (response.error.message === 'This attribute must be unique') {
            toast.error('Username already registered.')
          } else if (response.error) {
            toast.error ('Error: An error occurred while registering, please try again.')
          }
        })
      .catch((err) => {
        console.error(err)
        throw new Error(err)
      })
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className="flex flex-col space-y-2 text-center pt-3">
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
        <p className="text-sm text-muted-foreground">
          Register with your email and password
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              {/* USERNAME FIELD */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full pb-4">
                    <FormLabel htmlFor="username">Name</FormLabel>
                    <div className="relative w-full">
                      <FormControl className="w-full">
                        <Input
                          id="username"
                          type="text"
                          autoCapitalize="none"
                          autoCorrect="off"
                          placeholder="Choose a username"
                          className="w-full text-zinc-700"
                          disabled={isLoading}
                          defaultValue={field.value}
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* EMAIL ADDRESS FIELD */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full pb-4">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <div className="relative w-full">
                      <FormControl className="w-full">
                        <Input
                          id="email"
                          type="email"
                          autoCapitalize="none"
                          autoCorrect="off"
                          placeholder="name@example.com"
                          className="w-full text-zinc-700"
                          disabled={isLoading}
                          defaultValue={field.value}
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PASSWORD FIELD */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full pb-4">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <div className="relative w-full">
                      <FormControl className="w-full">
                        <Input
                          id="password"
                          type="password"
                          autoCapitalize="none"
                          autoCorrect="off"
                          placeholder="must be at least 6 characters long"
                          className="w-full text-zinc-700"
                          disabled={isLoading}
                          defaultValue={field.value}
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CONFIRM PASSWORD FIELD */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="w-full pb-4">
                    <FormLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FormLabel>
                    <div className="relative w-full">
                      <FormControl className="w-full">
                        <Input
                          id="confirmPassword"
                          type="password"
                          autoCapitalize="none"
                          autoCorrect="off"
                          placeholder="enter the same password again"
                          className="w-full text-zinc-700"
                          disabled={isLoading}
                          defaultValue={field.value}
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <div className="w-4 h-4 rounded-full border-2 border-x-white animate-spin mr-2" />
              )}
              Sign Up
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
