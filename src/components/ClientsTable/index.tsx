import { TableHeader } from './header'
import { TableSearch } from './search'
import { TableContent } from './content'
import { TableFooter }  from './footer'

export default function ClientsTable() {
  return (
    <>
      <TableHeader />
      <TableSearch />
      <TableContent />
      <TableFooter />
    </>
  )
}