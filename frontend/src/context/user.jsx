import React, { useState, useEffect, createContext } from 'react'
import * as bookingService from '../services/bookings'
import { getCookieJson } from '../utils/cookie'

const UserContext = createContext({})

export function UserContextProvider({ children }) {
  const [reservation, setReservation] = useState({})
  const [session, setSession] = useState(
    () => getCookieJson('bruser')
  )

  const notReservation = () => {
    setReservation({});
  }
  useEffect(() => {
    if (!session) return setReservation({})
    bookingService.myReservation().then(setReservation, notReservation)
  }, [session])

  return <UserContext.Provider value={{
    reservation,
    session,
    setReservation,
    setSession
  }}>
    {children}
  </UserContext.Provider>
}

export default UserContext;