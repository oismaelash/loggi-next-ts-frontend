'use client'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState
} from 'react'

import {
  ColumnFiltersState,
  SortingState,
  Table,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Client } from '@/@types/client'
import { ClientsResponseData } from '@/@types/clients-response-data'
import { emptyClient } from '@/components/ClientsForm/empy-values'
import { clientSchema } from '@/components/ClientsForm/form-schema'
import { columns } from '@/components/ClientsTable/columns'
import { changeCurrentClient } from '@/utils/change-current-client'
import { createNewClient } from '@/utils/create-new-client'
import { deleteClientById } from '@/utils/delete-client-by-id'
import { editClient } from '@/utils/edit-client'
import { getIdsOfSelectedRows } from '@/utils/get-ids-of-selected-rows'
import { orderClientData } from '@/utils/order-client-data'
import { jwt } from '@/utils/session'
import { zodResolver } from '@hookform/resolvers/zod'
import { UseFormReturn, useForm } from 'react-hook-form'

interface ClientsContextTypes {
  form: UseFormReturn<Client, undefined>
  table: Table<Client>
  clients: Client[]
  rowsIds: Array<number>
  isLoading: boolean
  setPageIndex: Dispatch<SetStateAction<number>>
  setPageSize: Dispatch<SetStateAction<number>>
  loadClients: () => Promise<void>
  handleCreateClient: (data: Client) => Promise<void>
  handleDeleteClient: () => Promise<void>
  handleEditClient: (data: Client) => Promise<void>
  handleChangeCurrentClient: () => Promise<void>
}

export const ClientsContext = createContext({} as ClientsContextTypes)

interface ClientsProviderProps {
  children: ReactNode
}

export default function ClientsProvider({ children }: ClientsProviderProps) {
  const [clients, setClients] = useState<Client[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [pageSize, setPageSize] = useState(5)
  const [pageIndex, setPageIndex] = useState(0)
  const [rowsIds, setRowsIds] = useState<Array<number>>([])

  const table = useReactTable({
    data: clients,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageSize,
        pageIndex
      }
    },
  })
  
  const form = useForm<Client>({
    resolver: zodResolver(clientSchema),
    defaultValues: emptyClient
  })

  useEffect(() => {
    loadClients()
  }, [])

  useEffect(() => {
    const ids = getIdsOfSelectedRows(table)
    setRowsIds(ids)
  }, [table, table.options.state.rowSelection])


  async function loadClients() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/clients?populate=*`
    
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    })
      .then(async (res) => {
        const response: ClientsResponseData = await res.json()
        const clients = orderClientData(response)
        setClients(clients)

        return response
      })
  }

  async function handleChangeCurrentClient() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/clients/${rowsIds[0]}?populate=*`
    const orderClient = await changeCurrentClient(url)
    form.reset(orderClient)
    
    console.log(form.getValues('phone'))
  }

  async function handleCreateClient(data: Client) {
    await createNewClient(data)
    form.reset(emptyClient)
  }

  async function handleEditClient(data: Client) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/clients/${rowsIds[0]}`
    await editClient(data, url)
  }

  async function handleDeleteClient() {
    await deleteClientById(rowsIds)
    table.toggleAllPageRowsSelected(false)
  }

  const initialContent = {
    form,
    table,
    clients,
    rowsIds,
    isLoading: form.formState.isSubmitting,
    setPageIndex,
    setPageSize,
    loadClients,
    handleCreateClient,
    handleDeleteClient,
    handleEditClient,
    handleChangeCurrentClient
  }

  return (
    <ClientsContext.Provider value={initialContent}>
      { children }
    </ClientsContext.Provider>
  )
}