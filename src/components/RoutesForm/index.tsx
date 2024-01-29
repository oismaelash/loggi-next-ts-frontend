'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { Route } from '@/@types/route'
import { useRoutes } from '@/hooks/useRoutes'
import { cn } from '@/utils/ui'
import { ReactNode } from 'react'
import { Input } from '../ui/input'
import { ClientsFieldForm } from './clients-field'

interface DialogFormProps {
  requestFunction: (data: Route) => void
  children: ReactNode
}

export function DialogForm({ children, requestFunction }: DialogFormProps) {
  const { form } = useRoutes()
  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(requestFunction)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className={cn('w-full')}>
              <FormLabel className='capitalize'>
                Title
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Add a title to the route'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='startingAddress'
          render={({ field }) => (
            <FormItem className={cn('w-full')}>
              <FormLabel className='capitalize'>
                Starting Address
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Enter the starting address of the route'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ClientsFieldForm />
        {children}
      </form>
    </Form>
  )
}