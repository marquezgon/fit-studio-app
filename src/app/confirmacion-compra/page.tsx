import React from 'react'
import Stripe from 'stripe'
import {CheckCircle} from 'react-feather'

interface ConfirmacionCompraRequest {
  searchParams?: {
    session_id: string
  }
}

const stripe = new Stripe('sk_test_51O59axEp4tLl6nYb2kmsvdSPu4kNzpnqIl0iVm8cFtWrNeJpc0QI5RPN4Zt2cVo1yhohOcdhMy90wIA6MRrQYOTm00UizEHwz9');

async function getData(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const response = await fetch(`https://p4xukwco0h.execute-api.us-east-1.amazonaws.com/Beta/package/assign`, {
    method: 'POST',
    body: JSON.stringify({
      price: session.amount_subtotal,
      sessionId: session.id,
      packageId: "3ba38d79-52bf-47af-a5bc-1dc86af9343d",
      date: new Date().toISOString(),
      clientReferenceId: session.client_reference_id
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    console.log(session)
    const jsonRes = await response.json()
    return jsonRes

  } catch(e) {
    console.log(e)
  }
}

export default async function ConfirmacionCompra(request: ConfirmacionCompraRequest) {
  const id = request?.searchParams?.session_id || ''

  const data = await getData(id)

  console.log(data)
  return (
    <div className='container mx-auto'>
      <div className='py-8 text-center flex justify-center flex-col items-center'>
        <CheckCircle size='256' />
        <div className='pt-8'>
          <h1 className='text-4xl uppercase'>Gracias por tu compra</h1>
          <h3 className='text-xl pt-3'>En unos momentos serás redirigido a continuar con tu reserva</h3>
        </div>
      </div>
    </div>
  )
}