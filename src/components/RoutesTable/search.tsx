import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { useRoutes } from '@/hooks/useRoutes'

export function TableSearch() {
  const { table } = useRoutes()
  
  return (
    <div className="flex items-center py-4 gap-4">
      <Input
        placeholder="Search routes by name"
        value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
        onChange={(event) =>
          table.getColumn('title')?.setFilterValue(event.target.value)
        }
        className="w-full"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className='max-h-min py-5 px-8 border-primary text-primary rounded-[6px] font-bold gap-3 hover:bg-primary hover:text-white transition-all duration-500'
            variant={'outline'}>
              Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}