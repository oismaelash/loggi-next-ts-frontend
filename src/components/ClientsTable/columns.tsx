import { Client } from '@/@types/client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDownIcon } from 'lucide-react'

export const columns: ColumnDef<Client>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        className='gap-2 w-full justify-start px-2'
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Name <ArrowUpDownIcon className='w-4 h-4' />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="capitalize px-2">{row.getValue('name')}</span>
    ),
  },
  {
    accessorKey: 'street',
    aggregatedCell: 'number',
    header: 'Street',
    cell: ({ row }) => (
      <span>{row.getValue('street')}</span>
    ),
  },
  {
    accessorKey: 'number',
    aggregatedCell: 'street',
    header: 'Number'
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => (
      <span>{row.getValue('phone')}</span>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <span>{row.getValue('email')}</span>
    ),
  }
]