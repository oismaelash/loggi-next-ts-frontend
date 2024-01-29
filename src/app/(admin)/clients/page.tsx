import ClientsProvider from '@/context/clients-context'
import { Metadata } from 'next'
import ClientsPageClient from './page-client'

export const metadata: Metadata = {
  title: 'Clients'
}

export default function ClientsPage() {
  return (
    <ClientsProvider>
      <ClientsPageClient />
    </ClientsProvider>
  )
}