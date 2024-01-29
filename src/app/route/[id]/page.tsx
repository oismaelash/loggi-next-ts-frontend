import { Metadata } from 'next'
import RoutePageClient from './page-client'

export const metadata: Metadata = {
  title: 'Clients'
}

interface RoutePage {
  params: {
    id: string
  }
}

export default function RoutePage({ params }: RoutePage) { 
  return (
    <section className='w-full flex justify-center items-center'>
      <main className='flex flex-col justify-start w-full min-h-screen'>
        <RoutePageClient id={params.id} />
      </main>
    </section>
  )
}