import { ClientsResponseData } from './clients-response-data'

export interface RoutesResponseData {
  data: {
    id: number
    attributes: {
      title: string
      createdAt: string
      updatedAt: string
      clients: ClientsResponseData
      link?: string
    }
  }[]
}