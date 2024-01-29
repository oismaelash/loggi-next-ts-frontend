import { ReactNode } from 'react'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

import { Button } from '@/components/ui/button'
import { useClients } from '@/hooks/useClients'
import { XIcon } from 'lucide-react'
import { emptyClient } from './empy-values'
import { DialogForm } from './index'

export function CreateClientDialog({ children }: { children: ReactNode }) {
  const { handleCreateClient, isLoading, form, table } = useClients()

  function resetFormData() {
    form.reset(emptyClient)
    table.toggleAllRowsSelected(false)
  }
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild onClick={resetFormData}>
        { children }
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle className='text-lg font-bold'>
            <div className='flex w-full justify-between items-center'>
              <h4>Create new client</h4>
              <AlertDialogCancel className='border-none px-2'>
                <XIcon />
              </AlertDialogCancel>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className='text-sm text-foreground/50'>
            Enter client data in the fields below
          </AlertDialogDescription>
        </AlertDialogHeader>
        <DialogForm requestFunction={handleCreateClient}>
          <AlertDialogFooter>
            <Button
              disabled={isLoading}
              className='w-full py-6 rounded-[6px] text-white font-bold'
              type="submit"
            > 
              {isLoading
                ? (<div className='w-4 h-4 border-2 border-t-white rounded-full animate-spin'/>)
                : ('Create client')
              }
            </Button>
          </AlertDialogFooter>
        </DialogForm>
      </AlertDialogContent>
    </AlertDialog>
  )
}
