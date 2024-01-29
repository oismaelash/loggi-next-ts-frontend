import { TableContent } from './content'
import { TableFooter } from './footer'
import { TableHeader } from './header'
import { TableSearch } from './search'

export default function RoutesTable() {
  return (
    <>
      <TableHeader />
      <TableSearch />
      <TableContent />
      <TableFooter />
    </>
  )
}