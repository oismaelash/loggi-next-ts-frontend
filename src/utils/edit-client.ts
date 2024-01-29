import { Client } from '@/@types/client'
import { toast } from 'sonner'
import { jwt } from './session'

export async function editClient(data: Client, url: string) {
  const body = {
    data: { 
      email: data.email,
      name: data.name,
      phone: data.phone,
      address: {
        cep: data.cep,
        city: data.city,
        complement: data.complement,
        number: data.number,
        neighborhood: data.neighborhood,
        state: data.state,
        street: data.street,
        latitude: data.latitude,
        longitude: data.longitude
      }
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
        description: 'Client successfully edited'
      })

      setTimeout(() => {
        if (window) window.location.reload()
      }, 1000)

      return response
    })
    .catch((error) => {
      console.error(error)
      toast.error('Error', {
        description: 'Client not edited'
      })

      setTimeout(() => {
        if (window) window.location.reload()
      }, 1000)
    })
}