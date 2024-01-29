import { Button } from '@/components/ui/button'
import { useRoutes } from '@/hooks/useRoutes'
import { SelectPageSize } from './select-page-size'

export function TableFooter() {
  const { table, setPageIndex } = useRoutes()

  function handleNextPageIndex() {
    setPageIndex((state) => state + 1)
  }

  function handlePreviousPageIndex() {
    setPageIndex((state) => state - 1)
  }
  
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} selected(s) line(s).
      </div>
      <div className="flex gap-2">
        <SelectPageSize />
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreviousPageIndex}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPageIndex}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}