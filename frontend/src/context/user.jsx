import React, { useState, useEffect, createContext } from 'react'
import * as bookingService from '../services/bookings'
import { getCookieJson } from '../utils/cookie'

const UserContext = createContext({})

export function UserContextProvider({ children }) {
  const [reservation, setReservation] = useState({})
  const [subscription, setSubscription] = useState('None')
  const [session, setSession] = useState(
    () => getCookieJson('bruser')
  )

  const notReservation = () => {
    setReservation({});
  }
  useEffect(() => {
    if (!session) return setReservation({})
    setSubscription(session.subscription ? session.subscription : 'None')
    bookingService.myReservation().then(setReservation, notReservation)
  }, [session])

  return <UserContext.Provider value={{
    reservation,
    session,
    subscription,
    setSubscription,
    setReservation,
    setSession
  }}>
    {children}
  </UserContext.Provider>
}

export default UserContext;