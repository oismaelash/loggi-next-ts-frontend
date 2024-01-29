import * as z from 'zod'

export const routeSchema = z.object({
  title: z.string().min(1, {
    message: 'You need to enter a title for the new route'
  }),
  startingAddress: z.string().min(1, {
    message: 'You need to enter a title for the new route'
  }),
  clients: z.array(z.number(), {
    required_error: 'You need to enter at least 2 clients to create a route'
  })
})