import React, { useCallback, useState, useEffect } from 'react'
import { GoogleMap, Marker, useJsApiLoader, InfoWindow, Circle } from '@react-google-maps/api';
import { Box, CircularProgress } from '@mui/material'
import { useStations } from '../../hooks/useStations';

const containerStyle = {
  display: 'flex',
  flexGrow: '1',
  alignItems: 'center',
  justifyContent: 'center'
};

const mapContainerStyle = {
  width: '100vw',
};

const center = {
  lat: 40.4378698,
  lng: -3.8196206
};

const options = {
  strokeColor: '#11DD11',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillOpacity: 0,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 80000,
  zIndex: 1
}

const StationMapComponent = ({ type = "client" }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GMAPS_PUBLIC_KEY || "NONE",
  });

  const [map, setMap] = useState(null);
  const [circleCenter, setCircleCenter] = useState({ ...center });
  const [infoWindows, setInfoWindows] = useState([]);
  const stations = useStations();

  const addInfoWindow = useCallback(win => {
    setInfoWindows([...infoWindows.filter(w => w.key != win.key), win]);
  }, [infoWindows, setInfoWindows]);

  const closeInfoWindow = useCallback(winKey => {
    setInfoWindows([...infoWindows.filter(w => w.key != winKey)]);
  }, [infoWindows, setInfoWindows]);

  // useEffect(() => { // clean windows
  //   setInfoWindows([...infoWindows.filter(w => stations.stationList.find(v => v.id == w.key))]);
  // }, [stations.stationList, setInfoWindows]);

  const onLoad = useCallback(map => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(map => {
    setMap(null);
  }, []);

  const onCenterChanged = () => {
    if (!map) {
      return;
    }

    const c = map.getCenter();
    setCircleCenter({ lat: c.lat(), lng: c.lng() });
  };

  const requestReload = () => {
    switch (type) {
      case 'client':
        stations.loadClientStations(circleCenter.lat, circleCenter.lng);
        break;

      case 'maintenance':
        stations.loadMaintenanceStations(circleCenter.lat, circleCenter.lng);
        console.log(stations.stationList)
        break;
    }
  };

  return isLoaded ? (
    <GoogleMap
      containerStyle={containerStyle}
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={7}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onCenterChanged={onCenterChanged}
      onIdle={requestReload}
    >
      {type === 'client' && (
        <Circle
          center={circleCenter}
          options={options}
        />
      )}

      { // Markers
        stations.stationList.map(station => (
          <Marker
            key={station.id}
            title={station.name}
            position={{ lat: station.lat, lng: station.lon }}
            label={type === 'maintenance' ? station.maint_ticket_ct : undefined}
            onClick={() => addInfoWindow(
              <InfoWindow
                key={station.id}
                position={{ lat: station.lat, lng: station.lon }}
                onCloseClick={() => closeInfoWindow(station.id)}
              >
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <img style={{maxWidth: '20vmin', margin: 'auto'}} src={station.image} alt={`Station ${station.id}`} title={`Station ${station.id}`} />
                  <h2>{station.name}</h2>
                  {station.dist >= 0 && <div>Distance from center of circle: {station.dist.toFixed(2)} km</div>}
                  <div>Available bikes: {station.av_bike_ct}</div>
                  <div>Available slots: {station.av_slots}</div>
                  <div>Number of booked bikes: {station.av_bike_ct}</div>
                  {
                    type === 'maintenance' && (
                      <>
                        {station.maint_ticket_ct >= 0 && <div>Number of maintainer tickets: {station.av_bike_ct}</div>}
                      </>
                    )
                  }
                </div>
              </InfoWindow>
            )}
          />
        ))
      }

      { // Currently open InfoWindows
        infoWindows
      }
    </GoogleMap>
  ) : (<Box sx={containerStyle}><CircularProgress /></Box>)
}

export const StationMap = React.memo(StationMapComponent);
