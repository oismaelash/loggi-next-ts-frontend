'use client'

import { PopulateClientData, PopulateRouteData } from '@/@types/populate-route-data'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/utils/format-date'
import { jwt } from '@/utils/session'
import { ArrowUpRightIcon } from 'lucide-react'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PopulateRouteTable } from './components/table'

export default function RoutePageClient({ id }: { id: string }) {
  const [routeData, setRouteData] = useState<PopulateRouteData>()
  const [clientsData, setClientsData] = useState<PopulateClientData[]>([])

  const router = useRouter()

  useEffect(() => {
    getRouteData()
  }, [])

  async function getRouteData() {
    if (!id) {
      redirect('/routes')
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/routeById/${id}`
    
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        }
      })
      
      const response: PopulateRouteData = await res.json()

      if (response) {
        setRouteData(response)
        console.log(response)
        setClientsData(response.clients)
      } 

      return res
    } catch (error) {
      console.error(error)
      router.push('/routes')
    }
  }

  if (!routeData) return

  return (
    <>
      <header className='flex justify-center items-center w-full h-40 bg-primary'>
        <div className='flex justify-between items-center w-full max-w-5xl px-8'>
          <div>
            <h1 className='text-primary-foreground font-semibold text-3xl pb-2'>
              #{id}{' - '}{routeData.title}
            </h1>
            <span className='text-primary-foreground font-medium capitalize'>
              {formatDate(routeData.createdAt)}
            </span>
            <div>
              <p className='text-primary-foreground font-medium capitalize'>
                {routeData.startingAddress}
              </p>
            </div>
          </div>
          <Link href={routeData?.link || ''} target='_blank'>
            <Button variant={'outline'}>
              Open to Google Maps
              <ArrowUpRightIcon size={20} />
            </Button>
          </Link>
        </div>
      </header>

      <div className='flex justify-center items-center w-full px-8'>
        {clientsData && <PopulateRouteTable data={clientsData} />}
      </div>
    </>
  )
}