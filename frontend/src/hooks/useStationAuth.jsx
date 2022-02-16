import { useCallback } from "react";
import { useState } from "react";
import { useContext, useEffect } from "react";
import StationContext from "../context/station";
import { getCookieJson, watchCookies } from "../utils/cookie";
import * as stationService from '../services/stations';
import { deepEqual } from '/src/utils/misc';
import * as bikesService from '../services/bikes';
import useBooking from "./useBooking";
import useAuth from "./useAuth";
import useToast from "./useToast";

export default function useStationAuth() {
  const { logout } = useAuth();
  const addToast = useToast();
  const { station, setStation, slots, setSlots } = useContext(StationContext);
  const [ state, setState ] = useState({ loading: false, error: false });
  const { cancelReservation, reservation } = useBooking();

  useEffect(() => {
    return watchCookies(() => {
      var newStation = getCookieJson('brstation');
      if (!deepEqual(station, newStation)) {
        setStation(newStation);
      }
    });
  }, [setStation, station]);

  const configure = useCallback(async (token) => {
    setState({ loading: true, error: false });
    var error = false;

    try {
      await stationService.configure(token);
    } catch (e) {
      error = e.response.data.errors || { Fail: [e.response.data.detail] };
      console.error(error);
    }

    setState({ loading: false, error });
    return error === false;
  }, [setState]);

  const fakeHardwareAwaitBikeOnSlot = useCallback((slotNum, bikeId) => {
    const newSlots = [...slots];
    newSlots[slotNum - 1] = bikeId;
    setSlots(newSlots);
    _hook(bikeId)
  }, [slots]);

  async function _hook(id){
    try{
      await bikesService.hook(id)
    }catch (e){
      console.error(e);
    }
  }

  async function unhook(id){
    try {
      await bikesService.unhook(id)
      if(Object.keys(reservation).length > 0) cancelReservation();
      addToast({msg: 'Have a nice ride!!', type: 'success'})
      logout();
    } catch (e) {
      console.error(e);
    }
  }

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

  return {
    isStation: Boolean(station),
    station,
    state,
    configure,
    slots,
    fakeHardwareAwaitBikeOnSlot,
    unhook
  };
}
