'use client'

/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { IPackage, ModalType } from '@/app/types'
import { useAppStore } from '@/app/store'

export default function ZealPackages(props: { packages: IPackage[] }) {
  const {user, toggleModal} = useAppStore()
  
  const handleClick = () => {
    if (!user) {
      toggleModal(ModalType.SIGN_IN)
    }
  }

  return (
    <div className='pt-12 w-6/7 md:w-3/5 lg:w-2/5 flex flex-col items-center'>
      <div>
        <img
          src="/logo-black-2.png"
          alt="Zeal Studio Logo"
          width={200}
        />
      </div>
      <h3 className='text-xl font-[100] pt-8 pb-4'>SELECT YOUR PACKAGE</h3>
      <div className="grid grid-cols-1">
        {props.packages.map((pack) => (
          <Link key={pack.id} href={user ? pack.url : '#'} onClick={() => handleClick()}>
            <div className="grid grid-cols-3 grid-gap-3 w-full border-solid border-2 rounded-lg py-1 text-center mb-4 border-slate-900 text-slate-900 hover:text-white hover:bg-black">
              <p className='text-lg uppercase'>{pack.name}</p>
              <p className='text-lg'>${pack.price.toString().substring(0, pack.price.toString().length - 2)}.00</p>
              <p className='text-sm'>* {pack.expires_in} días de vigencia</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}