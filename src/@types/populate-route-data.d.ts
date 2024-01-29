import { Address } from './adress'

export interface PopulateClientData {
    id: number
    name: string
    phone: string
    email: string
    address: Address
}

export interface PopulateRouteData {
    id: number
    title: string
    createdAt: string
    startingAddress: string
    link: string
    clients: PopulateClientData[]
}