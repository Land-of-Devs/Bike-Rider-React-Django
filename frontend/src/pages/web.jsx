import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { StationMap } from '../components/web/stationmap';
import { useStations } from '../hooks/useStations';

const Web = () => {
  const [timeLoaded, setTimeLoaded] = useState(false);
  const stations = useStations();

  useEffect(async () => {
    await new Promise((res) => {
      setTimeout(res, 100);
    });
    setTimeLoaded(true);
  }, [setTimeLoaded]);

  useEffect(() => {
    stations.loadClientStations();
  }, [stations.loadClientStations]);

  const isLoaded = useCallback(() => !stations.state.loading && timeLoaded, [stations.state.loading, timeLoaded]);

  return (
    <>
      {isLoaded() ? (
        <>
          <StationMap stations={stations.stationList}/>
        </>
      ) :
      <CircularProgress sx={{margin: 'auto'}}/>}
    </>)
};

export default Web;
