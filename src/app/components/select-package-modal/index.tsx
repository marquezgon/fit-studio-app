/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, Link} from '@nextui-org/react'
import 'react-international-phone/style.css'
import {ModalProps} from '@/app/types'

export default function SelectPackageModal(props: ModalProps) {
  return (
    <Modal 
      isOpen={props.isOpen} 
      onOpenChange={props.onOpenChange}
      placement="top-center"
      isDismissable={false}
      size='xl'
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 justify-center items-center">
              <img
                src="/logo-black-2.png"
                alt="Zeal Studio Logo"
                width={200}
              />
              <h3 className='text-xl font-[100] pt-6'>SELECT YOUR PACKAGE</h3>
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1">
                <Link href="https://buy.stripe.com/test_fZeaH13iSgChe2s9AA?prefilled_promo_code=APERTURA40">
                  <div className="grid grid-cols-3 grid-gap-3 w-full border-solid border-2 rounded-lg py-1 text-center mb-4 border-slate-900 text-slate-900 hover:text-white hover:bg-black">
                    <p className='text-lg'>FIRST RIDE</p>
                    <p className='text-lg'>$160.00</p>
                    <p className='text-sm'>* 7 días de vigencia</p>
                  </div>
                </Link>
                <Link href="https://buy.stripe.com/test_fZeaH13iSgChe2s9AA?prefilled_promo_code=APERTURA40">
                  <div className="grid grid-cols-3 grid-gap-3 w-full border-solid border-2 rounded-lg py-1 text-center mb-4 border-slate-900 text-slate-900 hover:text-white hover:bg-black">
                    <p className='text-lg'>1 CLASS PACK</p>
                    <p className='text-lg'>$200.00</p>
                    <p className='text-sm'>* 7 días de vigencia</p>
                  </div>
                </Link>
                <Link href="https://buy.stripe.com/test_fZeaH13iSgChe2s9AA?prefilled_promo_code=APERTURA40">
                  <div className="grid grid-cols-3 grid-gap-3 w-full border-solid border-2 rounded-lg py-1 text-center mb-4 border-slate-900 text-slate-900 hover:text-white hover:bg-black">
                    <p className='text-lg'>5 CLASSES PACK</p>
                    <p className='text-lg'>$1,000.00</p>
                    <p className='text-sm'>* 30 días de vigencia</p>
                  </div>
                </Link>
                <Link href="https://buy.stripe.com/test_fZeaH13iSgChe2s9AA?prefilled_promo_code=APERTURA40">
                  <div className="grid grid-cols-3 grid-gap-3 w-full border-solid border-2 rounded-lg py-1 text-center mb-4 border-slate-900 text-slate-900 hover:text-white hover:bg-black">
                  <p className='text-lg'>10 CLASSES PACK</p>
                    <p className='text-lg'>$1,700.00</p>
                    <p className='text-sm'>* 60 días de vigencia</p>
                  </div>
                </Link>
                <Link href="https://buy.stripe.com/test_fZeaH13iSgChe2s9AA?prefilled_promo_code=APERTURA40">
                  <div className="grid grid-cols-3 grid-gap-3 w-full border-solid border-2 rounded-lg py-1 text-center mb-4 border-slate-900 text-slate-900 hover:text-white hover:bg-black">
                  <p className='text-lg'>25 CLASSES PACK</p>
                    <p className='text-lg'>$3,000.00</p>
                    <p className='text-sm'>* 60 días de vigencia</p>
                  </div>
                </Link>
                <Link href="https://buy.stripe.com/test_fZeaH13iSgChe2s9AA?prefilled_promo_code=APERTURA40">
                  <div className="grid grid-cols-3 grid-gap-3 w-full border-solid border-2 rounded-lg py-1 text-center mb-4 border-slate-900 text-slate-900 hover:text-white hover:bg-black">
                  <p className='text-lg'>25 CLASSES PACK</p>
                    <p className='text-lg'>$3,500.00</p>
                    <p className='text-sm'>* 90 días de vigencia</p>
                  </div>
                </Link>
                <Link href="https://buy.stripe.com/test_fZeaH13iSgChe2s9AA?prefilled_promo_code=APERTURA40">
                  <div className="grid grid-cols-3 grid-gap-3 w-full border-solid border-2 rounded-lg py-1 text-center mb-4 border-slate-900 text-slate-900 hover:text-white hover:bg-black">
                  <p className='text-lg'>50 CLASSES PACK</p>
                    <p className='text-lg'>$5,500.00</p>
                    <p className='text-sm'>* 365 días de vigencia</p>
                  </div>
                </Link>
                <Link href="https://buy.stripe.com/test_fZeaH13iSgChe2s9AA?prefilled_promo_code=APERTURA40">
                  <div className="grid grid-cols-3 grid-gap-3 w-full border-solid border-2 rounded-lg py-1 text-center mb-4 border-slate-900 text-slate-900 hover:text-white hover:bg-black">
                  <p className='text-lg'>70 CLASSES PACK</p>
                    <p className='text-lg'>$7,250.00</p>
                    <p className='text-sm'>* 365 días de vigencia</p>
                  </div>
                </Link>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}