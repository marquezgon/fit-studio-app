/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import SignInModal from '@/app/components/signin-modal'
import SignUpModal from '@/app/components/signup-modal'

export default function Reserva() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 h-screen'>
      <SignInModal />
      <SignUpModal />
      <Link href='/reserva/indoor-cycling'>
        <img
          className='grayscale hover:grayscale-0'
          src='/indoor-cycling.jpg'
          alt='Indoor Cycling'
        />
      </Link>
      <Link href='/reserva/move'>
        <img
          className='grayscale hover:grayscale-0'
          src='/move.jpg'
          alt='Move'
        />
      </Link>
    </div>
  )
}