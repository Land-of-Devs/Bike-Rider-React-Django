import React from "react";
const Context = React.createContext({});

export function StationContextProvider({ children }) {
  const a = true;
  return (
    <Context.Provider value={{ a }}>{children}</Context.Provider>
  );
}

export default Context;
