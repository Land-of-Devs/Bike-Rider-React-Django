import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { getCookieJson } from "../utils/cookie";
const StationContext = React.createContext({});

export function StationContextProvider({ children }) {
  const [station, setStation] = useState(
    () => getCookieJson('brstation')
  );

  return (
    <StationContext.Provider value={{
      station,
      setStation
    }}>
      <Outlet/>
      {children}
    </StationContext.Provider>
  );
}

export default StationContext;
