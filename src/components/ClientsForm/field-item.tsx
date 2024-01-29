import { FormFieldNames } from '@/@types/form-field-names'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useClients } from '@/hooks/useClients'
import { cn } from '@/utils/ui'
import { HTMLInputTypeAttribute } from 'react'
import { ClassNameValue } from 'tailwind-merge'

interface FieldItemProps {
  name: FormFieldNames
  type: HTMLInputTypeAttribute
  placeholder: string
  className?: ClassNameValue
}

export function FieldItem({ name, type, placeholder, className }: FieldItemProps) {
  const { form } = useClients()
  
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full', className)}>
          <FormLabel className='capitalize'>{name}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}