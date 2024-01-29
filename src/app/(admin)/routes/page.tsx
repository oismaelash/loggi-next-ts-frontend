import ClientsProvider from '@/context/clients-context'
import RoutesProvider from '@/context/routes-context'
import { Metadata } from 'next'
import RoutesPageClient from './page-client'

export const metadata: Metadata = {
  title: 'Routes'
}

export default function RoutesPage() {
  return (
    <ClientsProvider>
      <RoutesProvider>
        <RoutesPageClient />
      </RoutesProvider>
    </ClientsProvider>
  )
}