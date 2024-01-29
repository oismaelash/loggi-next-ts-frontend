import { Address } from './adress'
export interface ClientsResponseData {
    data: {
      id: number
      attributes: {
          name: string
          phone: string
          email: string
          createdAt: string
          updatedAt: string
          address: Address
      }
    }[]
}
