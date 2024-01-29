import { Address } from './adress'

export interface ClientResponseData {
  data: {
    id: number
    attributes: {
      name: string
      phone: string
      email: string
      address: Address
    }
  }
}
