
import { ClientsContext } from '@/context/clients-context'
import { useContext } from 'react'

export function useClients() {
  const contentContext = useContext(ClientsContext)
  
  if (!contentContext) {
    throw new Error('useClients hook must be used within a ClientsProvider')
  }

  return contentContext
}
  