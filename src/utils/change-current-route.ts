import { Route } from '@/@types/route'
import { RouteResponseData } from '@/@types/route-response-data'
import { jwt } from './session'

export async function changeCurrentRoute(url: string) {
  let orderRoute: Route | undefined = undefined

  await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`
    }
  })
    .then(async (res) => {
      const response: RouteResponseData = await res.json()

      if (response.data) {
        orderRoute = {
          id: response.data.id,
          title: response.data.attributes.title,
          clients: response.data.attributes.clients.data.map((client) => {
            return client.id
          }),
          createdAt: response.data.attributes.createdAt,
          startingAddress: response.data.attributes.startingAddress
        }
      }
        
      return response
    })
  
  return orderRoute
}