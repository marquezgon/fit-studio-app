/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'

export default function Reserva() {
  return (
    <div className='lg:grid lg:grid-cols-2 lg:h-screen'>
      <Link href='/reserva/indoor-cycling'>
        <div className='relative'>
          <p className='uppercase font-thin absolute z-10 text-white text-xl top-[40%] left-[30%] md:hidden'>Indoor Cycling</p>
          <img
            className='hidden md:block grayscale hover:grayscale-0'
            src='/indoor-cycling.jpg'
            alt='Indoor Cycling'
          />
          <img
            className='md:hidden grayscale hover:grayscale-0 w-full min-h-[330px]'
            src='/indoor-cycling-sm.jpg'
            alt='Indoor Cycling'
          />
        </div>
      </Link>
      <Link href='/reserva/move'>
        <div className='relative'>
          <p className='uppercase font-thin absolute z-10 text-white text-xl top-[40%] left-[40%] md:hidden'>Move</p>
          <img
            className='hidden md:block grayscale hover:grayscale-0'
            src='/move.jpg'
            alt='Move'
          />
          <img
            className='md:hidden grayscale hover:grayscale-0 w-full min-h-[330px]'
            src='/move-sm.jpg'
            alt='Move'
          />
        </div>
      </Link>
    </div>
  )
}