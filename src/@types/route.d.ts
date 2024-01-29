export type Route = {
  id: number | undefined,
  title: string
  startingAddress: string
  link?: string
  clients: Array<number> | undefined
  createdAt: string
}