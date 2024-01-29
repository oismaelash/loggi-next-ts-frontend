'use client'

import { ReactNode, useLayoutEffect } from 'react'

import '@/app/globals.css'
import { cn } from '@/utils/ui'
import { Inter } from 'next/font/google'

import AsideBar from '@/components/AsideBar'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { sessionStatus } from '@/utils/session'
import { redirect } from 'next/navigation'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: ReactNode }) {
  
  useLayoutEffect(() => {
    const session = sessionStatus

    if (!session) {
      redirect('/')
    }
  }, [])
  
  return (
    <html lang="en">
      <body className={cn('bg-zinc-50 text-zinc-700', inter.className)}>
        <Toaster richColors position='top-right' />
        <div>
          <Header />
          <div className='flex'>
            <AsideBar />
            <div className='w-full'>
              <main className='flex flex-col w-full min-h-[calc(100vh-40px)] justify-start items-start'>
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
