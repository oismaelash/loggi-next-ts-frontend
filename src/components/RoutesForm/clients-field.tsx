import { useEffect, useState } from 'react'

import { FormField, FormItem, FormMessage } from '@/components/ui/form'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'

import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

import { Client } from '@/@types/client'
import { Route } from '@/@types/route'
import { useClients } from '@/hooks/useClients'
import { useRoutes } from '@/hooks/useRoutes'
import { CheckIcon, XIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Loading } from '../Loading'
import { Button } from '../ui/button'

export function ClientsFieldForm() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [badges, setBadges] = useState<string[]>([])

  const { form, routes } = useRoutes()
  const { clients } = useClients()

  useEffect(() => {
    updateBadges()
  }, [])

  async function getCurrentRoute(): Promise<Route | undefined> {
    const routeId = form.getValues('id')
    const currentRoute = routes.filter((route) => {
      if (route.id === routeId) {
        return route
      }
    })

    if (!currentRoute) {
      toast.error('Route does not exist')
      return
    }
    return currentRoute[0]
  }

  async function updateBadges() {
    setIsLoading(true)
    const route = await getCurrentRoute()
    
    if (!route) {
      setIsLoading(false)
      return
    }

    const badges: string[] = []

    route.clients?.map((id) => {
      clients.filter((client) => {
        if (client.id === id) {
          badges.push(client.name) 
        }
      })
    })

    setBadges(() => [...badges])
    setIsLoading(false)
  }

  async function addClientInBadgeArray(client: Client) {
    if (!client.name || !client.id) return
    
    if (!badges.includes(client.name)) {
      setBadges((state) => [...state, client.name])
      form.setValue(`clients.${badges.length}`, client.id)
    } else {
      removeClientInBadgeArray(client.name)
    }
  }

  function removeClientInBadgeArray(clientName: string) {
    const index = badges.indexOf(clientName)
    if (index !== -1) {
      setBadges((state) => {
        const newState = [...state]
        newState.splice(index, 1)
        return newState
      })
    }

    form.unregister(`clients.${index}`)
    const newArray = form.getValues('clients')?.filter((client) => client !== undefined)
    form.setValue('clients', newArray)
  }

  return (
    <FormField
      control={form.control}
      name="clients"
      render={() => (
        <>
          {isLoading
            ? (<div className='pb-4'><Loading /></div>)
            : (<>
              <FormItem className="flex flex-col py-4">
                <Command>
                  <CommandInput
                    list='categories-list'
                    placeholder="Search clients by name"
                    className="h-9"
                    onClick={() => {
                      setIsOpen(true)
                    }}
                  />

                  {isOpen && (
                    <>
                      <CommandList className='absolute w-80 border border-foreground/10 shadow-md bg-white -mt-52'>
                        <CommandEmpty>No clients found.</CommandEmpty>
                        <CommandGroup className='p-4'>
                          <div className='flex items-center justify-between pb-2'>
                            <p className='font-medium text-sm'>
                          List of clients registered
                            </p>
                            <Button
                              size={'icon'}
                              variant={'ghost'}
                              className='text-xl text-destructive'
                              type='button'
                              onClick={() => setIsOpen(false)}
                            >
                              <XIcon size={16} />
                            </Button>
                          </div>
                          <ScrollArea className="h-32">
                            {clients.map((client) => (
                              <CommandItem
                                className='flex w-full justify-between gap-2 cursor-pointer'
                                key={client.id}
                                value={client.name}
                                onSelect={() => {
                                  addClientInBadgeArray(client)
                                }}
                              >
                                {client.name}
                                {badges.includes(client.name) && (
                                  <CheckIcon className="h-4 w-4 text-secondary" />
                                )}
                              </CommandItem>
                            ))}
                          </ScrollArea>
                        </CommandGroup>
                      </CommandList>
                    </>
                  )}
                </Command>
                <FormMessage />
              </FormItem>
              <div className='grid grid-cols-2 gap-2 pb-4'>
                {(badges.map((item, index) => (
                  <Badge key={index} className='text-sm font-semibold whitespace-nowrap gap-2 justify-between items-center'>
                    {item}
                    <button
                      type='button'
                      onClick={() => {
                        removeClientInBadgeArray(item)
                      }}
                    >
                      <XIcon size={16} />
                    </button>
                  </Badge>
                )))}
              </div>
            
            </>)}
        </>
      )} />
  )
}