"use client"

import {useState} from 'react'
import Spot, { SpotStatus, DummySpot } from '@/app/components/spot'
import classNames from 'classnames';
import { IClassInfo } from '@/app/types';

interface Props {
  classInfo: IClassInfo[]
}

export default function SpotBookingForm(props: Props) {
  console.log(props)

  const seatsMap = new Map()
  for (let i = 1; i <= 27; i++) {
    seatsMap.set(i, SpotStatus.AVAILABLE)
  }

  props.classInfo.forEach((item) => {
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
  };

  return (
    <div className="w-full mx-12">
      <div className="flex justify-center pb-8 md:pb-12">
        <div className="flex items-center uppercase px-6">
          <DummySpot status={SpotStatus.AVAILABLE} />
          <span className="pl-2">Disponible</span>
        </div>
        <div className="flex items-center uppercase px-6">
          <DummySpot status={SpotStatus.RESERVED} />
          <span className="pl-2">Reservada</span>
        </div>
      </div>
      <div className="flex justify-center pb-8">
        <p className="text-sm">07 / SEP  / 2023 | JUEVES 7:00 AM | DURACION: 50 MIN </p>
      </div>
      <div className="flex justify-center pb-12 md:pt-8 md:pb-20">
        <p className="text-2xl uppercase">ORCI</p>
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
    </div>
  )
}
