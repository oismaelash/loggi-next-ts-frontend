// 'use client'

// import Link from 'next/link'
// import { Globe2Icon } from 'lucide-react'
// import { username } from '@/utils/session'
// import { useEffect, useState } from 'react'

// export default function ShowroomItem({ isOpen }: { isOpen: boolean }) {
//   const [url, setUrl] = useState<string>('')

//   useEffect(() => {
//     const url = `${process.env.NEXT_PUBLIC_SHOWROOM_URL}/@${username}`
//     setUrl(url)
//   }, [url])
  
//   return (
//     <Link href={url} target='_blank'>
//       <div className={`
//         ${!isOpen && 'py-3 px-4'}
//         transition-all duration-300
//         flex w-full items-center gap-3 rounded-lg
//         hover:bg-white hover:drop-shadow-md
//         [&>*:nth-child(1)]:hover:text-white
//         [&>*:nth-child(1)]:hover:bg-primary
//       `}>
//         <div className='w-10 p-2 mr-1 rounded-lg transition-all duration-300'>
//           <Globe2Icon />
//         </div>
//         <span className={`
//           ${isOpen ? 'opacity-0' : 'opacity-100'}
//           transition-all duration-1000
//           text-lg font-medium text-zinc-700
//         `}>
//           Showroom
//         </span>
//       </div>
//     </Link>
//   )
// }