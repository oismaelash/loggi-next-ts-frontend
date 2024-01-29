'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface NavItemProps {
  onClick?: () => void
  url: string
  icon: ReactNode
  title: string
  currentRoute?: boolean
  isOpen: boolean
}

export default function NavItem({ onClick, url, icon, title, isOpen }: NavItemProps) {
  const path = usePathname()
  const isCurrentRoute = title.toLowerCase() === path.replace('/', '')
  const style = 'bg-white drop-shadow-md [&>*:nth-child(1)]:text-white [&>*:nth-child(1)]:bg-primary'
  
  return (
    <Link onClick={onClick} href={url}>
      <div className={` 
        ${isCurrentRoute && style}
        ${!isOpen && 'py-3 px-4'}
        transition-all duration-300
        flex w-full items-center gap-3 rounded-lg
        hover:bg-white hover:drop-shadow-md
        [&>*:nth-child(1)]:hover:text-white
        [&>*:nth-child(1)]:hover:bg-primary
      `}>
        <div className='w-10 p-2 mr-1 rounded-lg transition-all duration-300'>
          {icon}
        </div>
        <span className={`
          ${isOpen ? 'opacity-0' : 'opacity-100'}
          transition-all duration-1000
          text-lg font-medium text-zinc-700
        `}>
          {title}
        </span>
      </div>
    </Link>
  )
}