/* eslint-disable @next/next/no-img-element */
'use client'

import {useEffect, useState} from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from '@nextui-org/react'
import {User} from 'react-feather'
import {useAppStore} from '@/app/store'
import {IClassInfo, IUserPackage} from '../types'
import {DateTime} from 'luxon'

interface IClassesAndPackages {
  classes: IClassInfo[]
  userPackages: IUserPackage[]
}

export default function Profile() {
  const {user} = useAppStore()
  const [classesAndPackages, setClassesAndPackages] = useState<IClassesAndPackages>({ classes: [], userPackages: [] })


  useEffect(() => {
    if (user) {
      const fetchPackagesAndClasses = async () => {
        const response = await fetch(`/api/profile/${user.id}`)
  
        if (response.ok) {
          const jsonRes: IClassesAndPackages = await response.json()
          console.log(jsonRes)
          setClassesAndPackages(jsonRes)
        }
      };
  
      fetchPackagesAndClasses()
    }
  }, [user])

  return (
    <div className="container mx-auto">
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
            <TableColumn>DISCIPLINE</TableColumn>
            <TableColumn>SPOT</TableColumn>
            <TableColumn>DATE</TableColumn>
            <TableColumn>TIME</TableColumn>
            <TableColumn>COACH</TableColumn>
          </TableHeader>
          <TableBody>
            {classesAndPackages.classes.map((bookedClass) => (
              <TableRow key={bookedClass.id}>
                <TableCell>
                  <p className='text-xs md:text-base text-black'>{bookedClass.type === 'indoor-cycling' ? 'Indoor Cycling' : 'Move'}</p>
                </TableCell>
                <TableCell>
                  <p className='text-xs md:text-base text-black'>{bookedClass.seat}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs md:text-base text-black">
                    {DateTime.fromISO(bookedClass.date!).setLocale('es').toFormat("EEE d / LLL / yy")}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="text-xs md:text-base text-black">{DateTime.fromISO(bookedClass.date!).toFormat("t")}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs md:text-base text-black uppercase">{bookedClass.coach}</p>
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