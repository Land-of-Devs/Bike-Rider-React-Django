import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getCookieJson } from "../utils/cookie";
const StationContext = React.createContext({});

export function StationContextProvider({ children }) {
  const [slots, setSlots] = useState([])
  const [station, setStation] = useState(
    () => getCookieJson('brstation')
  );

  function getSlotInfo(station) {

    //station x bikes, check slots
    //[] [2] [] [] [] // [2] [1] [0]
    // if x is in Slots change data

    // stations booking is X slot pass sino Add slot empty

    return Array.from({ length: station.nslots }, (e, i) => (
      station.bikes[i] ? { ...station.bikes[i], booking: station.bookings[i] } : null
    ));
  }

  useEffect(() => {
    setSlots(getSlotInfo(station));
  }, [setSlots, station]);

  return (
    <StationContext.Provider value={{
      station,
      setStation,
      slots,
      setSlots,
    }}>
      <Outlet/>
      {children}
    </StationContext.Provider>
  );
}

export default StationContext;
