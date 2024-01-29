'use client'

import { ReactNode, useLayoutEffect } from 'react'

import '@/app/globals.css'
import { Toaster } from '@/components/ui/sonner'
import { sessionStatus } from '@/utils/session'
import { cn } from '@/utils/ui'
import { Inter } from 'next/font/google'
import { redirect } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })
export default function RootLayout({ children }: { children: ReactNode }) {
  
  useLayoutEffect(() => {
    const session = sessionStatus
    if (session) {
      redirect('/routes')
    }
  }, [])
  
  return (
    <html lang="en">
      <body className={cn('bg-zinc-50 text-zinc-700', inter.className)}>
        <Toaster richColors position='top-right' />
        <div className='flex w-full'>
          <main className='flex flex-col w-full min-h-[calc(100vh-40px)] justify-start items-start'>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
