import React, { useState, useEffect} from 'react'
import * as bookingService from '../services/bookings'

const Context = React.createContext({})

export function UserContextProvider({ children }) {
  const [reservation, setReservation] = useState({})
  const [session, setSession] = useState(
    () => window.sessionStorage.getItem('jwt')
  )

  useEffect(() => {
    if (!session) return setReservation({})
    bookingService.myReservation().then(setReservation)
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