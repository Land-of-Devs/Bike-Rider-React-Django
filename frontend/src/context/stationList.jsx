import React from "react";
import { Outlet } from "react-router-dom";
const Context = React.createContext({});

export function StationListContextProvider({ children }) {
  const a = true;
  return (
    <Context.Provider value={{ a }}>
      {children}
      <Outlet/>
    </Context.Provider>
  );
}

export default Context;
