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

import { Route } from '@/@types/route'
import { RoutesResponseData } from '@/@types/routes-response-data'
import { emptyRoute } from '@/components/RoutesForm/empy-values'
import { routeSchema } from '@/components/RoutesForm/routes-schema'
import { columns } from '@/components/RoutesTable/columns'
import { changeCurrentRoute } from '@/utils/change-current-route'
import { createNewRoute } from '@/utils/create-new-route'
import { deleteRouteById } from '@/utils/delete-route-by-ids'
import { editRoute } from '@/utils/edit-route'
import { getIdsOfSelectedRows } from '@/utils/get-ids-of-selected-rows'
import { orderRouteData } from '@/utils/order-route-data'
import { jwt } from '@/utils/session'
import { zodResolver } from '@hookform/resolvers/zod'
import { UseFormReturn, useForm } from 'react-hook-form'

interface RoutesContextTypes {
  form: UseFormReturn<Route, undefined>
  table: Table<Route>
  routes: Route[]
  rowsIds: Array<number>
  isLoading: boolean
  setPageIndex: Dispatch<SetStateAction<number>>
  setPageSize: Dispatch<SetStateAction<number>>
  loadRoutes: () => void
  handleCreateRoute: (data: Route) => Promise<void>
  handleDeleteRoute: () => Promise<void>
  handleEditRoute: (data: Route) => Promise<void>
  handleChangeCurrentRoute: () => Promise<void>
}

export const RoutesContext = createContext({} as RoutesContextTypes)

interface RoutesProviderProps {
  children: ReactNode
}

export default function RoutesProvider({ children }: RoutesProviderProps) {
  const [routes, setRoutes] = useState<Route[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [pageSize, setPageSize] = useState(5)
  const [pageIndex, setPageIndex] = useState(0)
  const [rowsIds, setRowsIds] = useState<Array<number>>([])

  const table = useReactTable({
    data: routes,
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
  
  const form = useForm<Route>({
    resolver: zodResolver(routeSchema),
    defaultValues: emptyRoute
  })

  useEffect(() => {
    loadRoutes()
  }, [])

  useEffect(() => {
    const ids = getIdsOfSelectedRows(table)
    setRowsIds(ids)
  }, [table, table.options.state.rowSelection])


  async function loadRoutes() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/routes?populate=*`
    
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    })
      .then(async (res) => {
        const response: RoutesResponseData = await res.json()
        const routes = orderRouteData(response)
        setRoutes(routes)
        return response
      })
  }

  async function handleChangeCurrentRoute() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/routes/${rowsIds[0]}?populate=*`
    const orderRoute = await changeCurrentRoute(url)
    form.reset(orderRoute)
  }

  async function handleCreateRoute(data: Route) {
    await createNewRoute(data)
    form.reset(emptyRoute)
  }

  async function handleEditRoute(data: Route) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/routes/${rowsIds[0]}`
    await editRoute(data, url)
  }

  async function handleDeleteRoute() {
    await deleteRouteById(rowsIds)
    table.toggleAllPageRowsSelected(false)
  }

  const initialContent = {
    form,
    table,
    routes,
    rowsIds,
    isLoading: form.formState.isSubmitting,
    setPageIndex,
    setPageSize,
    loadRoutes,
    handleCreateRoute,
    handleDeleteRoute,
    handleEditRoute,
    handleChangeCurrentRoute
  }

  return (
    <RoutesContext.Provider value={initialContent}>
      { children }
    </RoutesContext.Provider>
  )
}