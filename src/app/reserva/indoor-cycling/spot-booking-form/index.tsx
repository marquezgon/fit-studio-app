'use client'

import {useState} from 'react'
import {Button} from '@nextui-org/react'
import Spot, { SpotStatus, DummySpot } from '@/app/components/spot'
import classNames from 'classnames'
import { IClassInfo, IClass, ModalType } from '@/app/types'
import {DateTime} from 'luxon'
import {useAppStore} from '@/app/store'

interface IClassData {
  seats: IClassInfo[]
  classInfo: IClass
}
interface Props {
  data: IClassData
}

export default function SpotBookingForm(props: Props) {
  const {user, toggleModal} = useAppStore()
  const { seats} = props.data

  const seatsMap = new Map()
  for (let i = 1; i <= 27; i++) {
    seatsMap.set(i, SpotStatus.AVAILABLE)
  }

  seats.forEach((item) => {
    seatsMap.set(item.seat, SpotStatus.RESERVED)
  })
  
  const initialValues: SpotStatus[] = Array.from(seatsMap.values())

  const [bookingItems, setBookingItems] = useState(initialValues)

  const handleClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    const newItems = initialValues.map((item, i) => {
      if (i === index) {
        if (item === SpotStatus.AVAILABLE) {
          item = SpotStatus.SELECTED
        } else {
          item = SpotStatus.AVAILABLE
        }
      }

      return item
    })
    setBookingItems(newItems)
  }

  const handleBookClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!user) {
      toggleModal(ModalType.SIGN_UP)
    }
  }

  console.log(user)

  return (
    <div className="w-full mx-12">
      <div className="flex justify-center pb-8 md:pb-10">
        <div className="flex items-center uppercase px-6">
          <DummySpot status={SpotStatus.AVAILABLE} />
          <span className="pl-2">Disponible</span>
        </div>
        <div className="flex items-center uppercase px-6">
          <DummySpot status={SpotStatus.RESERVED} />
          <span className="pl-2">Reservada</span>
        </div>
      </div>
      <div className="flex justify-center pb-4">
        <p className="text-sm uppercase">
          {DateTime.fromISO(props.data.classInfo.date).setLocale('es').toFormat("dd / LLL / yyyy | EEEE t a")}
          {/* 07 / SEP  / 2023 | JUEVES 7:00 AM  */}
        </p>
      </div>
      <div className="flex justify-center pb-12 md:pt-8 md:pb-16">
        <p className="text-2xl uppercase">{props.data.classInfo.coach}</p>
      </div>
      <div className="grid grid-cols-7 gap-3 justify-center px-16" style={{ paddingLeft: '6rem', paddingRight: '6rem' }}>
        {bookingItems.map((item, i) => {
          return (
            <div
              key={i}
              className={classNames("flex", { "justify-end": ((i > 6 && i < 14) || i > 20 && i < 27) })}
            >
              <Spot text={(i + 1).toString()} index={i} handleClick={handleClick} status={item} disabled={item !== SpotStatus.AVAILABLE} />
            </div>
          )
        })}
      </div>
      <div className='pt-8 text-center'>
        <Button
          size="lg"
          isDisabled={!bookingItems.includes(SpotStatus.SELECTED)}
          style={{ backgroundColor: '#232321', color: 'white' }}
          className='hover:opacity-80'
          onClick={handleBookClick}
        >
          RESERVAR
        </Button>
      </div>
    </div>
  )
}
