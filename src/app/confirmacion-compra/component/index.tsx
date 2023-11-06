'use client'

import {useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {CheckCircle} from 'react-feather'

export default function Compra() {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      const lastUrl = sessionStorage.getItem('zeal_last_url')
      if (lastUrl) {
        router.push(lastUrl)
      }
    }, 4000)
  }, [])

  return (
    <div className='py-8 text-center flex justify-center flex-col items-center'>
      <CheckCircle size='256' />
      <div className='pt-8'>
        <h1 className='text-4xl uppercase'>Gracias por tu compra</h1>
        <h3 className='text-xl pt-3'>En unos momentos serás redirigido a continuar con tu reserva</h3>
      </div>
    </div>
  )
}