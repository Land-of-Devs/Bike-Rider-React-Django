import { useCallback } from "react";
import { useState } from "react";
import { useContext, useEffect } from "react";
import StationContext from "../context/station";
import { getCookieJson, watchCookies } from "../utils/cookie";
import * as stationService from '../services/stations';
import { deepEqual } from '/src/utils/misc';
import UserContext from "../context/user";

export default function useStationAuth() {
  const { station, setStation, slots, setSlots } = useContext(StationContext);
  const [ state, setState ] = useState({ loading: false, error: false });

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
  }, [slots]);

  return {
    isStation: Boolean(station),
    station,
    state,
    configure,
    slots,
    fakeHardwareAwaitBikeOnSlot
  };
}
