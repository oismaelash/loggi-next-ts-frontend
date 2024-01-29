'use client'

import { Button } from '@/components/ui/button'
import { useClients } from '@/hooks/useClients'
import { toast } from 'sonner'
import { CreateClientDialog } from '../ClientsForm/create-form'
import DeleteFormDialog from '../ClientsForm/delete-form'
import { EditClientDialog } from '../ClientsForm/edit-form'

export function TableHeader() {
  const { rowsIds } = useClients()
  
  function handleCheckRowsSelected(): boolean {
    if (rowsIds.length <= 0) {
      toast.error('You must select an client.')
      return false
    } else if (rowsIds.length > 1) {
      toast.error('You must select only one item for editing')
      return false
    }

    return true
  }

  return (
    <div className='flex justify-between my-4'>
      <div>
        <h3 className='text-lg font-bold mb-2'>
          List of registered clients
        </h3>
        <p className='text-sm text-foreground/50 mr-8'>
          Below is the table with all registered clients and a search field by name.
        </p>
      </div>
      <div className='flex flex-nowrap gap-4'>
        <CreateClientDialog>
          <Button>
            New client
          </Button>
        </CreateClientDialog>

        {rowsIds.length === 1 ? (
          <EditClientDialog>
            <Button
              onClick={handleCheckRowsSelected}
              className='bg-secondary hover:bg-secondary/90'
            >
              Edit client
            </Button>
          </EditClientDialog>
        ) : (
          <Button
            onClick={handleCheckRowsSelected}
            className='bg-secondary hover:bg-secondary/90'
          >
            Edit client
          </Button>
        )}
        
        {rowsIds.length <= 0
          ? (
            <Button
              onClick={handleCheckRowsSelected}
              className='bg-destructive hover:bg-destructive/90'
            >
              Delete
            </Button>
          )
          : (
            <DeleteFormDialog />
          )}
        
      </div>
    </div>
  )
}