import { useCallback } from "react";
import { useState } from "react";
import { useContext, useEffect } from "react";
import StationContext from "../context/station";
import { getCookieJson, watchCookies } from "../utils/cookie";
import * as stationService from '../services/stations';
import { shallowEqual } from '/src/utils/misc';

export default function useStationAuth() {
  const { station, setStation } = useContext(StationContext);
  const [ state, setState ] = useState({ loading: false, error: false });

  useEffect(() => {
    return watchCookies(() => {
      var newStation = getCookieJson('brstation');
      if (!shallowEqual(station, newStation)) {
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

  return {
    isStation: Boolean(station),
    station,
    state,
    configure
  };
}
