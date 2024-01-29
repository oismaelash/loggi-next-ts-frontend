'use client'

import { usePathname } from 'next/navigation'

import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const route = usePathname()
  const pathName = route.split('/')[1]

  return (
    <header className='flex w-full items-center py-8 px-8'>
      <div className='flex w-full max-w-[220px]'>
        <Link href='/'>
          <Image className='max-w-[160px]' width={1000} height={1000} src={process.env.NEXT_PUBLIC_LOGO_URL || ''} alt="" />
        </Link>
      </div>
      <div className='flex w-full justify-between items-center'>
        <p className='text-sm capitalize'>
          <span className='text-zinc-400'>
              Pages /{' '}
          </span>
          {pathName}
        </p>
      </div>
    </header>
  )
}