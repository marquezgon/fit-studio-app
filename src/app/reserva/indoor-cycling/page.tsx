'use client'

import {useState} from 'react'
import {DateTime} from 'luxon'
import {Button} from '@nextui-org/button';
import {Card, CardBody} from '@nextui-org/card';
import styles from './style.module.css'

export default function IndoorCycling() {
  const [timeframe, setTimeframe] = useState(7)

  const firstDay = <p className='uppercase text-sm md:text-base'>{DateTime.fromJSDate(new Date()).plus({ days: timeframe }).setLocale('es').toFormat('EEE dd MMM')}</p>
  const secondDay = <p className='uppercase text-sm md:text-base'>{DateTime.fromJSDate(new Date()).plus({ days: timeframe + 1 }).setLocale('es').toFormat('EEE dd MMM')}</p>
  const thirdDay = <p className='uppercase text-sm md:text-base'>{DateTime.fromJSDate(new Date()).plus({ days: timeframe + 2 }).setLocale('es').toFormat('EEE dd MMM')}</p>
  const fourthDay = <p className='uppercase text-sm md:text-base'>{DateTime.fromJSDate(new Date()).plus({ days: timeframe + 3 }).setLocale('es').toFormat('EEE dd MMM')}</p>
  const fifthDay = <p className='uppercase text-sm md:text-base'>{DateTime.fromJSDate(new Date()).plus({ days: timeframe + 4 }).setLocale('es').toFormat('EEE dd MMM')}</p>
  const sixthDay = <p className='uppercase text-sm md:text-base'>{DateTime.fromJSDate(new Date()).plus({ days: timeframe + 5 }).setLocale('es').toFormat('EEE dd MMM')}</p>
  const seventhDay = <p className='uppercase text-sm md:text-base'>{DateTime.fromJSDate(new Date()).plus({ days: timeframe + 6 }).setLocale('es').toFormat('EEE dd MMM')}</p>

  return (
    <main className="container mx-auto min-h-screen">
      <div className='grid grid-cols-7 text-center py-4'>
        <div className='col-start-1 col-end-2'>
          <Button
            size="sm"
            variant="flat"
            isDisabled={timeframe <= 7}
            color="secondary"
            onPress={() => setTimeframe((prev) => (prev > 7 ? prev - 7 : prev))}
          >
            Atrás
          </Button>
        </div>
        <div className='col-end-8 col-span-1'>
            <Button
              size="sm"
              isDisabled={timeframe >= 28}
              variant="flat"
              color="secondary"
              onPress={() => setTimeframe((prev) => (prev < 28 ? prev + 7 : prev))}
            >
              Siguiente
            </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center">
        {firstDay}
        {secondDay}
        {thirdDay}
        {fourthDay}
        {fifthDay}
        {sixthDay}
        {seventhDay}
      </div>
      <div className="grid grid-cols-7 text-center gap-1">
        <Card className={`${styles.clipCard} md:h-32`}>
          <CardBody className='text-center flex flex-column justify-around py-2 px-1 md:p-4'>
            <p className='text-[0.6rem] md:text-base'>Orci</p>
            <p className='text-[0.6rem] md:text-base'>7 am</p>
            <p className='text-[0.6rem] md:text-base'>Ft. Beyonce</p>
          </CardBody>
        </Card>
      </div>
    </main>
  )
}