import React from 'react'
import {IUser} from "../types"


export default function useAdmin(user: IUser | null) {
  const [isAdmin, setIsAdmin] = React.useState(false)
  if (user && isAdmin === false) {
    if (user.id === '41bc1745-bc7c-4061-a5e7-368fcbca3fba' || user.id === '0d7bfea4-4b25-4b3a-8cc9-226fa510ad7c' || user.id === 'fadc25d6-3de5-46a0-a0d8-ee230e08bdc2' || user.id === 'aebb392a-9bae-4c9f-a951-e5e83bb32e2a' || user.id === '66f90e05-3cb6-45b1-aac3-ab0c9b077f53') {
      setIsAdmin(true)
    }
  }

  return { isAdmin }
}