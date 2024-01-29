import { RoutesContext } from '@/context/routes-context'
import { useContext } from 'react'

export function useRoutes() {
  const contentContext = useContext(RoutesContext)
  
  if (!contentContext) {
    throw new Error('useRoutes hook must be used within a RoutesProvider')
  }

  return contentContext
}
  