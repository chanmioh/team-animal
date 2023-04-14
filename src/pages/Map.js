import { useMemo, useState, useReducer } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const Map = (props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  //   TODO: Change this to current location
  const center = { lat: 42.359532, lng: -71.057549 };

  function getCenter() {
    if (props.currentClinic) {
      return {
        lat: parseFloat(props.currentClinic.latitude),
        lng: parseFloat(props.currentClinic.longitude),
      };
    } else if (props.clinics && props.clinics[0]) {
      return {
        lat: parseFloat(props.clinics[0].latitude),
        lng: parseFloat(props.clinics[0].longitude),
      };
    } else {
      return center;
    }
  }

  if (!isLoaded) return <>Loading...</>;

  return (
    <GoogleMap
      mapContainerClassName="w-full h-screen"
      zoom={9}
      center={getCenter()}
    >
      {props.clinics?.map((c, idx) => (
        <Marker
          key={idx}
          position={{
            lat: parseFloat(c.latitude),
            lng: parseFloat(c.longitude),
          }}
          onClick={() => props.setCurrentClinic(c)}
        />
      ))}
    </GoogleMap>
  );
};

export default Map;
