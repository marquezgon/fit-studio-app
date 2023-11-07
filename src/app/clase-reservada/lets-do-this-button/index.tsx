'use client'

import Link from "next/link"

export default function LetsDoThisButton() {
  const lastUrl = sessionStorage.getItem('zeal_last_url')
  return (
    <Link href={lastUrl || 'https://zealstudio.mx/home/'} className='text-white'>
        <div className='py-1 px-2'>LET&apos;S DO THIS</div>
    </Link>
  )
}