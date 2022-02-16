import React, { useCallback, useState } from "react"
import { clientStations, maintenanceStations, clientStationDetails } from "../services/stations";

export const useStations = () => {
  const [stationList, setStationList] = useState([]);
  const [stationDetails, setStationDetails] = useState(null);
  const [state, setState] = useState({loading: false, error: false});

  const makeStationLoader = loadStations => async (lat, lon) => {
    let error = false;
    setState({loading: true, error});

    try {
      setStationList((await loadStations(lat, lon)).results);
    } catch (e) {
      setStationList([]);
      error = e.response.data;
    }

    setState({loading: false, error});
  };

  const makeDetailsLoader = loadDetails => async (id) => {
    let error = false;
    setState({loading: true, error});

    try {
      setStationDetails(await loadDetails(id));
    } catch (e) {
      setStationDetails(null);
      error = e.response.data;
    }

    setState({loading: false, error});
  };

  const loadClientStations = useCallback(makeStationLoader(clientStations), [setStationList, setState]);
  const loadMaintenanceStations = useCallback(makeStationLoader(maintenanceStations), [setStationList, setState]);
  const loadClientDetails = useCallback(makeDetailsLoader(clientStationDetails), [setStationDetails, setState]);

  return {
    state,
    stationList,
    stationDetails,
    loadClientStations,
    loadMaintenanceStations,
    loadClientDetails
  };
}
