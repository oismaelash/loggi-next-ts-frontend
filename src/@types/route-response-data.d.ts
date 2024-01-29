import { ClientsResponseData } from './clients-response-data'

export interface RouteResponseData {
  data: {
    id: number
    attributes: {
      title: string
      createdAt: string
      updatedAt: string
      startingAddress: string
      clients: ClientsResponseData
    }
  }
}