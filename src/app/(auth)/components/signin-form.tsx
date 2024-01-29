'use client'

import { cn } from '@/utils/ui'
import { HTMLAttributes } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const signInSchema = z.object({
  email: z.string({
    required_error: 'You must fill in your email address to complete registration.',
  }).email({
    message: 'Please provide a valid email address.'
  }),
  password: z.string({
    invalid_type_error: 'Your password must contain at least 8 characters.',
    required_error: 'You must fill in this field.',
  }).min(8),
})

type FormValues = z.infer<typeof signInSchema>

interface SigninFormProps extends HTMLAttributes<HTMLDivElement> {}

export function SigninForm({ className, ...props }: SigninFormProps) {
  const router = useRouter()
  
  const form = useForm<FormValues>({
    resolver: zodResolver(signInSchema)
  })

  const isLoading = form.formState.isSubmitting

  async function handleLogin(data: FormValues) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/local`
    
    const body = {
      identifier: data.email,
      password: data.password,
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
            localStorage.setItem(process.env.NEXT_PUBLIC_JWT_NAME, response.jwt)
            router.push('/routes')
          }

          if (response.error) {
            toast.error('Error', {
              description: response.error.message,
            })
          }

          return response
        })
      .catch((err) => {
        console.error('Unable to log in: ', err)
        toast.error('Unable to log in, please try again!')
      })
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className="flex flex-col space-y-2 text-center pt-3">
        <h1 className="text-2xl font-semibold tracking-tight">
          Sign In
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password to access your account
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              {/* EMAIL ADDRESS FIELD */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className='w-full pb-4'>
                    <FormLabel htmlFor='email'>
                        Email
                    </FormLabel>
                    <div className="relative w-full">
                      <FormControl className='w-full'>
                        <Input
                          id="email"
                          type="email"
                          autoCapitalize="none"
                          autoCorrect="off"
                          placeholder="name@example.com"
                          className='w-full text-zinc-700'
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
                  <FormItem className='w-full pb-4'>
                    <FormLabel htmlFor='email'>
                      Password
                    </FormLabel>
                    <div className="relative w-full">
                      <FormControl className='w-full'>
                        <Input
                          id="password"
                          type="password"
                          autoCapitalize="none"
                          autoCorrect="off"
                          placeholder="enter your registered password"
                          className='w-full text-zinc-700'
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
                <div className='w-4 h-4 rounded-full border-2 border-x-white animate-spin mr-2' />
              )}
              Sign In
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}