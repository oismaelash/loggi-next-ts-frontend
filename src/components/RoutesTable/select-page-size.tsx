import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRoutes } from '@/hooks/useRoutes'

export function SelectPageSize() {
  const { setPageSize } = useRoutes()

  function handlePageSizeChange(item: number) { 
    setPageSize(item)
  }
  return (
    <Select onValueChange={(e) => {
      handlePageSizeChange(Number(e))
    }}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Page size" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {[5, 10, 20, 30, 40, 50].map((item) => (
            <SelectItem key={item} value={item.toString()}>
              {'Show ' + item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
