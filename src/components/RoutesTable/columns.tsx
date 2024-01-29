import { Route } from '@/@types/route'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { formatDate } from '@/utils/format-date'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDownIcon, ArrowUpRightIcon, ClipboardIcon, RouteIcon } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

function copyToClipboard(link: string) {
  navigator.clipboard.writeText(link)
    .then(() => toast.success('Link copied'))
    .catch(() => toast.error('Failed to copy link'))
}

export const columns: ColumnDef<Route>[] = [
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
    accessorKey: 'id',
    header: ({ column }) => (
      <Button
        className='gap-2 w-full justify-start px-2'
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        ID <ArrowUpDownIcon className='w-4 h-4' />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="capitalize px-2">{row.getValue('id')}</span>
    ),
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button
        className='gap-2 w-full justify-start px-2'
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Title <ArrowUpDownIcon className='w-4 h-4' />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="capitalize px-2">{row.getValue('title')}</span>
    ),
  },
  {
    accessorKey: 'clients',
    header: 'N. Clients',
    cell: ({ row }) => {
      const numberOfClients: Array<number> = row.getValue('clients')
      
      return (
        <span className='px-6'>{numberOfClients.length}</span>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        className='gap-2 w-full justify-start px-2'
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Created at <ArrowUpDownIcon className='w-4 h-4' />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize px-2">
        {formatDate(row.getValue('createdAt'))}
      </div>
    ),
  },
  {
    accessorKey: 'link',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex px-2 gap-2">
        <Button
          onClick={() => copyToClipboard(row.getValue('link') || '')}
          size={'icon'}
          variant={'secondary'}
        >
          <ClipboardIcon className='text-primary-foreground' size={16} />
        </Button>
        <Link href={row.getValue('link') || ''} target='_blank'>
          <Button size={'icon'} variant={'default'}>
            <ArrowUpRightIcon className='text-primary-foreground' size={16} />
          </Button>
        </Link>
        <Link href={`/route/${row.getValue('id')}`} target='_blank'>
          <Button size={'icon'} variant={'outline'}>
            <RouteIcon size={16} />
          </Button>
        </Link>
      </div>
    ),
  }
]