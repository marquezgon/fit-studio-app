'use client'

import {useState, useEffect} from 'react'
import {Button} from '@nextui-org/react'
import {useParams, usePathname, useRouter} from 'next/navigation'
import Spot, { SpotStatus, DummySpot } from '@/app/components/spot'
import { IClassInfo, IClass, ModalType, IUserPackage, EClassType } from '@/app/types'
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
  const router = useRouter()
  const params = useParams()
  const pathname = usePathname()
  const {user, toggleModal} = useAppStore()
  const {seats} = props.data

  const seatsMap = new Map()
  for (let i = 1; i <= 27; i++) {
    seatsMap.set(i, SpotStatus.AVAILABLE)
  }

  seats.forEach((item) => {
    seatsMap.set(item.seat, SpotStatus.RESERVED)
  })
  
  const initialValues: SpotStatus[] = Array.from(seatsMap.values())
  const [userPackages, setUserPackages] = useState<IUserPackage[]>([])
  const [bookingItems, setBookingItems] = useState(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleBookClick = async (event: React.MouseEvent<HTMLElement>) => {
    if (!user) {
      toggleModal(ModalType.SIGN_IN)
    } else if (user && userPackages.length > 0) {
      setIsSubmitting(true)
      const packageToUse = userPackages[0]
      const seat = bookingItems.findIndex(item => item === SpotStatus.SELECTED) + 1

      try {
        const body = {
          userId: user.id,
          sessionId: packageToUse.package_id,
          seat: seat
        }
        const response = await fetch(`/api/move/reservar-clase/${params.id}`, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
        if (response.ok) {
          router.push('/clase-reservada')
        }
      } catch(e) {
        setIsSubmitting(false)
      }
    } else if (user && userPackages.length === 0) {
      toggleModal(ModalType.SELECT_PACKAGE)
    }
  }

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('zeal_last_url', pathname) 
      const fetchUserPackages = async () => {
        const response = await fetch(`/api/package/user?id=${user.id}`)
        const data = await response.json()
        if (response.ok) {
          setUserPackages(data?.userPackages)
        }
      }
  
      fetchUserPackages()
    }
  }, [user])

  console.log(user)

  return (
    <div className="md:w-auto md:mx-12">
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
        </p>
      </div>
      <div className="flex justify-center pb-4 md:pt-4 flex-col items-center">
        <p className="text-lg uppercase font-light">{props.data.classInfo.type}</p>
        <p className="text-2xl uppercase">{props.data.classInfo.coach}</p>
      </div>
      <div className="grid grid-cols-5 gap-3 justify-center px-16" style={{ paddingLeft: '6rem', paddingRight: '6rem' }}>
        <div />
        <div>
          <Spot text={'3'} index={2} handleClick={handleClick} status={bookingItems[2]} disabled={bookingItems[2] !== SpotStatus.AVAILABLE} />
        </div>
        <div>
          <Spot text={'2'} index={1} handleClick={handleClick} status={bookingItems[1]} disabled={bookingItems[1] !== SpotStatus.AVAILABLE} />
        </div>
        <div>
          <Spot text={'1'} index={0} handleClick={handleClick} status={bookingItems[0]} disabled={bookingItems[0] !== SpotStatus.AVAILABLE} />
        </div>
        <div />
        {/* --------------------------------------------------------------------------------------------------------- */}
        <div>
          <Spot text={'4'} index={3} handleClick={handleClick} status={bookingItems[3]} disabled={bookingItems[3] !== SpotStatus.AVAILABLE} />
        </div>
        <div />
        <div />
        <div />
        {props.data.classInfo.type === EClassType.Yoga ? (
          <div>
            <Spot text={'17'} index={16} handleClick={handleClick} status={bookingItems[16]} disabled={bookingItems[16] !== SpotStatus.AVAILABLE} />
          </div>
        ): (<div />)}
        {/* --------------------------------------------------------------------------------------------------------- */}
        <div>
          <Spot text={'5'} index={4} handleClick={handleClick} status={bookingItems[4]} disabled={bookingItems[4] !== SpotStatus.AVAILABLE} />
        </div>
        <div />
        <div />
        <div />
        {props.data.classInfo.type === EClassType.Yoga ? (
          <div>
            <Spot text={'16'} index={15} handleClick={handleClick} status={bookingItems[15]} disabled={bookingItems[15] !== SpotStatus.AVAILABLE} />
          </div>
        ): (<div />)}
        {/* --------------------------------------------------------------------------------------------------------- */}
        <div>
          <Spot text={'6'} index={5} handleClick={handleClick} status={bookingItems[5]} disabled={bookingItems[5] !== SpotStatus.AVAILABLE} />
        </div>
        <div />
        <div />
        <div />
        {props.data.classInfo.type === EClassType.Yoga ? (
          <div>
            <Spot text={'15'} index={14} handleClick={handleClick} status={bookingItems[14]} disabled={bookingItems[14] !== SpotStatus.AVAILABLE} />
          </div>
        ): (<div />)}
        {/* --------------------------------------------------------------------------------------------------------- */}
        <div>
          <Spot text={'7'} index={6} handleClick={handleClick} status={bookingItems[6]} disabled={bookingItems[6] !== SpotStatus.AVAILABLE} />
        </div>
        <div />
        <div />
        <div />
        <div>
          <Spot text={'14'} index={13} handleClick={handleClick} status={bookingItems[13]} disabled={bookingItems[13] !== SpotStatus.AVAILABLE} />
        </div>
        {/* --------------------------------------------------------------------------------------------------------- */} 
        <div>
          <Spot text={'8'} index={7} handleClick={handleClick} status={bookingItems[7]} disabled={bookingItems[7] !== SpotStatus.AVAILABLE} />
        </div>
        <div />
        <div />
        <div>
          <Spot text={'13'} index={12} handleClick={handleClick} status={bookingItems[12]} disabled={bookingItems[12] !== SpotStatus.AVAILABLE} />
        </div>
        <div />
        {/* --------------------------------------------------------------------------------------------------------- */}
        <div>
          <Spot text={'9'} index={8} handleClick={handleClick} status={bookingItems[8]} disabled={bookingItems[8] !== SpotStatus.AVAILABLE} />
        </div>
        <div>
          <Spot text={'10'} index={9} handleClick={handleClick} status={bookingItems[9]} disabled={bookingItems[9] !== SpotStatus.AVAILABLE} />
        </div>
        <div>
          <Spot text={'11'} index={10} handleClick={handleClick} status={bookingItems[10]} disabled={bookingItems[10] !== SpotStatus.AVAILABLE} />
        </div>
        <div>
          <Spot text={'12'} index={11} handleClick={handleClick} status={bookingItems[11]} disabled={bookingItems[11] !== SpotStatus.AVAILABLE} />
        </div>
      </div>
      {bookingItems.includes(SpotStatus.SELECTED) && (
        <div className='pt-8 text-center'>
          <Button
            size="lg"
            style={{ backgroundColor: '#232321', color: 'white' }}
            className='hover:opacity-80'
            onClick={handleBookClick}
            isLoading={isSubmitting}
          >
            RESERVAR
          </Button>
        </div>
      )}
    </div>
  )
}
