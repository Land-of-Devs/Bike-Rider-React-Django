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

  function getSlotInfo(station) {
    const newslots = Array.from({ length: station.nslots }, (e, i) => isFinite(slots[i]) ? slots[i] : null);
    const order = station.bikes.map(b => slots.findIndex(e => b.id === (isFinite(e) ? e : e && e.id)));

    for (var i = 0; i < order.length; i++) {
      var index = order[i];
       /** if the index is -1 it means the order doesn't matter, process later */
      if (index != -1) {
        newslots[index] = station.bikes[i];
      }
    }

    for (var i = 0; i < order.length; i++) {
      var index = order[i];
      if (index == -1) {
        var firstFreeSlot = newslots.indexOf(null);
        if (firstFreeSlot == -1) {
          console.error('More bikes than slots in station!!!');
          continue;
        }

        newslots[firstFreeSlot] = station.bikes[i];
      }
    }

    for (var i = 0, j = 0; i < newslots.length && j < station.bookings.length; i++) {
      if (!newslots[i]) { continue; }
      if (newslots[i].status == "OK") {
        newslots[i].booking = station.bookings[j];
        j++;
      }
    }

    const orderPersistence = newslots.map(bike => bike ? (isFinite(bike) ? null : bike.id) : null);

    try {
      localStorage.setItem('slotOrder', JSON.stringify(orderPersistence));
    } catch (e) { }

    return newslots;
  }

  useEffect(() => {
    if (!station) {
      return;
    }

    setSlots(getSlotInfo(station));
  }, [setSlots, station]);

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
