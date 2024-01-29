import { Route } from '@/@types/route'
import { toast } from 'sonner'
import { jwt } from './session'

export async function createNewRoute(data: Route) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/routes`

  const body = {
    data: { 
      title: data.title,
      clients: data.clients,
      startingAddress: data.startingAddress
    }
  }

  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    }
  })
    .then(async (res) => {
      const response = await res.json()

      if (response.data) {
        toast.success('Success', {
          description: 'Route successfully registered.',
        })
      }

      if (response.error) {
        toast.error('Erro', {
          description: 'Route not registered, please try again',
        })
      }

      setTimeout(() => {
        if (window) window.location.reload()
      }, 1000)

      return response
    })
    .catch((err) => {
      console.error(err)

      setTimeout(() => {
        if (window) window.location.reload()
      }, 1000)
    })
}