import React, { useCallback, useState } from "react"
import { clientStations, maintenanceStations } from "../services/stations";

export const useStations = () => {
  const [stationList, setStationList] = useState([]);
  const [state, setState] = useState({loading: false, error: false});

  const makeStationLoader = loadStations => async () => {
    let error = false;
    setState({loading: true, error});

    try {
      setStationList(await loadStations());
    } catch (e) {
      setStationList([]);
      error = e.response.data;
      console.error(error);
    }

    setState({loading: false, error});
  };

  const loadClientStations = useCallback(makeStationLoader(clientStations), [setStationList, setState]);
  const loadMaintenanceStations = useCallback(makeStationLoader(maintenanceStations), [setStationList, setState]);

  return {
    state,
    stationList,
    loadClientStations,
    loadMaintenanceStations
  };
}
