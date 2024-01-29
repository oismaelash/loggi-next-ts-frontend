import * as z from 'zod'

export const clientSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required'
  }),
  phone: z.string().
    refine(phone => {
      const rawPhone = phone.replace(/\D/g, '')
      return rawPhone.length === 10 || rawPhone.length === 11
    }, {
      message: 'Invalid phone number'
    }),
  email: z.string().email({
    message: 'Invalid email address'
  }),
  cep: z.string().min(1, {
    message: 'CEP is required'
  }),
  street: z.string().min(1, {
    message: 'Street is required'
  }),
  city: z.string().min(1, {
    message: 'City is required'
  }),
  state: z.string().min(1, {
    message: 'State is required'
  }),
  number: z.string().min(1, {
    message: 'Number is required'
  }),
  neighborhood: z.string().optional(),
  complement: z.string().optional(),
  latitude: z.number().default(0),
  longitude: z.number().default(0)
})