'use client'

import {useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {CircularProgress} from '@nextui-org/react'
import {CheckCircle} from 'react-feather'

export default function Compra(props: { data: any | undefined }) {
  const router = useRouter()
  useEffect(() => {
    if (props.data) {
      setTimeout(() => {
        const lastUrl = sessionStorage.getItem('zeal_last_url')
        if (lastUrl) {
          router.push(lastUrl)
        }
      }, 4000)
    }
  }, [])

  return (
    <div className='pt-24 pb-8 text-center flex justify-center flex-col items-center'>
      <CheckCircle size='128' />
      <div className='pt-8 flex flex-col items-center'>
        <h1 className='text-4xl uppercase'>Gracias por tu compra</h1>
        <h3 className='text-xl pt-3'>En unos momentos serás redirigido a continuar con tu reserva</h3>
        {props.data && (
          <div className='pt-8'>
            <CircularProgress color="default" aria-label="Loading..."/>
          </div>
        )}  
      </div>
    </div>
  )
}