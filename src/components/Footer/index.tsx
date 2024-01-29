import Link from 'next/link'

export default function Footer() {
  return (
    <div className='w-full h-10 text-center'>
      Copyright ©{' '}
      <Link href='https://sharelink.shop/'>ShareLink.Shop</Link>
      {' '}2023.
    </div>
  )
}