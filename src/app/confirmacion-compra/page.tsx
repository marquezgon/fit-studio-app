import React from 'react'
import { cookies } from 'next/headers'
import Stripe from 'stripe'
import { CognitoIdentityProviderClient, GetUserCommand } from '@aws-sdk/client-cognito-identity-provider'
import Compra from './component'

interface ConfirmacionCompraRequest {
  searchParams?: {
    session_id: string
  }
}

const stripe = new Stripe('sk_test_51O59axEp4tLl6nYb2kmsvdSPu4kNzpnqIl0iVm8cFtWrNeJpc0QI5RPN4Zt2cVo1yhohOcdhMy90wIA6MRrQYOTm00UizEHwz9');

async function getData(sessionId: string, token: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const cognitoClient = new CognitoIdentityProviderClient({region: 'us-east-1'})
    const input = {AccessToken: token};
    const command = new GetUserCommand(input);
    const data = await cognitoClient.send(command);

    const response = await fetch('https://p4xukwco0h.execute-api.us-east-1.amazonaws.com/Beta/package/assign', {
    method: 'POST',
    body: JSON.stringify({
      price: session.amount_subtotal,
      sessionId: session.id,
      packageId: session.client_reference_id,
      userId: data.Username
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })

    if (!response.ok) return undefined
    return response.json()

  } catch(e) {
    console.log(e)
  }
}

export default async function ConfirmacionCompra(request: ConfirmacionCompraRequest) {
  const cookieStore = cookies()
  const token = cookieStore.get('zeal_session')?.value || ''
  const id = request?.searchParams?.session_id || ''
  console.log(token)
  console.log(id)
  const data = await getData(id, token)
  console.log(data)

  return (
    <div className='container mx-auto'>
      <Compra />
    </div>
  )
}