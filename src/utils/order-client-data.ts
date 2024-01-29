import { Client } from '@/@types/client'
import { ClientsResponseData } from '@/@types/clients-response-data'
import { formatPhone } from './format-phone'

export function orderClientData(response: ClientsResponseData): Client[] {
  const listClientsWithAddress = response.data.filter((client) => {
    return client.attributes.address
  })

  const orderClients = listClientsWithAddress.map((client) => {
    return {
      id: client.id,
      name: client.attributes.name,
      email: client.attributes.email,
      phone: formatPhone(client.attributes.phone),
      city: client.attributes.address.city,
      state: client.attributes.address.state,
      cep: client.attributes.address.cep,
      street: client.attributes.address.street,
      number: client.attributes.address.number,
      neighborhood: client.attributes.address.neighborhood,
      complement: client.attributes.address.complement,
      latitude: client.attributes.address.latitude,
      longitude: client.attributes.address.longitude
    } as Client    
  })
          
  return orderClients
}