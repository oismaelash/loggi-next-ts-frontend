import { Route } from '@/@types/route'
import { RoutesResponseData } from '@/@types/routes-response-data'


export function orderRouteData(response: RoutesResponseData): Route[] {
  const listRoutesWithAttributes = response.data.filter((route) => {
    return route.attributes
  })

  const orderClients = listRoutesWithAttributes.map((route) => {
    return {
      id: route.id,
      title: route.attributes.title,
      createdAt: route.attributes.createdAt,
      clients: route.attributes.clients.data.map((client) => client.id),
      link: route.attributes.link ? route.attributes.link : undefined
    } as Route
  })
          
  return orderClients
}