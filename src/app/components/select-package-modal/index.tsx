/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, Link} from '@nextui-org/react'
import {usePathname} from 'next/navigation'; 
import 'react-international-phone/style.css'
import {IPackage, ModalProps} from '@/app/types'

export default function SelectPackageModal(props: ModalProps) {
  const [packages, setPackages] = React.useState<IPackage[]>([])
  const pathname = usePathname() 

  React.useEffect(() => {
    const fetchPackages = async () => {
      const response = await fetch(`/api/package/list`)
      const data = await response.json()

      setPackages(data?.packages)
    };

    fetchPackages()
  }, [])

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
                {packages.map((pack) => (
                  <Link key={pack.id} href={`https://buy.stripe.com/test_fZeaH13iSgChe2s9AA?prefilled_promo_code=APERTURA40&?client_reference_id=${pack.id}`}>
                    <div className="grid grid-cols-3 grid-gap-3 w-full border-solid border-2 rounded-lg py-1 text-center mb-4 border-slate-900 text-slate-900 hover:text-white hover:bg-black">
                      <p className='text-lg uppercase'>{pack.name}</p>
                      <p className='text-lg'>${pack.price}.00</p>
                      <p className='text-sm'>* {pack.expires_in} días de vigencia</p>
                    </div>
                  </Link>
                ))}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}