import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle:{width: string, height: string} = {
  width: '100%',
  height: '200px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};
const GoogleMaps = () => {
  return (
    <div>
        <LoadScript
        googleMapsApiKey="YOUR_API_KEY" // Replace with your API key
        >
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
        >
            {/* Child components like markers, info windows, etc. */}
      </GoogleMap>
    </LoadScript>
    </div>
   
  )
}

export default GoogleMaps