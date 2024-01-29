'use client'

import { useState } from 'react'

import NavItem from './nav-item'

import { Button } from '../ui/button'
import { setJwt } from '@/utils/session'

import {
  ArrowLeftFromLine as ArrowLeftIcon,
  LucideLayoutDashboard as DashboardIcon,
  User2Icon,
  RouteIcon,
  LogOutIcon
} from 'lucide-react'

export default function AsideBar() {
  const [isOpen, setIsOpen] = useState(false)

  const openStyle = 'max-w-[40px] overflow-hidden'
  const closeStyle = 'max-w-[220px]'

  function handleLogout() {
    setJwt()
  }

  return (
    <aside className={`
      w-full mx-8 mt-5 transition-all duration-700
      ${isOpen ? openStyle : closeStyle}
    `}>
      <div className='w-full'>
        <Button size='icon' onClick={() => setIsOpen((state) => !state)}>
          <div className={`
            ${isOpen && 'rotate-180'}
            flex justify-center items-center w-5 h-5
            transition-all duration-700
          `}>
            <ArrowLeftIcon className='w-full' />
          </div>
        </Button>
        <nav className={`
          ${isOpen ? 'gap-4' : 'gap-1'}
          flex flex-col w-full h-full mt-3
        `}>
          <NavItem
            isOpen={isOpen}
            url={'/dashboard'}
            icon={<DashboardIcon />}
            title={'Dashboard'}
            currentRoute
          />
          <NavItem
            isOpen={isOpen}
            url={'/clients'}
            icon={<User2Icon />}
            title={'Clients'}
          />
          <NavItem
            isOpen={isOpen}
            url={'/routes'}
            icon={<RouteIcon />}
            title={'Routes'}
            currentRoute
          />
          <NavItem
            onClick={handleLogout}
            isOpen={isOpen}
            url={'/'}
            icon={<LogOutIcon />}
            title={'Logout'}
          />
        </nav>
      </div>
    </aside>

  )
}