import { Route } from '@/@types/route'
import { toast } from 'sonner'
import { jwt } from './session'

export async function editRoute(data: Route, url: string) {
  const body = {
    data: { 
      title: data.title,
      startingAddress: data.startingAddress,
      clients: data.clients
    }
  }

  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify(body)
  })
    .then(async (res) => {
      const response = await res.json()
      toast.success('Success', {
        description: 'Route successfully edited'
      })

      setTimeout(() => {
        if (window) window.location.reload()
      }, 1000)
      
      return response
    })
    .catch((error) => {
      console.error(error)
      toast.error('Error', {
        description: 'Route not edited'
      })

      setTimeout(() => {
        if (window) window.location.reload()
      }, 1000)
    })
}