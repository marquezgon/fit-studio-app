/* eslint-disable @next/next/no-img-element */
'use client'

import {useEffect, useState} from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from '@nextui-org/react'
import {User} from 'react-feather'
import {useAppStore} from '@/app/store'
import { IClass, IPackage } from '../types'

interface IClassesAndPackages {
  classes: IClass[]
  userPackages: IPackage[]
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

  console.log(classesAndPackages)

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center pt-8 md:pt-12">
        <img
          src="/logo-black-2.png"
          alt="Zeal Studio Logo"
          width={200}
        />
        <div className="w-3/4 lg:w-3/5 text-center pt-8">
          <h3 className='text-sm font-[200]'>
            MOTIVATION IS WHAT GETS YOU STARTED, COMMITMENT IS WHAT KEEPS YOU GOING.
          </h3>
          <h3 className='text-sm font-[200]'>
            RECUERDA QUE CUALQUIER CANCELACION DEBERA HACERSE 12 HRS ANTES DE LA CLASE.
          </h3>
        </div>
      </div>
      <div className="pt-8">
        <p className='uppercase flex items-center pb-4'>
          <User className='mr-2' size={36} />{user?.firstName} {user?.lastName}
        </p>
        <Table removeWrapper aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>DISCIPLINE</TableColumn>
            <TableColumn>SPOT</TableColumn>
            <TableColumn>DATE</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>Tony Reichert</TableCell>
              <TableCell>CEO</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>Zoey Lang</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
              <TableCell>Paused</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>Jane Fisher</TableCell>
              <TableCell>Senior Developer</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>William Howard</TableCell>
              <TableCell>Community Manager</TableCell>
              <TableCell>Vacation</TableCell>
              <TableCell>Vacation</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}