'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { CepData } from '@/@types/cep-data'
import { Client } from '@/@types/client'
import { useClients } from '@/hooks/useClients'
import { formatPhone } from '@/utils/format-phone'
import { jwt } from '@/utils/session'
import { ChangeEvent, ReactNode, useState } from 'react'
import { Input } from '../ui/input'
import { FieldItem } from './field-item'

interface DialogFormProps {
  requestFunction: (data: Client) => void
  children: ReactNode
}

export function DialogForm({ children, requestFunction }: DialogFormProps) {
  const [phone, setPhone] = useState<string>('')
  const [cep, setCep] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const { form } = useClients()

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.target.value.replace(/\D/g, '')

    if (input.length <= 11) {
      const formatted = formatPhone(event.target.value.replace(/\D/g, ''))
      setPhone((state) => state !== formatted ? formatted : state)
      form.setValue('phone', formatted.replace(/[()\s-]/g, ''))
    }
  }

  async function handleCepChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.target.value.replace(/\D/g, '')
    const formattedCep = input.replace(/(\d{5})(\d{1,3})/, '$1-$2')

    if (formattedCep.length === 9) {
      await getAddressData(formattedCep)
    }
    
    if (formattedCep.length <= 9) {
      setCep(formattedCep)
      form.setValue('cep', formattedCep)
    }
  }

  async function getAddressData(cep: string) {
    setIsLoading(true)
    const url = `https://viacep.com.br/ws/${cep}/json/`
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        }
      })
      const response: CepData = await res.json()
      setFormFields(response)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  function setFormFields(data: CepData) {
    form.setValue('street', data.logradouro)
    form.setValue('neighborhood', data.bairro)
    form.setValue('city', data.localidade)
    form.setValue('state', data.uf)
  }
  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(requestFunction)}
        className="space-y-4"
      >
        <div className='flex gap-6'>
          <FieldItem name='name' type='text' placeholder='John Doe' />
          <FieldItem name='email' type='email' placeholder='john.doe@email.com' />
        </div>
        <div className='flex w-full gap-6'>
          <FormField
            control={form.control}
            name='phone'
            render={() => (
              <FormItem className='w-full'>
                <FormLabel className='capitalize'>Phone</FormLabel>
                <FormControl>
                  <Input
                    id="phone"
                    type="tel"
                    max={15}
                    autoCapitalize="none"
                    autoCorrect="off"
                    placeholder="(99) 99999-9999"
                    value={phone || form.getValues('phone')}
                    onChange={handlePhoneChange}
                    className='w-full text-zinc-700 my-2'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='cep'
            render={() => (
              <FormItem className='w-full'>
                <FormLabel className='capitalize'>CEP</FormLabel>
                <FormControl>
                  <Input
                    id="cep"
                    type="string"
                    max={9}
                    autoCapitalize="none"
                    autoCorrect="off"
                    placeholder="00000-000"
                    value={cep || form.getValues('cep')}
                    onChange={handleCepChange}
                    className='w-full text-zinc-700 my-2'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='relative flex flex-col gap-6'>
          {isLoading && (
            <div className='absolute flex justify-center items-center w-full h-full backdrop-blur-[1.5px]'>
              <div className='border-2 border-r-0 shadow-none border-primary rounded-full w-10 h-10 animate-spin' />
            </div>
          )}
          <div className='flex w-full gap-6'>
            <FieldItem className='w-full' name='street' type='text' placeholder='Main Street' />
            <FieldItem className='w-32' name='number' type='text' placeholder='123-A' />
          </div>
          <FieldItem name='neighborhood' type='' placeholder='' />
          <div className='flex gap-6'>
            <FieldItem name='city' type='' placeholder='' />
            <FieldItem name='state' type='' placeholder='' />
          </div>
        </div>
        <FieldItem name='complement' type='text' placeholder='Apt 101, Bldg B' />
        {children}
      </form>
    </Form>
  )
}