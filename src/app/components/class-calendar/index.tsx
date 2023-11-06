import {Card, CardBody} from '@nextui-org/card'
import Link from 'next/link'
import {IClass, IClassSorted, EClassType} from '@/app/types'
import styles from './style.module.css'
import {DateTime} from 'luxon'

interface Props {
  classes: IClassSorted
  dates: DateTime[]
  page: string
}

export default function ClassCalendar(props: Props) {
  // const classKeys = Object.keys(props.classes)

  const renderClasses = props.dates.map((item: DateTime) => {
    return (
      <div key={item.toISO()}>
        {props.classes[item.toFormat('dd')]?.map((openClass: IClass) =>  (
          <div className="py-2" key={openClass.id}>
            <Link href={`/reserva/${props.page}/${openClass.id}`}>
              <Card className={`${styles.clipCard} ${styles.bgLight} h-16 md:h-32`}>
                <CardBody className='text-center flex flex-column justify-around py-2 px-1 md:p-4'>
                  <p className='text-[0.6rem] md:text-base'>{openClass.coach}</p>
                  <p className='text-[0.6rem] md:text-base'>
                    {DateTime.fromISO(openClass.date).setLocale('es').toFormat("h a")}
                  </p>
                  {openClass.type === EClassType.Special && (
                    <p className='text-[0.6rem] md:text-base'>{openClass.description}</p>
                  )}
                </CardBody>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    )
  })
  return (
    <div className="grid grid-cols-7 text-center gap-4 pt-6">
      {renderClasses}
        {/* <div>
          
          <Link href="/reserva/indoor-cycling/a12kj4kas8998">
            <Card className={`${styles.clipCard} h-16 md:h-32`}>
              <CardBody className='text-center flex flex-column justify-around py-2 px-1 md:p-4'>
                <p className='text-[0.6rem] md:text-base'>Orci</p>
                <p className='text-[0.6rem] md:text-base'>7 am</p>
                <p className='text-[0.6rem] md:text-base'>Ft. Beyonce</p>
              </CardBody>
            </Card>
          </Link>
        </div>
        <div>
          <Link href="/reserva/indoor-cycling/a12kj4kas8998">
            <Card className={`${styles.clipCard} ${styles.bgLight} h-16 md:h-32`}>
              <CardBody className='text-center flex flex-column justify-around py-2 px-1 md:p-4'>
                <p className='text-[0.6rem] md:text-base'>Orci</p>
                <p className='text-[0.6rem] md:text-base'>7 am</p>
              </CardBody>
            </Card>
          </Link>
        </div> */}
      </div>
  )
}