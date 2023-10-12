import SpotBookingForm from '../spot-booking-form'

async function getData() {
  const res = await fetch('https://p4xukwco0h.execute-api.us-east-1.amazonaws.com/Beta/indoor-cycling/book-class/506834b1-aa69-46cc-81da-4ab4edd259bc')
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function SpotBookingPage() {
  const data = await getData()
  console.log(data)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <SpotBookingForm classInfo={data} />
    </main>
  )
}
