/* eslint-disable @next/next/no-img-element */
'use client'

import {useEffect, useState} from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip} from '@nextui-org/react'
import {User, XCircle} from 'react-feather'
import {useAppStore} from '@/app/store'
import CancelClassModal from '@/app/components/cancel-class-modal'
import {IClassInfo, IUserPackage} from '../types'
import {DateTime} from 'luxon'

export interface IClassesAndPackages {
  classes: IClassInfo[]
  userPackages: IUserPackage[]
}

export default function Profile() {
  const {user, cancelClassModal, setCancelClassModal} = useAppStore()
  const [classesAndPackages, setClassesAndPackages] = useState<IClassesAndPackages>({ classes: [], userPackages: [] })

  useEffect(() => {
    if (user) {
      const fetchPackagesAndClasses = async () => {
        const response = await fetch(`/api/profile/${user.id}`)
  
        if (response.ok) {
          const jsonRes: IClassesAndPackages = await response.json()
          setClassesAndPackages(jsonRes)
        }
      };
  
      fetchPackagesAndClasses()
    }

  }, [user])

  const handleClick = (selectedClass: IClassInfo) => {
    setCancelClassModal({ showModal: true, selectedClass })
  }

  console.log(classesAndPackages)

  return (
    <div className="container mx-auto">
      {cancelClassModal.showModal && (
        <CancelClassModal
          isOpen={cancelClassModal.showModal}
          data={cancelClassModal}
          classesAndPackages={classesAndPackages}
          setClassesAndPackages={setClassesAndPackages}
        />
      )}
      <div className="hidden md:flex flex-col items-center pt-8 md:pt-12">
        <img
          src="/logo-black-2.png"
          alt="Zeal Studio Logo"
          width={200}
        />
        <div className="w-3/4 lg:w-3/5 text-center pt-8">
          <h3 className='te text-sm font-[200]'>
            MOTIVATION IS WHAT GETS YOU STARTED, COMMITMENT IS WHAT KEEPS YOU GOING.
          </h3>
          <h3 className='text-sm font-[200]'>
            RECUERDA QUE CUALQUIER CANCELACION DEBERA HACERSE 12 HRS ANTES DE LA CLASE.
          </h3>
        </div>
      </div>
      <div className="pt-8 md:pt-12 w-full px-2 md:px-8">
        <p className='uppercase flex items-center pb-4'>
          <User className='mr-2' size={36} />{user?.firstName} {user?.lastName}
        </p>
        <Table removeWrapper aria-label="Clases">
          <TableHeader>
            <TableColumn align='center' width={20}><p className='text-center'>DISCIPLINE</p></TableColumn>
            <TableColumn align='center' width={10}><p className='text-center'>SPOT</p></TableColumn>
            <TableColumn align='center' width={100}><p className='text-center'>DATE</p></TableColumn>
            <TableColumn align='center' width={20}><p className='text-center'>COACH</p></TableColumn>
            <TableColumn align='center' width={10}>{''}</TableColumn>
          </TableHeader>
          <TableBody>
            {classesAndPackages.classes.map((bookedClass) => (
              <TableRow key={`${bookedClass.id}=${bookedClass.seat}`}>
                <TableCell>
                  <p className='text-xs md:text-base text-black text-center'>{bookedClass.type === 'indoor-cycling' ? 'Indoor Cycling' : 'Move'}</p>
                </TableCell>
                <TableCell>
                  <p className='text-xs md:text-base text-black text-center'>{bookedClass.seat}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs md:text-base text-black text-center">
                    {DateTime.fromISO(bookedClass.date!).setLocale('es').toFormat("EEE d / LLL / yy")}
                  </p>
                  <p className="text-xs md:text-base text-black text-center">{DateTime.fromISO(bookedClass.date!).toFormat("t")}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs md:text-base text-black uppercase text-center">{bookedClass.coach}</p>
                </TableCell>
                <TableCell>
                  <Tooltip content="Cancelar Clase">
                    <span className="cursor-pointer active:opacity-50" onClick={() => handleClick(bookedClass)}>
                      <XCircle size={16} color='red' />
                    </span>
                  </Tooltip>   
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="pt-16 md:pt-20 w-full px-2 md:px-8">
        <Table removeWrapper aria-label="Paquetes">
          <TableHeader>
            <TableColumn>PACK</TableColumn>
            <TableColumn>EXPIRATION DATE</TableColumn>
            <TableColumn>CLASSES LEFT</TableColumn>
          </TableHeader>
          <TableBody>
            {classesAndPackages.userPackages.map((pack) => (
              <TableRow key={pack.package_id}>
                <TableCell>
                  <p className='text-xs md:text-base text-black uppercase'>
                    {pack.total_amount} {`${pack.total_amount == 1 ? 'class' : 'classes'} pack`}
                  </p>
                </TableCell>
                <TableCell>
                  <p className='text-xs md:text-base text-black'>{DateTime.fromISO(pack.expires_at).setLocale('es').toFormat("d / LLL / yy")}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs md:text-base text-black">
                    {pack.amount}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}