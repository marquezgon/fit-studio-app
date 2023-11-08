'use client'

import React from 'react'
import Link from 'next/link'

export default function LetsDoThisButton() {
  const [url, setUrl] = React.useState('https://zealstudio.mx/home/')

  React.useEffect(() => {
    const lastUrl = sessionStorage.getItem('zeal_last_url')
    if (lastUrl) {
      setUrl(lastUrl)
    }
  }, [])

  return (
    <Link href={url} className='text-white'>
      <div className='py-1 px-2'>LET&apos;S DO THIS</div>
    </Link>
  )
}