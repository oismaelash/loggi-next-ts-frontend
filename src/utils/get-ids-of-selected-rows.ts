/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from '@tanstack/react-table'

interface IndexOfSelectedRows {
  [index: string]: boolean
}

export function getIdsOfSelectedRows(table: Table<any>) {
  const indexOfSelectedRows: IndexOfSelectedRows | undefined
      = table.options.state.rowSelection
    
  const allRows: any[] = table.options.data

  if (indexOfSelectedRows !== undefined) {
    const arrayOfSelectecIndex = Object.keys(indexOfSelectedRows)
      .filter((i) => indexOfSelectedRows[i])
      .map((key) => parseInt(key))
      
    const arrayOfSelectedIds = arrayOfSelectecIndex
      .map((i) => allRows[i].id)
      
    return arrayOfSelectedIds
  }
  return []
}