'use client'

import {useState, useEffect} from 'react'
import {DateTime} from 'luxon'
import {Button} from '@nextui-org/button'
import _ from 'lodash'
import {IClass, IClassSorted} from '@/app/types'
import styles from './style.module.css'
import useAdmin from '@/app/hooks/useAdmin'
import { useAppStore } from '@/app/store'
import ClassCalendar from '../../components/class-calendar'

export default function Schedule(props: { page: string }) {
  const {user} = useAppStore()
  const {isAdmin} = useAdmin(user)
  const [timeframe, setTimeframe] = useState(0)
  const [classes, setClasses] = useState<IClassSorted>({})

  const firstDayDate = (timeframe === 0 && !isAdmin) ? DateTime.now().setLocale('es') : DateTime.now().startOf('day').plus({ days: timeframe }).setLocale('es')
  const secondDayDate = DateTime.now().startOf('day').plus({ days: timeframe + 1 }).setLocale('es')
  const thirdDayDate = DateTime.now().startOf('day').plus({ days: timeframe + 2 }).setLocale('es')
  const fourthDayDate = DateTime.now().startOf('day').plus({ days: timeframe + 3 }).setLocale('es')
  const fifthDayDate = DateTime.now().startOf('day').plus({ days: timeframe + 4 }).setLocale('es')
  const sixthDayDate = DateTime.now().startOf('day').plus({ days: timeframe + 5 }).setLocale('es')
  const seventhDayDate = DateTime.now().startOf('day').plus({ days: timeframe + 6 }).setLocale('es')

  const weekDays = [firstDayDate, secondDayDate, thirdDayDate, fourthDayDate, fifthDayDate, sixthDayDate, seventhDayDate]

  useEffect(() => {
    const fetchClasses = async () => {
      const startDate = firstDayDate.toISO()
      const endDate = seventhDayDate.endOf('day').toISO()
      const response = await fetch(`/api/${props.page}/horarios?start=${startDate}&end=${endDate}`)
      const data = await response.json()

      if (Array.isArray(data?.horarios)) {
        const day = (item: IClass) => DateTime.fromISO(item.date).toFormat('dd')
        const result = _.groupBy(data.horarios, day)
        setClasses(result)
      }
    };

    fetchClasses();
  }, [timeframe, firstDayDate])

  const firstDay = <p className='uppercase text-[0.8rem] md:text-base text-black'>{firstDayDate.toFormat('EEE dd MMM')}</p>
  const secondDay = <p className='uppercase text-[0.8rem] md:text-base text-black'>{secondDayDate.toFormat('EEE dd MMM')}</p>
  const thirdDay = <p className='uppercase text-[0.8rem] md:text-base text-black'>{thirdDayDate.toFormat('EEE dd MMM')}</p>
  const fourthDay = <p className='uppercase text-[0.8rem] md:text-base text-black'>{fourthDayDate.toFormat('EEE dd MMM')}</p>
  const fifthDay = <p className='uppercase text-[0.8rem] md:text-base text-black'>{fifthDayDate.toFormat('EEE dd MMM')}</p>
  const sixthDay = <p className='uppercase text-[0.8rem] md:text-base text-black'>{sixthDayDate.toFormat('EEE dd MMM')}</p>
  const seventhDay = <p className='uppercase text-[0.8rem] md:text-base text-black'>{seventhDayDate.toFormat('EEE dd MMM')}</p>

  const title = props.page === 'indoor-cycling' ? 'Indoor Cycling' : 'Move'

  return (
    <main className="container mx-auto min-h-screen">
      <div className='pt-8 pb-8 md: pb-12 flex justify-around'>
        <div>
          <Button
            size="sm"
            variant="flat"
            isDisabled={timeframe <= 6}
            className={styles.directionalBtn}
            onPress={() => setTimeframe((prev) => (prev > 6 ? prev - 7 : prev))}
          >
            Atrás
          </Button>
        </div>
        <div>
          <h3 className='text-xl font-[300] uppercase text-black'>{title}</h3>
        </div>
        <div>
            <Button
              size="sm"
              isDisabled={timeframe >= 21}
              variant="flat"
              className={styles.directionalBtn}
              onPress={() => setTimeframe((prev) => (prev < 20 ? prev + 7 : prev))}
            >
              Siguiente
            </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center px-2 md:px-0">
        {firstDay}
        {secondDay}
        {thirdDay}
        {fourthDay}
        {fifthDay}
        {sixthDay}
        {seventhDay}
      </div>
      <ClassCalendar page={props.page} classes={classes} dates={weekDays} />
    </main>
  )
}