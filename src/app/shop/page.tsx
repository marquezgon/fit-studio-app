import React from 'react'
import { IPackage } from '../types'
import ZealPackages from './component'

async function getData() {
  try {
      const response = await fetch(`https://p4xukwco0h.execute-api.us-east-1.amazonaws.com/Beta/package-list`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })

    if (!response.ok) return undefined
    return response.json()

  } catch(e) {
    console.log(e)
  }
}

export default async function ConfirmacionCompra() {
  const data: IPackage[] | undefined = await getData()
  const packages = data || []

  return (
    <div className='container mx-auto flex justify-center'>
      <ZealPackages packages={packages} />
    </div>
  )
}