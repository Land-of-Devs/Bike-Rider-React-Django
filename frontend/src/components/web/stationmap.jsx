import React, { useCallback, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader, InfoWindow, StandaloneSearchBox } from '@react-google-maps/api';
import { Box, CircularProgress } from '@mui/material'

const libraries = ['places'];

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
    googleMapsApiKey: import.meta.env.VITE_GMAPS_PUBLIC_KEY || "NONE",
    libraries
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(map => {
    /*const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);*/
    setMap(map)
  }, []);

  const onUnmount = useCallback(map => {
    setMap(null)
  }, []);

  const onPlacesChanged = () => console.log(this.searchBox.getPlaces());

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
      {/* <InfoBox
      options={{ closeBoxURL: '', enableEventPropagation: true }}
      position={center}
    >
      <div style={{ backgroundColor: 'yellow', opacity: 0.75, padding: 12 }}>
        <div style={{ fontSize: 16, fontColor: `#08233B` }}>
          Hello, World!
        </div>
      </div>
    </InfoBox> */}
    <InfoWindow
position={center}
    >
      <div>
        <h1>InfoWindow</h1>
      </div>
    </InfoWindow>
    <StandaloneSearchBox
      onPlacesChanged={
        onPlacesChanged
      }
    >
      <input
        type="text"
        placeholder="Search stations..."
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
          position: "absolute",
          left: "50%",
          marginLeft: "-120px",
          marginTop: '20px'
        }}
      />
    </StandaloneSearchBox>
    </GoogleMap>
  ) : (<Box sx={containerStyle}><CircularProgress /></Box>)
}

export const StationMap = React.memo(StationMapComponent);
