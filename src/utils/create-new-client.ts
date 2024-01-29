import { Client } from '@/@types/client'
import { toast } from 'sonner'
import { jwt } from './session'

export async function createNewClient(data: Client) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/clients`

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
          description: 'Clients successfully registered.',
        })
      }

      if (response.error) {
        toast.error('Erro', {
          description: 'Clients not registered, please try again',
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