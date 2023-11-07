'use client'

import {useState, useEffect} from 'react'
import {DateTime} from 'luxon'
import {Button} from '@nextui-org/button'
import ClassCalendar from '../../components/class-calendar'
import _ from 'lodash'
import {IClass, IClassSorted} from '@/app/types'
import styles from './style.module.css'

export default function Schedule(props: { page: string }) {
  const [timeframe, setTimeframe] = useState(0)
  const [classes, setClasses] = useState<IClassSorted>({})

  const firstDayDate = DateTime.now().startOf('day').plus({ days: timeframe }).setLocale('es')
  const secondDayDate = DateTime.now().startOf('day').plus({ days: timeframe + 1 }).setLocale('es')
  const thirdDayDate = DateTime.now().startOf('day').plus({ days: timeframe + 2 }).setLocale('es')
  const fourthDayDate = DateTime.now().startOf('day').plus({ days: timeframe + 3 }).setLocale('es')
  const fifthDayDate = DateTime.now().startOf('day').plus({ days: timeframe + 4 }).setLocale('es')
  const sixthDayDate = DateTime.now().startOf('day').plus({ days: timeframe + 5 }).setLocale('es')
  const seventhDayDate = DateTime.now().startOf('day').plus({ days: timeframe + 6 }).setLocale('es')

  const weekDays = [firstDayDate, secondDayDate, thirdDayDate, fourthDayDate, fifthDayDate, sixthDayDate, seventhDayDate]

  useEffect(() => {
    const fetchClasses = async () => {
      const startDate = firstDayDate.toUTC()
      const endDate = seventhDayDate.endOf('day').toUTC()
      const response = await fetch(`/api/${props.page}/horarios?start=${startDate}&end=${endDate}`)
      const data = await response.json()

      if (Array.isArray(data?.horarios)) {
        const day = (item: IClass) => DateTime.fromISO(item.date).toFormat('dd')
        const result = _.groupBy(data.horarios, day)
        setClasses(result)
      }
    };

    fetchClasses();
  }, [timeframe])

  const firstDay = <p className='uppercase text-[0.8rem] md:text-base'>{firstDayDate.toFormat('EEE dd MMM')}</p>
  const secondDay = <p className='uppercase text-[0.8rem] md:text-base'>{secondDayDate.toFormat('EEE dd MMM')}</p>
  const thirdDay = <p className='uppercase text-[0.8rem] md:text-base'>{thirdDayDate.toFormat('EEE dd MMM')}</p>
  const fourthDay = <p className='uppercase text-[0.8rem] md:text-base'>{fourthDayDate.toFormat('EEE dd MMM')}</p>
  const fifthDay = <p className='uppercase text-[0.8rem] md:text-base'>{fifthDayDate.toFormat('EEE dd MMM')}</p>
  const sixthDay = <p className='uppercase text-[0.8rem] md:text-base'>{sixthDayDate.toFormat('EEE dd MMM')}</p>
  const seventhDay = <p className='uppercase text-[0.8rem] md:text-base'>{seventhDayDate.toFormat('EEE dd MMM')}</p>

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
          <h3 className='text-xl font-[300] uppercase'>{title}</h3>
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
      <div className="grid grid-cols-7 text-center">
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