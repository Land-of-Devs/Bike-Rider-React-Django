import React, { useState, useEffect } from 'react'
import * as bookingService from '../services/bookings'
import { getCookieJson } from '../utils/cookie'

const Context = React.createContext({})

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

  return <Context.Provider value={{
    reservation,
    session,
    setReservation,
    setSession
  }}>
    {children}
  </Context.Provider>
}

export default Context;