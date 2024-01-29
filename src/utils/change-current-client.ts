import { Client } from '@/@types/client'
import { ClientResponseData } from '@/@types/client-response-data'
import { formatPhone } from './format-phone'
import { jwt } from './session'

export async function changeCurrentClient(url: string) {
  let orderClient: Client | undefined = undefined

  await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`
    }
  })
    .then(async (res) => {
      const response: ClientResponseData = await res.json()

      if (response.data) {
        orderClient = {
          id: response.data.id,
          name: response.data.attributes.name,
          email: response.data.attributes.email,
          phone: formatPhone(response.data.attributes.phone),
          city: response.data.attributes.address.city,
          state: response.data.attributes.address.state,
          cep: response.data.attributes.address.cep,
          street: response.data.attributes.address.street,
          number: response.data.attributes.address.number,
          neighborhood: response.data.attributes.address.neighborhood,
          complement: response.data.attributes.address.complement,
          latitude: response.data.attributes.address.latitude,
          longitude: response.data.attributes.address.longitude
        }

      }
        
      return response
    })

  return orderClient
}