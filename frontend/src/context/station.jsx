import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getCookieJson } from "../utils/cookie";
const StationContext = React.createContext({});

function getSlotPersistData() {
  try {
    const data = JSON.parse(localStorage.getItem('slotOrder'));
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
}

export function StationContextProvider({ children }) {
  const [slots, setSlots] = useState(getSlotPersistData());
  const [station, setStation] = useState(
    () => getCookieJson('brstation')
  );


  return (
    <StationContext.Provider value={{
      station,
      setStation,
      slots,
      setSlots,
    }}>
      <Outlet />
      {children}
    </StationContext.Provider>
  );
}

export default StationContext;
