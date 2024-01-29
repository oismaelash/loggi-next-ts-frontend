import { ReactNode, useEffect } from 'react'

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
import { useRoutes } from '@/hooks/useRoutes'
import { XIcon } from 'lucide-react'
import { DialogForm } from './index'

export function EditClientDialog({ children }: { children: ReactNode }) {
  const { handleEditRoute, isLoading, handleChangeCurrentRoute } = useRoutes()

  useEffect(() => {
    handleChangeCurrentRoute()
  }, [])
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        { children }
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle className='text-lg font-bold'>
            <div className='flex w-full justify-between items-center'>
              <h4>Edit route</h4>
              <AlertDialogCancel className='border-none px-2'>
                <XIcon />
              </AlertDialogCancel>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className='text-sm text-foreground/50'>
            Enter new route data in the fields below
          </AlertDialogDescription>
        </AlertDialogHeader>
        <DialogForm requestFunction={handleEditRoute}>
          <AlertDialogFooter>
            <Button
              disabled={isLoading}
              className='w-full py-6 rounded-[6px] text-white font-bold'
              type="submit"
            > 
              {isLoading
                ? (<div className='w-4 h-4 border-2 border-t-white rounded-full animate-spin'/>)
                : ('Update route')
              }
            </Button>
          </AlertDialogFooter>
        </DialogForm>
      </AlertDialogContent>
    </AlertDialog>
  )
}
