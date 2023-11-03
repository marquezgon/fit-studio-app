import { Request } from '@/app/types/Request'
import SpotBookingForm from '../spot-booking-form'

async function getData(id: string) {
  const res = await fetch(`https://p4xukwco0h.execute-api.us-east-1.amazonaws.com/Beta/indoor-cycling/book-class/${id}`)
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function SpotBookingPage(request: Request) {
  const id = request?.params?.id
  const data = await getData(id)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-20">
      <SpotBookingForm data={data} />
    </main>
  )
}
