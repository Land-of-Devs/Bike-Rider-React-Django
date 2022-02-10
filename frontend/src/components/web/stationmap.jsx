import React, { useCallback, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Box, CircularProgress } from '@mui/material'

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

const StationMapComponent = ({ stations = [] }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GMAPS_PUBLIC_KEY || "NONE"
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(map => {
    /*const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);*/
    setMap(map)
  }, [])

  const onUnmount = useCallback(map => {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      containerStyle={containerStyle}
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={7}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      { // Child components, such as markers, info windows, etc.
        stations.map(station => (<Marker key={station.id} position={{ lat: station.lat, lng: station.lon }} />))
      }
    </GoogleMap>
  ) : (<Box sx={containerStyle}><CircularProgress /></Box>)
}

export const StationMap = React.memo(StationMapComponent);
