import { toast } from 'sonner'
import { jwt } from './session'

export async function deleteClientById(ids: number[]): Promise<void> {

  if (ids.length <= 0) {
    return alert('You must select an item for editing')
  }

  try {
    ids.map(async (id) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/clients/${id}`

      await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        }
      }).then(async (res) => {
        const response = await res.json()
        toast.success('Client deleted')
        
        setTimeout(() => {
          if (window) window.location.reload()
        }, 1000)
        
        return response
      })
    })
  } catch (erro) {
    console.error('Error when deleting items:', erro)

    setTimeout(() => {
      if (window) window.location.reload()
    }, 1000)
  }
}